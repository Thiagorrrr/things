var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();
const { Pool, Client } = require('pg')
 



const pool = new Pool({
  user: 'userdb',
  host: 'localhost',
  database: 'sampleBD',
  password: '12345678',
  port: 5432,
})


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  
})

app.engine('dust', cons.dust);



app.set('view engine', 'dust');
app.set('views', __dirname + '/views');



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res) {
	console.log('test');

	
		pool.query('SELECT * FROM name', function(err, result){
			if (err) {
				return console.log('error running query', err);
			}
			res.render('index', {name: result.rows});
			
		});
})

//server

app.listen(3000, function (){



console.log('Server Started on port 3000');


})