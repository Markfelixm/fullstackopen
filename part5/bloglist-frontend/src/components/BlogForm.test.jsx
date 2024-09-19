import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("Testing BlogForm component", () => {
	test("updates parent state and calls onSubmit", async () => {
		const createBlog = vi.fn();
		const user = userEvent.setup();

		const { container } = render(
			<BlogForm createBlogHandler={createBlog} notify={undefined} />
		);

		const titleInput = container.querySelector("#title-input");
		await user.type(titleInput, "testing title input");
		const authorInput = container.querySelector("#author-input");
		await user.type(authorInput, "testing author input");
		const urlInput = container.querySelector("#url-input");
		await user.type(urlInput, "testing url input");

		const sendButton = screen.getByText("create");
		await user.click(sendButton);

		expect(createBlog.mock.calls).toHaveLength(1);
		const newBlog = createBlog.mock.calls[0][0];
		expect(newBlog).toEqual({
			title: "testing title input",
			author: "testing author input",
			url: "testing url input",
		});
	});
});
