"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "JobController.index");
Route.on("/login").render("auth.login");

Route.on("/signup").render("auth.signup");
Route.post("/signup", "UserController.create").validator("CreateUser");

Route.get("/logout", async ({ auth, response }) => {
	await auth.logout();
	return response.redirect("/");
});
