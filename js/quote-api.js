const options = {
  method: 'GET',
  url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/',
  params: {cat: 'famous', count: '10'},
  headers: {
    'x-rapidapi-key': 'fbd0739064msh726b5e808a8b5e4p1fd9c2jsn8e47c003de81',
    'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});