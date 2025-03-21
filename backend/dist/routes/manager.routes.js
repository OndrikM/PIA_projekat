"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manager_controller_1 = require("../controllers/manager.controller");
const managerRouter = express_1.default.Router();
managerRouter.route('/loginManager').post((req, res) => new manager_controller_1.ManagerController().login(req, res));
managerRouter.route('/getManager').post((req, res) => new manager_controller_1.ManagerController().getManager(req, res));
managerRouter.route('/updateManager').post((req, res) => new manager_controller_1.ManagerController().updateManager(req, res));
managerRouter.route('/updateManagerPassword').post((req, res) => new manager_controller_1.ManagerController().updateManagerPassword(req, res));
managerRouter.route('/checkManagerEmail').post((req, res) => new manager_controller_1.ManagerController().checkManagerEmail(req, res));
exports.default = managerRouter;
//# sourceMappingURL=manager.routes.js.map