"use strict";

const Model = use("Model");

class Job extends Model {
	user() {
		return this.belongsTo("App/Models/User");
	}

	static castDates(field, value) {
		if (field === "created_at") {
			return `${value.fromNow(true)} ago`;
		}
		return super.formatDates(field, value);
	}
}

module.exports = Job;
