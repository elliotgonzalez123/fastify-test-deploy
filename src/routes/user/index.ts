import { FastifyInstance, FastifySchema } from "fastify";
import { createUser, getUser, getUsers } from "../../controllers/user";

const getUserSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
};

const getUsersSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      search: { type: "string" },
    },
    // required: ["search"],
  },
};

const createUserSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
    },
    required: ["name", "email"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        email: { type: "string" },
      },
    },
  },
};

async function UserRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: getUsersSchema }, getUsers);
  fastify.post("/", { schema: createUserSchema }, createUser);
  fastify.get("/:id", { schema: getUserSchema }, getUser);
}

export default UserRoutes;
