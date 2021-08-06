import jwt, { TokenExpiredError } from 'jsonwebtoken'
import nextConnect from 'next-connect'

const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err: any, user: any) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
        })
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const auth = nextConnect()

auth.use(authMiddleware)

export default auth