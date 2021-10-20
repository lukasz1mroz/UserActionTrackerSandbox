let express = require('express');
let path = require('path');

let app = express();

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'demoSites'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));