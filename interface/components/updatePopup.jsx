import React, { useEffect } from "react"
import { shell, app } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/tauri"
import { convert } from "../../libraries/markdown"

const UpdatePopup = () => {
	let notes

	const checkUpdate = async () => {
		console.log("Checking for update")

		const version = await app.getVersion()

		await fetch("https://api.levminer.com/api/v1/authme-lite/releases")
			.then((res) => res.json())
			.then((data) => {
				try {
					notes = data.body

					if (data.tag_name > version && data.tag_name != undefined && data.prerelease != true) {
						console.log("Update found")

						document.querySelector(".update").style.display = "block"
					}
				} catch (error) {
					return console.error("Error during auto update", error.stack)
				}
			})
	}

	const downloadUpdate = () => {
		shell.open("https://github.com/levminer/authme-lite/releases")
	}

	const releaseNotes = () => {
		const release_notes = convert(notes)

		invoke("info", { invokeMessage: release_notes })
	}

	const close = () => {
		document.querySelector(".update").style.display = "none"
	}

	useEffect(() => {
		checkUpdate()
	}, [])

	return (
		<div className="hidden w-full text-white bg-popup-blue font-bold sticky update">
			<div className="container flex flex-row items-center justify-between px-6 py-4 mx-auto">
				<div className="flex flex-row justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
					</svg>

					<p className="mx-3">New Authme Lite version available. Please update your app!</p>
					<div className="flex flex-row justify-center items-center top-2 relative">
						<button type="button" onClick={downloadUpdate} className="py-1 px-3 mr-3 relative flex flex-row justify-center items-center -top-2.5 bg-white hover:bg-transparent text-black border-2 border-white hover:text-white cursor-pointer transition ease-in duration-200 text-center text-base font-bold rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" className="mr-1" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Download update
						</button>
						<button type="button" onClick={releaseNotes} className="py-1 px-3 relative flex flex-row justify-center items-center -top-2.5 bg-white hover:bg-transparent text-black border-2 border-white hover:text-white cursor-pointer transition ease-in duration-200 text-center text-base font-bold rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" className="mr-1" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
							</svg>
							Release notes
						</button>
					</div>
				</div>
				<a onClick={close} className="p-1 transition-colors duration-200 transform rounded-md hover:text-gray-800 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</a>
			</div>
		</div>
	)
}

export default UpdatePopup
