import styles from "../styles/LoginForm.module.css"

const LoginForm = () => {
    return (
        <div>
            <h5>Login to Cyfer</h5>
            <form action="">
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id=""/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id=""/>

                <input type="button" value="Submit"/>
            </form>
            <p>Forgot password?</p>
            <p>New to Cyfer? Create an account</p>
        </div>
    )
}

export default LoginForm