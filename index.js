let express = require('express');
let path = require('path');
let storage = require('./storage');

let app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('views', path.join(__dirname, 'demoSites'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/api/interactions', (req, res) => {
  storage.setItems(req.body);
  return res.status(201);
});

app.get('/api/interactions', (req, res) => {
  const interactions = storage.getItems();
  return res.status(200).json(interactions);
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));
