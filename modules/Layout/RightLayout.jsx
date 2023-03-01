import React from "react";


const RightLayout = ({ children }) => {
	return (
		<div className="lg:block sm:relative xxs:relative xs:relative sm:w-full xxs:w-full xs:w-full md:w-2/4 md:fixed md:right-40 md:top-10  md:bottom-0 p-10 overflow-y-scroll overflow-x-hidden h-screen">
			{children}
		</div>
	);
};
export default RightLayout;
