"use strict";

const Job = use("App/Models/Job");

class JobController {
	async index({ view }) {
		const jobs = (await Job.query()
			.with("user")
			.fetch()).toJSON();
		return view.render("index", { jobs });
	}

	async userIndex({ view, auth, response, session }) {
		try {
			await auth.check();
			const jobs = await (await auth.user.jobs().fetch()).toJSON();
			return view.render("jobs", { jobs });
		} catch (error) {
			session.flash({ message: "Your are not logged in, please signup!" });
			return response.redirect("/signup");
		}
	}

	async create({ request, response, session, auth }) {
		const { title, link, description } = request.all();
		const posted = await auth.user.jobs().create({ title, link, description });
		session.flash({ message: "Your job has been posted!" });
		return response.redirect("back");
	}

	async edit({ params, view }) {
		try {
			return await Job.find(params.id);
		} catch (err) {
			console.log(err);
			return { status: 500, message: "Internal server error" };
		}
	}

	async update({ response, request, session, params }) {
		const job = await Job.find(params.id);
		const { title, link, description } = request.all();

		job.title = title;
		job.link = link;
		job.description = description;

		await job.save();
		session.flash({ message: "Your job has been updated" });
		return response.redirect("back");
	}

	async destroy({ response, session, params }) {
		const job = await Job.find(params.id);
		await job.delete();
		session.flash({ message: "Your job has been removed" });
		return response.redirect("back");
	}
}

module.exports = JobController;
