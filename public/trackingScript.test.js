let trackingScript = require('./trackingScript');

const unmockedFetch = global.fetch;
const unmockedLocalStorage = global.localStorage;

describe('Unit tests', () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ ip: 'mock-ip' }),
      });

    class LocalStorageMock {
      constructor() {
        this.store = {
          'mock-ip':
            '{"visits":[{"url":"mock-url","count":1,"lastVisitDate":"2022-08-29T06:45:46.946Z","isFirsVisitInAWeek":true}]}',
        };
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = String(value);
      }

      removeItem(key) {
        delete this.store[key];
      }
    }

    global.localStorage = new LocalStorageMock();
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
    global.localStorage = unmockedLocalStorage;
  });

  describe('trackingScript', () => {
    describe('getAccessData', () => {
      it.only('(U) should return user access data', async () => {
        const mockStorageResponse = {
          visits: [{ count: 1, isFirsVisitInAWeek: true, lastVisitDate: '2022-08-29T06:45:46.946Z', url: 'mock-url' }],
        };
        const response = await trackingScript.getAccessData();

        expect(response.userIp).toBe('mock-ip');
        expect(response.userStorageRecord).toEqual(mockStorageResponse);
      });
    });

    describe('prepDataToAddOrUpdateVisit', () => {
      it('should add new user record', () => {});
      it('should update current visit', () => {});
      it('should add new visit for user', () => {});
    });

    describe('trackUserAccessWithWeeks', () => {
      it('should send action to backend', () => {});
      it('should throw an error from backend', () => {});
    });
  });
});
