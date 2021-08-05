import { useState } from "react"
import styles from "../styles/LoginForm.module.css"
import axios from "axios"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const LoginForm = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        err: "",
        success: ""
    })

    const onInputChange = (e: any) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const onButtonClick = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/login", {email: user.email, password: user.password})
            setUser({...user, err: "", success: res.data.msg})
            console.log(user)
        } catch (err) {
            setUser({...user, err: err.response.data.msg, success: ""})
        }
    } 

    const responseGoogle = async (response: any) => {
        try {
            const res = await axios.post("/api/google_login", {tokenId: response.tokenId})

            setUser({...user, err: "", success: res.data.msg})
        } catch (err) {
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response: any) => {
        try {
            const {accessToken, userID} = response
            const res = await axios.post("/api/facebook_login", {accessToken, userID})

            setUser({...user, err: "", success: res.data.msg})
        } catch (err) {
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div>
            <h5>Login to Cyfer</h5>
            <form>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="" value={user.email} onChange={onInputChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={user.password} onChange={onInputChange}/>

                <input type="button" value="Submit" onClick={onButtonClick}/>
            </form>
            <p>Forgot password?</p>
            <div>
                <GoogleLogin
                    clientId="171449769464-i6bdhradppbrn40egt9j1aaagu1d0cm0.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
                
                <FacebookLogin
                appId="Your facebook app id"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
            </div>
            <p>New to Cyfer? Create an account</p>
        </div>
    )
}

export default LoginForm