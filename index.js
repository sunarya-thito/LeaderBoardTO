const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.get('/nilai', (req, res) => {
	let userid = req.query.userid;
	let mapel = req.query.mapel;
	let options = {
		hostname: 'https://cbtsman1banjar.my.id/',
		port: 443,
		path: 'wp-content/themes/unbk/nilai.php',
		method: 'POST'
	};
	let request = https.request(options, result => {
	    res.on('data', data => {
	        console.log(data);
	    });
	});
	request.write('userid='+userid+'&mapel='+mapel);
	request.end();
});

app.listen(port, () => console.log(`Application listening on port ${port}!`))