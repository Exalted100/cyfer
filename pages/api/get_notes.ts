import userCtrl from '../../controllers/userCtrl'
import auth from '../../middleware/auth'
import middleware from '../../middleware/database'
import nc from "next-connect"

const handler = nc()

handler.use(middleware)
handler.use(auth)

handler.post(userCtrl.getNotes)

export default handler