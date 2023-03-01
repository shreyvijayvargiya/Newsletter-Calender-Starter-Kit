import React from "react";
import {
	BlogCard,
	RenderIconComponent,
	SubscribeComponent,
	LeftLayout,
	RightLayout,
} from "modules";

const SocialLinks = () => {
  const socialLinks = [
		{
			name: "Github",
			link: "https://github.com",
		},
		{
			name: "Twitter",
			link: "https://twitter.com",
		},
		{
			name: "LinkedIn",
			link: "https://linkedin.com",
		},
		{
			name: "Youtube",
			link: "https://youtube.com",
		},
		{
			name: "Instagram",
			link: "https://instagram.com",
		},
	];
  return (
		<div>
			<div className="flex justify-around items-center gap-1">
				{socialLinks.map((item) => (
					<a
						href={item?.link}
						key={item?.name}
						target="_blank"
						className="m-2 flex justify-start items-center gap-1"
					>
						<RenderIconComponent name={item?.name} />
					</a>
				))}
			</div>
		</div>
	);
};
export default SocialLinks;
