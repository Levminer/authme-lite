import React, { useEffect } from "react"
import KeepAlive from "react-activation"
import { about, clearData, version, names, changeNames } from "./index"

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
				<div className="mb-32 flex flex-col items-center justify-center">
					<div className="mt-40 flex w-1/2 flex-col items-center justify-center rounded-3xl bg-gray-700 pt-16 pb-16">
						<h1 className="text-gray-50">Settings</h1>
						<hr />
						<h3>Show 2FA names</h3>
						<h4 className="mt-1 text-center">The saved 2FA names will show up. You can copy it after clicking it.</h4>
						<div className="mx-auto mt-4 flex h-14 w-64 items-center justify-center rounded-full bg-white">
							<div className="relative mr-2 inline-block w-12 select-none rounded-full border-2 border-gray-900 bg-gray-900 align-middle">
								<input id="tgl0" onClick={changeNames} type="checkbox" className="toggle absolute right-6 top-1 block h-4 w-4 cursor-pointer appearance-none rounded-full bg-black outline-none duration-200 ease-in checked:bg-white focus:outline-none" />
								<label htmlFor="tgl0" className="toggle-bg block h-6 cursor-pointer overflow-hidden rounded-full bg-white"></label>
							</div>
							<span id="tgt0" className="text-xl text-black">
								Off
							</span>
						</div>
						<hr />
						<div className="flex flex-col items-center justify-center">
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
						<div className="flex flex-col items-center justify-center">
							<h3>Version</h3>
							<h4 className="ver mt-1 text-2xl"></h4>
							<button className="button" onClick={about}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Version
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Settings
