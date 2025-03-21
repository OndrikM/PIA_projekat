"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const examination_routes_1 = __importDefault(require("./routes/examination.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const manager_routes_1 = __importDefault(require("./routes/manager.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('fs'), (req, res) => {
    console.log(req.file);
    res.json(req.file.filename);
});
const path = require('path');
app.use('/public', express_1.default.static('./src/public'));
mongoose_1.default.connect("mongodb://127.0.0.1:27017/ordinacijaDB");
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/patient', patient_routes_1.default);
router.use('/doctor', doctor_routes_1.default);
router.use('/exam', examination_routes_1.default);
router.use('/appointment', appointment_routes_1.default);
router.use('/manager', manager_routes_1.default);
app.use('/', router);
app.get('/', (req, res) => res.send('Zdravo'));
app.listen(4000, () => console.log(`Radi na portu 4000`));
//# sourceMappingURL=server.js.map