const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const routes = require("./routes");

const mercurius = require("mercurius");
const { schema, resolvers } = require("./schema");

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

fastify.register(require("fastify-cors"));

mongoose
  .connect("mongodb://localhost/mysurfshop")
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log(err));

routes.forEach((route) => fastify.route(route));

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

module.exports = fastify;
