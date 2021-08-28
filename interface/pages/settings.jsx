import React from "react"
import KeepAlive from "react-activation"

import { app } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/tauri"

import { number, date } from "../../build.json"

const Settings = () => {
	const clear = async () => {
		const message = await invoke("clear_data")

		if (message === "true") {
			localStorage.clear()
			location.reload()
			location.replace("/")
		}
	}

	const about = async () => {
		const authme = await app.getVersion()
		const tauri = await app.getTauriVersion()

		const message = `Authme Lite: ${authme} \n\nTauri: ${tauri}\nReact: ${React.version}\n\nRelease date: ${date}\nBuild number: ${number}\n\nCreated by: Lőrik Levente`

		invoke("about", { invokeMessage: message })
	}

	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center box">
						<h1 className="text-gray-50 text-6xl">Settings</h1>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Clear data</h1>
							<h2 className="text-2xl mt-1">Clear all app data including settings and saved files.</h2>
							<button className="button" onClick={clear}>
								Clear data
							</button>
						</div>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Version</h1>
							<h2 className="text-2xl mt-1">0.3.0 (2021. July 10.)</h2>
							<button className="button" onClick={about}>
								About
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Settings
