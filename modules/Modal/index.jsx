import React from "react";
import Modal from "react-modal";
import { CloseIcon } from "modules/Icons";
import { useSelector } from "react-redux";
import colors from "tailwindcss/colors";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		border: "none",
		marginRight: "-50%",
		zIndex: 10,
		height: "90%",
		width: "60%",
		overflowY: "scroll",
		transform: "translate(-50%, -50%)",
	},
};

const PreviewModal = ({ open, setOpen, values, html }) => {
	const { user: data } = useSelector((state) => state);

	return (
		<>
			{open && (
				<div className="text-left border border-gray-300 rounded-md dark:border-gray-800 bg-gray-50 dark:bg-gray-900 md:w-2/5 sm:w-full xxs:w-full xs:w-full mx-auto fixed top-20 bottom-10 left-0 right-0 overflow-y-scroll">
					<div>
						{html ? (
							<div className="min-w-96 mx-auto my-8 z-10 sm:w-full xxs:w-full xs:w-full rounded-md dark:bg-gray-900 dark:text-white text-black">
								<div className="flex justify-between items-center w-full p-4 border-b border-gray-300 dark:border-gray-800">
									<p className="text-2xl">{values.subject}</p>
									<div
										className="dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer px-2"
										onClick={() => setOpen(false)}
									>
										<CloseIcon />
									</div>
								</div>
								<div
									dangerouslySetInnerHTML={{ __html: html }}
									className="px-6"
								/>
							</div>
						) : (
							<div className="md:w-2/5 mx-auto my-8 z-10 sm:w-full xxs:w-full xs:w-full bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-white text-black">
								<p className="text-black dark:text-gray-300 p-4">
									Write in editor to view email
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
export default PreviewModal;
