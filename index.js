const express = require('express');
const querystring = require('querystring');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

app.get('/nilai', (req, res) => {
	let userid = req.query.userid;
	let mapel = req.query.mapel;
	console.log('nilai: '+userid+' dari '+mapel);
	let options = {
		hostname: 'cbtsman1banjar.my.id',
		port: 443,
		path: '/wp-content/themes/unbk/nilai.php',
		method: 'POST'
	};
	let request = https.request(options, result => {
	    const chunks = [];
	    result.on('data', data => {
	        chunks.push(data);
	    });
	    result.on('end', () => {
	        const resultData = Buffer.concat(chunks).toString();
	        console.log(resultData);
	    });
	});
	request.write(querystring.stringify({
	    'userid': userid,
	    'mapel': mapel
	}));
	request.end();
});

app.listen(port, server_host, () => console.log(`Application listening on port ${port}!`))