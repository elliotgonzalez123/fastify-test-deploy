"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_1 = __importDefault(require("./routes/user"));
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(user_1.default, { prefix: "/api/users" });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: 3000, host: "0.0.0.0" });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
// Handle the signals and do a graceful shutdown
const exitHandler = (signal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Received signal to terminate: ${signal}`);
    yield fastify.close();
    process.exit(0);
});
process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
