const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
	res.send({message: 'Hello, Express!'});
});

app.get('/api/customers', (req, res) => {
	res.send([
    {
      'id': 1,
      'image': 'https://placeimg.com/64/64/1',
      'name': '엄기기',
      'birthday': '010124',
      'gender': '여자',
      'job': '대학생'
    }, 
    {
      'id': 2,
      'image': 'https://placeimg.com/64/64/2',
      'name': '엄니니',
      'birthday': '020224',
      'gender': '여자',
      'job': '대학생'
    }, 
    {
      'id': 3,
      'image': 'https://placeimg.com/64/64/3',
      'name': '디디디',
      'birthday': '030324',
      'gender': '여자',
      'job': '대학생'
    }
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));