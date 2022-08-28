const getAccessData = async () => {
  const ipApiResponse = await fetch('https://ipapi.co/json/');
  const userIp = (await ipApiResponse.json()).ip.toString();
  // Using localStorage for demo purpose. Data should be stored on server side persistance layer and accessed via API with CRUD methods.
  const userStorageRecord = JSON.parse(localStorage.getItem(userIp));

  return { userIp, userStorageRecord };
};

const prepDataToAddOrUpdateVisit = async (currentUrl) => {
  const { userIp, userStorageRecord } = await getAccessData();

  if (!userStorageRecord) {
    const visits = {
      visits: [
        { url: window.location.href, count: 1, lastVisitDate: new Date().toISOString(), isFirsVisitInAWeek: true },
      ],
    };

    return { userIp, visits };
  }

  const updatedVisits = userStorageRecord.visits;
  const foundVisit = userStorageRecord.visits.find((visit) => visit.url === currentUrl);

  if (foundVisit) {
    const foundVisitIdx = updatedVisits.indexOf(foundVisit);
    const oneWeekTimeInMs = 6.048e8;

    foundVisit.count++;
    foundVisit.isFirsVisitInAWeek =
      new Date().getTime() - new Date(foundVisit.lastVisitDate).getTime() > oneWeekTimeInMs ? true : false;
    updatedVisits[foundVisitIdx] = foundVisit;
    const visits = { visits: updatedVisits };

    return { userIp, visits };
  }

  const newVisit = {
    url: window.location.href,
    count: 1,
    lastVisitDate: new Date().toISOString(),
    isFirsVisitInAWeek: true,
  };

  updatedVisits.push(newVisit);

  const visits = { visits: updatedVisits };

  return { userIp, visits };
};

const trackUserAccessWithWeeks = async () => {
  window.addEventListener('load', async () => {
    try {
      const updatedVisitsData = await prepDataToAddOrUpdateVisit(window.location.href);

      localStorage.setItem(updatedVisitsData.userIp, JSON.stringify(updatedVisitsData.visits));
    } catch (error) {
      throw new Error(error);
    }
  });
};

trackUserAccessWithWeeks();
