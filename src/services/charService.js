class CharService {
  constructor({ charRepository }) {
    this.charRepository = charRepository;
  }

  async find(itemId) {
    return this.charRepository.find(itemId);
  }

  async create(data) {
    return this.charRepository.create(data);
  }
}

module.exports = CharService;
