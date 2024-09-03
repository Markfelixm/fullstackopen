const assert = require("node:assert");
const User = require("../models/user");

const initialUsers = [
	{
		username: "first user",
		passwordHash: "first_passwordHash",
		name: "first name",
	},
	{
		username: "second user",
		passwordHash: "second_passwordHash",
		name: "second name",
	},
	{
		username: "third user",
		passwordHash: "third_passwordHash",
		name: "third name",
	},
];

const getAllUsers = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

const assertResponseStatusAndMessage = (response, includedMessage) => {
	assert.strictEqual(response.statusCode, 400, "expected statusCode to be 400");
	assert.strictEqual(response.status, 400, "expected status to be 400");
	assert(
		response.body.error.includes(includedMessage),
		"expected descriptive error message"
	);
};

module.exports = { initialUsers, getAllUsers, assertResponseStatusAndMessage };
