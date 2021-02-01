const express = require('express');
const https = require('https');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

app.get('/nilai', (req, res) => {
	let userid = req.query.userid;
	let mapel = req.query.mapel;
	console.log('nilai: '+userid+' dari '+mapel);
//	let options = {
//		hostname: 'cbtsman1banjar.my.id',
//		port: 443,
//		path: '/wp-content/themes/unbk/nilai.php',
//		method: 'POST'
//	};
	request({
	    headers: {
	        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    uri: 'https://cbtsman1banjar.my.id/wp-content/themes/unbk/nilai.php',
	    body: {
	        'userid': userid,
	        'mapel': mapel
	    },
	    method: 'POST'
	}, (error, result, body) => {
	    console.log('result');
	    console.log(body);
	});
//	let request = https.request(options, result => {
//	    const chunks = [];
//	    result.on('data', data => {
//	        chunks.push(data);
//	    });
//	    result.on('end', () => {
//	        const resultData = Buffer.concat(chunks).toString();
//	    });
//	});
//	request.write('userid: '+userid+'\nmapel: '+mapel+'\n');
//	request.end();
});

app.listen(port, server_host, () => console.log(`Application listening on port ${port}!`))