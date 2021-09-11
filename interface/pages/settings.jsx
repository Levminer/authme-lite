import React from "react"
import KeepAlive from "react-activation"
import { about, clearData, version } from "../../resources/js/settings/index"

const Settings = () => {
	version()

	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center w-1/2">
						<h1 className="text-gray-50 text-6xl">Settings</h1>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Clear data</h1>
							<h2 className="text-2xl mt-1 text-center">Clear all app data including settings and saved codes.</h2>
							<button className="button" onClick={clearData}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Clear data
							</button>
						</div>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Version</h1>
							<h2 className="text-2xl mt-1 ver"></h2>
							<button className="button" onClick={about}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
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
