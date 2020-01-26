"use strict";

const Job = use("App/Models/Job");

class JobController {
	async index({ view }) {
		/* Fetch Job */
		const jobs = await (await Job.all()).toJSON();
		return view.render("index", { jobs });
	}
}

module.exports = JobController;
