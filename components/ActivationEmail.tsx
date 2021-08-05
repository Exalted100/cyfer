import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ActivationEmail = ({activation_token}: {activation_token: string}) => {
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/api/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div>
            <h5>Activate your email</h5>
            {err ? err : success}
        </div>
    )
}

export default ActivationEmail
