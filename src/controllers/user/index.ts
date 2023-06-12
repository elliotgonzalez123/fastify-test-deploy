import { FastifyRequest, FastifyReply } from "fastify";

type User = {
  id: number;
  name: string;
  email: string;
};

// Dummy data
const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Mike Smith", email: "mike@example.com" },
];

export const getUser = async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const userId = Number(request.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      throw new Error("User not found!");
    }
    reply.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(404).send({ error: error.message });
    }
  }
};

export const getUsers = async (
  request: FastifyRequest<{
    Querystring: {
      search: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { query } = request;

  if (!query.search) {
    return users;
  }

  const filtered = users.filter((u) =>
    u.name.toLocaleLowerCase().startsWith(query.search.toLocaleLowerCase())
  );

  return reply.code(200).send(filtered);
};

export const createUser = async (
  request: FastifyRequest<{
    Body: {
      name: string;
      email: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { name, email } = request.body;
  const newUser = { id: 11, name, email };
  users.push(newUser);
  reply.code(201).send(newUser);
};
