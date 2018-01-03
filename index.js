'use strict'

const app 		= require('./app')
const config 	= require('./config')
const port 		= process.env.PORT || 8080

// const { ExpressOIDC } = require('@okta/oidc-middleware');
// const oidc = new ExpressOIDC({
//   issuer: config.oidc.issuer,
//   client_id: config.oidc.clientId,
//   client_secret: config.oidc.clientSecret,
//   redirect_uri: config.oidc.redirectUri,
//   scope: 'openid profile email'
// });

// app.use(oidc.router);

// oidc.on('ready', () => {
// 	app.listen(port, function(err) {
// 		if (err) {
// 			throw err;
// 		}

// 		console.log(`Server is listening on port ${port} ...`)
// 		})
// });

// oidc.on('error', err => {
//   	console.log('Unable to configure ExpressOIDC', err);
// });

app.listen(port, function(err) {
	if (err) {
		throw err;
	}

	console.log(`Server is listening on port ${port} ...`)
});