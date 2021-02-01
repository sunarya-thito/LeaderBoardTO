const express = require('express');
const querystring = require('querystring');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

const cache = {};

app.get('/mapel', (req, res) => {
	//https://cbtsman1banjar.my.id/wp-content/themes/unbk/api-18575621/getmapel.php
	let options = {
		hostname: 'cbtsman1banjar.my.id',
		port: 443,
		path: '/wp-content/themes/unbk/api-18575621/getmapel.php',
		method: 'GET'
	};
	let request = https.request(options, result => {
		const chunks = [];
		result.on('data', data => chunks.push(data));
		result.on('end', () => {
			const resultData = Buffer.concat(chunks).toString();
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.send(resultData);
		});
	});
	request.end();
});

app.get('/nilai', (req, res) => {
	let userid = req.query.userid;
	let mapel = req.query.mapel;
	let alreadyCached = cache[userid];
	if (alreadyCached) {
	    let cachedValue = alreadyCached[mapel];
	    if (cachedValue) {
	        res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(cachedValue);
	        return;
	    }
	}
	let formData = querystring.stringify({
                       	    'userid': userid,
                       	    'mapel': mapel,
                       	    standalone: 1
                       	});
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
	        if (resultData != '--') {
	            let cached = cache[userid];
	            if (cached) {
	                cached[mapel] = resultData;
	            } else {
	                cache[userid] = {mapel: resultData}
	            }
	        }
	        res.setHeader('Access-Control-Allow-Origin', '*');
	        res.send(resultData);
	    });
	});
	request.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.write(formData);
	request.end();
});

app.listen(port, server_host, () => console.log(`Application listening on port ${port}!`))