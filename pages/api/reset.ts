import userCtrl from '../../controllers/userCtrl'
import middleware from '../../middleware/database'
import auth from '../../middleware/auth'
import nc from "next-connect"

const handler = nc()

handler.use(middleware)
handler.use(auth)

handler.post(userCtrl.resetPassword)

export default handler