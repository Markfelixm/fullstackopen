import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
	const blog = {
		title: "test title",
		author: "test author",
		url: "test.url",
		likes: 15,
	};

	render(<Blog blog={blog} />);

	const { container } = render(<Blog blog={blog} />);

	const div = container.querySelector(".blog");
	screen.debug(div);

	expect(div).toHaveTextContent(`${blog.title}, ${blog.author}`);
	expect(div).not.toHaveTextContent(blog.url);
	expect(div).not.toHaveTextContent(blog.likes.toString());
});
