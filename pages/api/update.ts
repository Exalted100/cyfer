import userCtrl from '../../controllers/userCtrl'
import middleware from '../../middleware/database';
import nc from "next-connect"
import auth from '../../middleware/auth';

const handler = nc()

handler.use(middleware)
handler.use(auth)

handler.put(userCtrl.updateUser)

export default handler