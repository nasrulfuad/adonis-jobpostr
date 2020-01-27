"use strict";

const Route = use("Route");

Route.get("/", "JobController.index").as("homepage");
Route.on("/login").render("auth.login");
Route.post("/login", "UserController.login").validator("LoginUser");

Route.on("/signup").render("auth.signup");
Route.post("/signup", "UserController.create").validator("CreateUser");

Route.get("/logout", async ({ auth, response }) => {
	await auth.logout();
	return response.redirect("/");
});

Route.group(() => {
	Route.get("/", "JobController.userIndex");
	Route.post("/", "JobController.create").validator("CreateJob");
	Route.get("/:id/delete", "JobController.destroy");
	Route.get("/:id/edit", "JobController.edit");
	Route.post("/:id/edit", "JobController.update").validator("CreateJob");
}).prefix("/my-jobs");
