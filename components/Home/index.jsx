import React, { useState } from "react";
import { DateIcon } from "modules/Icons";
import { useQuery } from "react-query";
import { fetchAllLetters } from "utils/api/newsletter";
import { BlogCard, LeftLayout, RightLayout } from "modules";
import { PreviewModal } from "modules";
import { SocialLinks, SubscribeComponent } from "modules";

const Home = () => {
	const [letters, setLetters] = useState(null);
	const [open, setOpen] = useState(false);
	const [html, setHtml] = useState();
	const [values, setValues] = useState({
		subject: "",
		data: "",
		publishedDate: "",
	});

	const { data, isLoading } = useQuery(["allLetters"], async () => {
		setLetters(await fetchAllLetters());
	});

	const openBlog = (item) => {
		setOpen({ state: true });
		setHtml(item.data);
		setValues({
			subject: item.subject,
			data: item.data,
			publishedDate: item.publishedDate,
		});
		// router.push(`/blog/${id}`);
	};

	return (
		<div className="h-11/12 w-full md:flex-row sm:flex-col xxs:flex-col overflow-hidden">
			<div className="md:w-2/5 sm:w-full xxs:w-full xs:w-full flex flex-col justify-center h-full items-start border-r border-gray-300 sm:border-none xxs:border-none xs:border-none dark:border-gray-800 py-20 px-10">
				<div className="mx-auto">
					<img
						src="./images/avatar.png"
						className="w-32 h-32 rounded-full mx-auto"
					/>
					<div className="my-2">
						<p className="text-2xl my-2">John Doe Blogs</p>
						<p className="text-md mx-auto">👓 Developer || 🎨 Writer </p>
					</div>
					<SocialLinks />
				</div>
				<div className="flex justify-center items-center gap-4 mx-auto my-4">
					<SubscribeComponent />
				</div>
			</div>
			<div className="md:w-3/5 sm:w-full xxs:w-full xs:w-full mx-auto p-10 md:fixed md:top-20 md:bottom-20 overflow-scroll h-4/5 md:right-10">
				{letters &&
					letters.map((item) => {
						const date = new Date(item.publishedDate.seconds * 1000)
							.toString()
							.split(" ");
						return (
							<div onClick={() => openBlog(item)}>
								<div className="border-l-2 border-dotted border-gray-500 dark:border-gray-700 ml-4 p-4" />
								<BlogCard>
									<div className="flex justify-start items-center md:gap-20 md:flex-row sm:flex-col xs:flex-col xxs:flex-col sm:items-start xxs:items-start xs:items-start">
										<div className="p-2">
											<div className="flex justify-start gap-1 items-center text-xs text-gray-800 m-1">
												<DateIcon />
												<p className="text-gray-900 dark:text-gray-400 w-full text-md">
													{date[2] + " " + date[1]}
												</p>
											</div>
										</div>
										<p className="text-lg text-left my-2">{item.subject}</p>
									</div>
								</BlogCard>
								<div className="border-l-2 border-dotted border-gray-500 dark:border-gray-700 ml-4 p-1" />
							</div>
						);
					})}
			</div>
			<PreviewModal values={values} open={open} setOpen={setOpen} html={html} />
		</div>
	);
};
export default Home;
