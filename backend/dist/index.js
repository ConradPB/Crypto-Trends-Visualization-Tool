"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cryptoRoutes_1 = __importDefault(require("./routes/cryptoRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    "https://crypto-trends-kohl.vercel.app",
    "http://localhost:5173",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});
app.use("/api/crypto", cryptoRoutes_1.default);
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("combined", {
        stream: {
            write: (message) => logger_1.default.info(message.trim()),
        },
    }));
}
exports.default = app;
//# sourceMappingURL=index.js.map