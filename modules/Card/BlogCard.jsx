import React from "react";

const BlogCard = ({ children }) => {
	return (
		<div className="p-1 cursor-pointer hover:border-gray-500 hover:shadow-xl dark:hover:border-gray-700 dark:border-gray-800 border-2 border-dotted border-gray-400 rounded-md">
			{children}
		</div>
	);
};
export default BlogCard;
