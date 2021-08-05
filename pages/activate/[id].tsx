import { useRouter } from "next/router"
import ActivationEmail from "../../components/ActivationEmail"

export default function Activate() {
    const router = useRouter()
    const { id } = router.query

    return (
        <ActivationEmail activation_token={id as string} />
    )
}