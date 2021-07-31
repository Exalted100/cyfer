import userCtrl from '../../controllers/userCtrl'
import middleware from '../../middleware/database';
import nc from "next-connect"

const handler = nc()

handler.use(middleware)

handler.post(userCtrl.login)

export default handler