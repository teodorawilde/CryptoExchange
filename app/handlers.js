'use strict'

const config = require('../config');

/**
 * Index page - lists the scenarios that the developer can choose from
 * This is page that oidc-middleware redirects to by default
 * If we have the userinfo object, we can show the profile page
 * Route: /
 */
exports.scenarios = function (req, res) {
	if (req.isAuthenticated()) {
    	res.redirect(302, '/authorization-code/profile');
    	return;
  }
  	res.render('overview', { config });
};

/**
 * Authorization code, login redirect flow - Initiates the flow to get a code
 * by redirecting to Okta as the IDP. This flow is useful if you don't need
 * a custom login form.
 *
 * Route: /authorization-code/login-redirect
 */
exports.loginRedirect = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect(302, '/authorization-code/profile');
    return;
  }
  res.render('login-redirect', { config });
};

/**
 * Basic app logged-in state. This is protected by the session cookie, which is
 * only set when a successful auth to Okta has finished.
 *
 * Route: /authorization-code/profile
 */
exports.profile = function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect(302, '/');
    return;
  }
  res.render('profile', { user: req.userinfo, config });
};

/**
 * Logout handler - clears the server side app session. Note - the Okta
 * session is killed before visiting this route in the client side code.
 *
 * Route: /authorization-code/logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};