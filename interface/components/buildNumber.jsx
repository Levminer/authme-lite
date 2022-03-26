import React from "react"
import build from "../../build.json"
import { app } from "@tauri-apps/api"

const checkBuildNumber = async () => {
	if (build.number.startsWith("alpha")) {
		const version = await app.getVersion()

		document.querySelector(".build-content").textContent = `You are running an alpha version of Authme Lite - Version ${version} - Build ${build.number}`
		document.querySelector(".build").style.display = "flex"
	}
}

checkBuildNumber()

const BuildNumber = () => {
	return (
		<div className="build sticky top-0 z-40 hidden w-full bg-black font-bold text-white">
			<div className="container mx-auto flex flex-row items-center justify-center px-6 py-2">
				<div className="flex">
					<p className="build-content mx-3 flex flex-row text-center">You are running a pre release version of Authme!</p>
				</div>
			</div>
		</div>
	)
}

export default BuildNumber
