const getAccessData = async () => {
  const eventDate = new Date().toISOString();
  const ipApiResponse = await fetch('https://ipapi.co/json/');
  const userIp = (await ipApiResponse.json()).ip.toString();
  // Using localStorage for demo purpose. Data should be stored on server side persistance layer and accessed via API with CRUD methods.
  const localStorageRecord = JSON.parse(localStorage.getItem(userIp));

  return { eventDate, userIp, localStorageRecord };
};
