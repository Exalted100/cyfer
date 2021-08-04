import styles from "../styles/SignupForm.module.css"

const SignupForm = () => {
    return (
        <div>
            <h5>Join Cyfer</h5>
            <form action="">
                <label htmlFor="first-name">First name</label>
                <input type="text" name="first-name" id=""/>

                <label htmlFor="last-name">Last name</label>
                <input type="text" name="last-name" id=""/>

                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id=""/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id=""/>

                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" id=""/>

                <input type="button" value="Submit"/>
            </form>
            <p>Sign in with Google</p>
            <p>Sign in with Facebook</p>
        </div>
    )
}

export default SignupForm