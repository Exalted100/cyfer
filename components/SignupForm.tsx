import styles from "../styles/SignupForm.module.css"
import axios from "axios"
import { useState } from "react"

const SignupForm = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cfPassword: "",
        err: "",
        success: ""
    })

    const {firstName, lastName, email, password, cfPassword, err, success} = user

    const onInputChange = (e: any) => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: "", success: ""})
    }

    const onButtonClick = async (e: any) => {
        console.log("form submitted")
        e.preventDefault()
        console.log("form submitted")
        if (!firstName || !lastName || !email || !password || !cfPassword) {
            return setUser({...user, err: "Please fill in all fields.", success: ''})
            console.log(user)
        }

        if (password !== cfPassword) {
            return setUser({...user, err: "Passwords did not match.", success: ''})
            console.log(user)
        }

        try {
            console.log("trying request")
            const res = await axios.post('/api/register', {
                firstName, lastName, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
            console.log(user)
            console.log(res.data.msg)
        } catch (err) {
            setUser({...user, err: err.response.data.msg, success: ''})
            console.log("err: " + user)
        }
    }

    return (
        <div>
            <h5>Join Cyfer</h5>
            <form>
                <label htmlFor="first-name">First name</label>
                <input type="text" name="firstName" id="" onChange={onInputChange}/>

                <label htmlFor="last-name">Last name</label>
                <input type="text" name="lastName" id="" onChange={onInputChange}/>

                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="" onChange={onInputChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" onChange={onInputChange}/>

                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="cfPassword" id="" onChange={onInputChange}/>

                <input type="button" value="Submit" onClick={onButtonClick}/>
            </form>
        </div>
    )
}

export default SignupForm