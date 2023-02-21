const http = require("http");
const PORT = 3000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };
const CharFactory = require("./src/factories/charFactory");
const charService = CharFactory.generateInstance();
const Character = require("./src/entities/character");

const routes = {
  "/characters:get": async (request, response) => {
    const { id } = request.queryString;
    const characters = await charService.find(id);
    response.write(JSON.stringify({ data: characters }));
    return response.end();
  },

  "/characters:post": async (request, response) => {
    for await (const data of request) {
      try {
        await Promise.reject("/characters:get");
        const item = JSON.parse(data);
        const character = new Character(item);
        const { error, valid } = character.isValid();

        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: error.join(",") }));
          return response.end();
        }

        const id = await charService.create(character);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({ success: "Character created!", id }));

        return response.end();
      } catch (error) {
        return handleError(response);
      }
    }
  },

  default: (request, response) => {
    response.write("Hi, this is my API! =)");
    response.end();
  },
};

const handleError = (response) => {
  return (error) => {
    console.log("Ooops! Bugs, bugs, bugs EVERYWHERE | ", error);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.parse({ error: "Internal server error!" }));

    return response.end();
  };
};

const handler = (request, response) => {
  const { url, method } = request;
  const [base, route, id] = url.split("/");

  request.queryString = { id: isNaN(id) ? id : Number(id) };

  const key = `/${route}:${method.toLowerCase()}`;

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;
  return chosen(request, response).catch(handleError(response));
};

http.createServer(handler).listen(PORT, () => console.log("Running at ", PORT));
