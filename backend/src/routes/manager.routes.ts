import express from 'express';
import { ManagerController } from '../controllers/manager.controller';
const managerRouter = express.Router();

managerRouter.route('/loginManager').post(
    (req, res) => new ManagerController().login(req, res)
)

managerRouter.route('/getManager').post(
    (req, res) => new ManagerController().getManager(req, res)
)

managerRouter.route('/updateManager').post(
    (req, res) => new ManagerController().updateManager(req, res)
)

managerRouter.route('/updateManagerPassword').post(
    (req, res) => new ManagerController().updateManagerPassword(req, res)
)

managerRouter.route('/checkManagerEmail').post(
    (req, res) => new ManagerController().checkManagerEmail(req, res)
)

export default managerRouter;