const getLocation = () => {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      reject(new Error('위치 정보를 허용해주세요.'));
    }
  });
};

export default getLocation;