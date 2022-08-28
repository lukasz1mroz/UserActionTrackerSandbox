let mockStore = {};

const storage = {
  setItems: (items) => (mockStore = items),
  getItems: () => mockStore,
  resetItems: () => (mockStore = {}),
};

module.exports = storage;
