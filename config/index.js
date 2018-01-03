'use strict'

const config = {}

config.redisStore = {
	url: process.env.REDIS_STORE_URI,
	secret: process.env.REDIS_STORE_SECRET
}

config.oidc = {
	"oktaUrl": "https://dev-400194.oktapreview.com",
    "issuer": "https://dev-400194.oktapreview.com/oauth2/default",
    "clientId": "0oadfqq9lo5hTP5JC0h7",
    "clientSecret": "-mVxJYystiESYzlQm0KrjZ9DSF8jkY39su3y00ZX",
    "redirectUri": "http://localhost:8080/authorization-code/callback"
}

module.exports = config