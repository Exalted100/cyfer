import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from './sendMail'

import {google} from 'googleapis'
const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const userCtrl = {
    register: async (req: any, res: any) => {
        try {
            const {firstName, lastName, email, password} = req.body
            
            if(!firstName || !lastName || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid email."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                firstName, lastName, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({msg: "Registeration Successful! Please activate your email to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req: any, res: any) => {
        try {
            const {activation_token} = req.body
            const user: any = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET || "")

            const {firstName, lastName, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                firstName, lastName, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req: any, res: any) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login successful!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req: any, res: any) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET || "", (err: any, user: any) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req: any, res: any) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req: any, res: any) => {
        try {
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req: any, res: any) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req: any, res: any) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req: any, res: any) => {
        try {
            const {firstName, lastName} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName
            })

            res.json({msg: "Update Successful!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req: any, res: any) => {
        try {
            await Users.findByIdAndDelete(req.query.id)

            res.json({msg: "Delete Successful!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    googleLogin: async (req: any, res: any) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, firstName, lastName} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    firstName, lastName, email, password: passwordHash
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    facebookLogin: async (req: any, res: any) => {
        try {
            const {accessToken, userID} = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})

            const {email, firstName, lastName} = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    firstName, lastName, email, password: passwordHash
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createNote: async (req: any, res: any) => {
        try {
            const {title, note, password} = req.body
            
            if(!title || !note)
                return res.status(400).json({msg: "Please fill in compulsory fields."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!password) {
                const password = ""
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const existingNotes = await Users.findById(req.user.id).select('notes')

            const newNote = {
                title, note, password: passwordHash, date: Date.now(), id: existingNotes.length
            }

            await Users.findOneAndUpdate({_id: req.user.id}, {
                notes: [ ...existingNotes, newNote ]
            })

            res.json({msg: "New note has been created."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNotes: async (req: any, res: any) => {
        try {
            const notes = await Users.findById(req.user.id).select('notes')

            res.json(notes)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async (req: any, res: any) => {
        try {
            const {title, note, password, id} = req.body

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            if(!password) {
                const password = ""
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const notes = await Users.findById(req.user.id).select('notes')

            const updatedNote = {
                title, note, password: passwordHash, date: notes[id].date, id
            }

            notes.splice(id, 1)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                notes: [...notes, updatedNote]
            })

            res.json({msg: "Update Successful!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote: async (req: any, res: any) => {
        try {
            const { id } = req.body
            const notes = await Users.findById(req.user.id).select('notes')

            notes.splice(id, 1)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                notes: [...notes]
            })

            res.json({msg: "Delete Successful!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}



type createActivationTokenType = { firstName: string; lastName: string; email: string; password: string }

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload: createActivationTokenType) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET || "", {expiresIn: '5m'})
}

const createAccessToken = (payload: {id: string}) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", {expiresIn: '15m'})
}

const createRefreshToken = (payload: {id: string}) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {expiresIn: '7d'})
}

export default userCtrl