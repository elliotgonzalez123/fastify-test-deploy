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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = exports.getUser = void 0;
// Dummy data
const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Mike Smith", email: "mike@example.com" },
];
const getUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(request.params.id);
        const user = users.find((u) => u.id === userId);
        if (!user) {
            throw new Error("User not found!");
        }
        reply.status(200).send(user);
    }
    catch (error) {
        if (error instanceof Error) {
            reply.status(404).send({ error: error.message });
        }
    }
});
exports.getUser = getUser;
const getUsers = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = request;
    if (!query.search) {
        return users;
    }
    const filtered = users.filter((u) => u.name.toLocaleLowerCase().startsWith(query.search.toLocaleLowerCase()));
    return reply.code(200).send(filtered);
});
exports.getUsers = getUsers;
const createUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = request.body;
    const newUser = { id: 11, name, email };
    users.push(newUser);
    reply.code(201).send(newUser);
});
exports.createUser = createUser;
