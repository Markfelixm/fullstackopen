import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Testing Blog component", () => {
	const blogUser = {
		username: "tester username",
		name: "tester name",
	};

	const blog = {
		title: "test title",
		author: "test author",
		url: "test.url",
		likes: 15,
		user: blogUser,
	};

	test("renders base content", () => {
		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector(".blog");

		expect(div).toHaveTextContent(`${blog.title}, ${blog.author}`);
		expect(div).not.toHaveTextContent(blog.url);
		expect(div).not.toHaveTextContent(blog.likes.toString());
	});

	test("renders detailed content on view clicked", async () => {
		const { container } = render(
			<Blog
				blog={blog}
				handleLike={undefined}
				handleRemove={undefined}
				user={blogUser}
			/>
		);

		const div = container.querySelector(".blog");

		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		expect(div).toHaveTextContent(`${blog.title}, ${blog.author}`);
		expect(div).toHaveTextContent(blog.url);
		expect(div).toHaveTextContent(blog.likes.toString());
	});

	test("correctly registers like button events", async () => {
		const mockHandler = vi.fn();

		const { container } = render(
			<Blog
				blog={blog}
				handleLike={mockHandler}
				handleRemove={undefined}
				user={blogUser}
			/>
		);

		const div = container.querySelector(".blog");

		const user = userEvent.setup();
		const viewButton = screen.getByText("view");
		await user.click(viewButton);
		const likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});
