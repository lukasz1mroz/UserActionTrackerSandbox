const getAccessData = async () => {
  const eventDate = new Date().toISOString();
  const ipApiResponse = await fetch('https://ipapi.co/json/');
  const userIp = (await ipApiResponse.json()).ip.toString();
  // Using localStorage for demo purpose. Data should be stored on server side persistance layer and accessed via API with CRUD methods.
  const localStorageRecord = JSON.parse(localStorage.getItem(userIp));

  return { eventDate, userIp, localStorageRecord };
};

const trackUserAccessWithWeeks = async () => {
  window.addEventListener('load', async () => {
    try {
      const { eventDate, userIp, localStorageRecord } = await getAccessData();
      const oneWeekTimeInMs = 6.048e8;
      const updatedCount = localStorageRecord !== null ? (localStorageRecord.count += 1) : 1;
      const lastVisitTimestamp = new Date(localStorageRecord.lastVisitDate).getTime();
      const isFirstWeeklyVisit =
        !lastVisitTimestamp || new Date(eventDate).getTime() - lastVisitTimestamp > oneWeekTimeInMs ? true : false;

      localStorage.setItem(
        userIp,
        JSON.stringify({
          url: window.location.href,
          count: updatedCount,
          lastVisitDate: eventDate,
          isFirstWeeklyVisit: isFirstWeeklyVisit,
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  });
};

trackUserAccessWithWeeks();
