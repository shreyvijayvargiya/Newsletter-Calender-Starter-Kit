import React from "react";
import { SocialLinks, SubscribeComponent } from "modules";

const LeftLayout = () => {
	return (
		<div className="lg:block sm:w-full xxs:w-full xs:w-full sm:relative xxs:relative xs:relative md:w-2/5 fixed left-0 top-6 mt-8 bottom-0 p-4 overflow-y-scroll overflow-x-hidden">
			<div className="flex flex-col justify-center h-full items-start border-r border-gray-300 sm:border-none xxs:border-none xs:border-none dark:border-gray-800 py-20 px-10">
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
		</div>
	);
};
export default LeftLayout;
