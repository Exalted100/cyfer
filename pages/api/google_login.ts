import userCtrl from '../../controllers/userCtrl'
import auth from '../../middleware/auth'
import middleware from '../../middleware/database';
import nc from "next-connect"

const handler = nc()

handler.use(middleware)

handler.post(userCtrl.googleLogin)

export default handler