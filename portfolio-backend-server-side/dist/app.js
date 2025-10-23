"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// Middleware
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, compression_1.default)()); // Compresses response bodies for faster delivery
app.use((0, cookie_parser_1.default)()); // Parse Cookie header and populate req.cookies
app.use((0, cors_1.default)({
    origin: 'https://portfolio-frontend-client-side.vercel.app',
    credentials: true,
}));
app.use('/api/v1', routes_1.router);
// Default route for testing
app.get('/', (_req, res) => {
    res.send('Portfolio API is running');
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
