import axios from "axios"
import { useEffect } from "react"

const ProfilePage = () => {
    const getUserInfo = () => {
        async function fetchData() {
            const res = await axios.get('/api/infor', {
                headers: {Authorization: localStorage.getItem("refreshToken")}
            })
            console.log(res)
          }
          fetchData();
    }

    useEffect(getUserInfo, [])

    return (
        <div>Profile</div>
    )
}

export default ProfilePage