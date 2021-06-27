import React from "react"
import KeepAlive from "react-activation"

import { shell } from "@tauri-apps/api"

import ClearDataDialog from "../components/clearDataDialog.jsx"

const Settings = () => {
	const openReleases = () => {
		shell.open("https://github.com/Levminer/authme-lite/releases")
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
							<ClearDataDialog />
						</div>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Version</h1>
							<h2 className="text-2xl mt-1">0.2.0 (2021. June 27.)</h2>
							<button className="button" onClick={openReleases}>
								Release notes
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Settings
