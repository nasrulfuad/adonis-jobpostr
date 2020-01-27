"use strict";

class Amazing {
	async handle({ view, request }, next) {
		view.share({
			isActivePath: routeComparison => {
				return request.match([routeComparison]);
			}
		});
		await next();
	}
}

module.exports = Amazing;
