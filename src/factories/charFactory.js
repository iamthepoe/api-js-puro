const CharRepository = require("./../repositories/charRepository");
const CharService = require("./../services/charService");
const { join } = require("path");

const filename = join(__dirname, "../../database/", "data.json");

const generateInstance = () => {
  const charRepository = new CharRepository({
    file: filename,
  });

  const charService = new CharService({
    charRepository,
  });

  return charService;
};

module.exports = { generateInstance };
