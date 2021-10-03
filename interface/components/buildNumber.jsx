import React from "react"
import { number } from "../../build.json"
import { app } from "@tauri-apps/api"

const checkBuildNumber = async () => {
	if (number.startsWith("alpha")) {
		const version = await app.getVersion()

		document.querySelector(".build-content").textContent = `You are running an alpha version of Authme Lite - Version ${version} - Build ${number}`
		document.querySelector(".build").style.display = "flex"
	}
}

checkBuildNumber()

const BuildNumber = () => {
	return (
		<div className="w-full hidden text-white bg-black font-bold build sticky top-0 z-40">
			<div className="container flex flex-row items-center justify-center px-6 py-2 mx-auto">
				<div className="flex">
					<p className="mx-3 flex flex-row build-content">You are running a pre release version of Authme!</p>
				</div>
			</div>
		</div>
	)
}

export default BuildNumber
