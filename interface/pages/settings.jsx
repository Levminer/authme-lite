import React, { useEffect } from "react"
import KeepAlive from "react-activation"
import { about, clearData, version, names, changeNames } from "../../resources/js/settings/index"

let render = false
const Settings = () => {
	version()

	if (render === false) {
		useEffect(() => {
			setTimeout(() => {
				names()
			}, 100)
		}, [])

		render = true
	}

	return (
		<>
			<KeepAlive>
				<div className="flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center w-1/2">
						<h1 className="text-gray-50">Settings</h1>
						<hr />
						<h3>Show 2FA names</h3>
						<h4 className="mt-1 text-center">The saved 2FA names will show up. You can copy it after clicking it.</h4>
						<div className="flex justify-center items-center w-56 h-14 mt-4 bg-white mx-auto rounded-full">
							<div className="relative inline-block w-12 mr-2 align-middle select-none bg-gray-900 border-2 border-gray-900 rounded-full">
								<input id="tgl0" onClick={changeNames} type="checkbox" className="toggle checked:bg-white outline-none focus:outline-none right-6 duration-200 ease-in absolute block w-4 h-4 rounded-full top-1 bg-black appearance-none cursor-pointer" />
								<label htmlFor="tgl0" className="toggle-bg block overflow-hidden h-6 rounded-full bg-white cursor-pointer"></label>
							</div>
							<span id="tgt0" className="text-black text-xl">
								-
							</span>
						</div>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h3>Clear data</h3>
							<h4 className="mt-1 text-center">Clear all app data including settings and saved codes.</h4>
							<button className="button" onClick={clearData}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Clear data
							</button>
						</div>
						<hr />
						<div className="flex justify-center items-center flex-col">
							<h3>Version</h3>
							<h4 className="text-2xl mt-1 ver"></h4>
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
