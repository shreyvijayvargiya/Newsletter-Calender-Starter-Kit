import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { postLetter } from "utils/api/newsletter";
import { PreviewModal } from "modules";
import { toast } from "react-toastify";

const EditorComponent = dynamic(import("./Editor"), { ssr: false });

const AdminHome = () => {
	const editorCore = useRef(null);
	const [values, setValues] = useState({
		subject: "",
		data: "",
	});
	const [html, setHTML] = useState("");
	const [open, setOpen] = useState(false);

	const submitLetter = () => {
		if (!values.subject || !html) {
			toast.error("Subject and Email body is required");
		} else {
			postLetter({
				subject: values.subject,
				data: html,
				publishedDate: new Date(),
			});
			setValues({ subject: "", data: "" });
			editorCore.current = "";
		}
	};

	const getBlogData = async () => {
		const data = await editorCore.current._editorJS.save();
		convertDataToHtml(data.blocks);
		setValues((prevState) => ({ ...prevState, data: JSON.stringify(data) }));
	};

	const convertDataToHtml = (blocks) => {
		var convertedHtml = ``;
		blocks.map((block) => {
			switch (block.type) {
				case "header":
					convertedHtml += `<h${block.data.level} style="font-weight:600; margin:20px 0px;">${block.data.text}</h${block.data.level}>`;
					break;
				case "embed":
					convertedHtml += `<div><iframe width="100%" height="400" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
					break;
				case "paragraph":
					convertedHtml += `<p style="margin:20px 0px">${block.data.text} </p>`;
					break;
				case "delimiter":
					convertedHtml += "<><br /><hr /></>";
					break;
				case "image":
					convertedHtml += `<img src="${block.data.file.url}" style="width: 100%; max-height: 400px; margin:20px 0px;" /><div style="text-align:center">${block.data.caption}</div>`;
					break;
				case "list":
					convertedHtml += `<ul style="margin:10px">`;
					block.data.items.forEach(function (li) {
						convertedHtml += `<li style="list-style:inside; margin:4px 0px;">${li}</li>`;
					});
					convertedHtml += "</ul>";
					break;
				case "hyperlink":
					covertedHtml += `<a href=${block.data.link} target="_blank" style="color:black; margin:4px 0px; font-weight:bold; text-decoration:underline; "></a>`;
					break;
				case "link":
					covertedHtml += `<a href=${block.data.link} style="color:black; margin:4px 0px; font-weight:bold; text-decoration:underline; "></a>`;
					break;
				case "gist":
					convertedHtml += `<div class="gistcontainer" id="gist1"><script src=${block.data.gistLink}></script></div>`;
					break;
				case "button":
					convertedHtml += `<div style="margin:10px 0px; cursor:pointer;"><a target="_blank" href=${block.data.link}><button style="background:black; text-decoration: none; color: white; border-radius:4px; display:flex;justify-content: center; margin: auto; text-align:center; padding:10px; border:none">${block.data.text}</button></a></div>`;
				default:
					console.log("Unknown block type", block.type);
					break;
			}
		});
		setHTML(convertedHtml);
		return convertedHtml;
	};

	const handleInputChange = (e) => {
		const name = e.target.name;
		const val = e.target.value;
		setValues((prevState) => ({ ...prevState, [name]: val }));
	};

	return (
		<div className="py-20 md:w-2/5 mx-auto sm:w-full xxs:w-full xs:w-full">
			<div className={`${open ? "opacity-50 overflow-hidden" : "opacity-100"}`}>
				<div className="text-left">
					<div className="flex md:flex-row sm:flex-col xxs:flex-col xs:flex-col justify-between items-center">
						<div>
							<p>This is Admin page, use editor to write emails</p>
							<p>Click View letter to preview your email</p>
						</div>
						<div>
							<div className="flex justify-around items-center gap-1">
								<button
									onClick={submitLetter}
									className="bg-gray-900 dark:border dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-md px-8 py-2 text-sm rounded-md text-white"
								>
									Post letter
								</button>
								<button
									onClick={() => setOpen(true)}
									className="border-gray-900 border dark:border dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-md px-4 text-sm py-2 rounded-md dark:text-white text-black"
								>
									View letter
								</button>
							</div>
						</div>
					</div>
					<div className="flex md:flex-row sm:flex-col xxs:flex-col xs:flex-col justify-between items-center">
						<input
							className="outline-none p-2 my-2 border border-gray-400 dark:border-gray-800 bg-transparent dark:bg-gray-900 text-md w-full rounded-md"
							placeholder="Enter subject"
							name="subject"
							value={values.subject}
							onChange={handleInputChange}
						/>
					</div>
					<div onBlur={getBlogData}>
						<EditorComponent editorCore={editorCore} />
					</div>
				</div>
			</div>
			<PreviewModal open={open} setOpen={setOpen} html={html} values={values} />
		</div>
	);
};
export default AdminHome;
