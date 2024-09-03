const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const User = require("../models/user.js");
const helper = require("./user_api_test_helper.js");

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});
	for (let user of helper.initialUsers) {
		let userObject = new User(user);
		await userObject.save();
	}
});

describe("test that at endpoint /api/users", () => {
	test("users are returned as json", async () => {
		await api
			.get("/api/users")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	describe("creation of users", () => {
		test("is saved", async () => {
			const newUser = {
				username: "Test Username",
				password: "test_password",
				name: "Test Name",
			};

			await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const allUsers = await helper.getAllUsers();

			assert.strictEqual(
				helper.initialUsers.length + 1,
				allUsers.length,
				"expected users length to increase by one"
			);

			assert(
				allUsers.map((user) => user.username).includes(newUser.username),
				"expect new username to be found"
			);
		});

		test("requires username", async () => {
			const missingUsername = {
				password: "test_password",
				name: "Test Name",
			};

			const response = await api.post("/api/users").send(missingUsername);

			helper.assertResponseStatusAndMessage(response, "`username` is required");
		});

		test("requires username to be at least 3 characters long", async () => {
			const shortUsername = {
				username: "Te",
				password: "test_password",
				name: "Test Name",
			};

			const response = await api.post("/api/users").send(shortUsername);

			helper.assertResponseStatusAndMessage(
				response,
				"minimum allowed length (3)"
			);
		});

		test("requires unique username", async () => {
			const duplicateUsername = {
				username: helper.initialUsers[0].username,
				password: "valid password",
				name: "Valid Name",
			};

			const response = await api.post("/api/users").send(duplicateUsername);

			helper.assertResponseStatusAndMessage(
				response,
				"expected `username` to be unique"
			);
		});

		test("requires password", async () => {
			const missingPassword = {
				username: "missing password",
				name: "Test Name",
			};

			const response = await api.post("/api/users").send(missingPassword);

			helper.assertResponseStatusAndMessage(
				response,
				"password is required and must be at least 3 characters long"
			);
		});

		test("requires password to be at least 3 characters long", async () => {
			const shortPassword = {
				username: "Test Short Password",
				password: "pw",
				name: "Test Name",
			};

			const response = await api.post("/api/users").send(shortPassword);

			helper.assertResponseStatusAndMessage(
				response,
				"password is required and must be at least 3 characters long"
			);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
