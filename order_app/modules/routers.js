const version = require('./../config/version/version');
const logger = require('./../modules/utils/logger');
const httpCodes = require('http-status-codes');
//const authRouter = require('../modules/authentication/authentication.router');
const orderRouter = require('../modules/order/order.router');
const masterRouter = require('../modules/master/master.router');

exports.mainRouting = function(app) {
    // health check
	app.get('/api/health', (req, res) => {
		logger.info('API health check!!');
		let data = {};
		data = {
			type : 'healthstatus',
			healthstatus : {
				server_version : version,
				live : "OK"
			}
		};
		logger.info(JSON.stringify(data));
		return res.status(httpCodes.OK).json(data);
	});
	
	// API
	// ===
	// Don't cache api
	app.use('/api/*', function noCache(req, res, next) {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);
		next();
	});

	
	//app.use('/api', authRouter);
	app.use('/api', orderRouter);
	app.use('/api', masterRouter);
	
	// app.get('/*', (req, res) => {
	// 	res.redirect('/');
	// });
}