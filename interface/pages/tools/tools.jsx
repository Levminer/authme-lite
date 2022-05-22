import React from "react"
import KeepAlive from "react-activation"
import { importMenu, exportMenu, importCodes, exportCodes } from "."

const Tools = () => {
	return (
		<>
			<KeepAlive>
				<div className="mb-32 flex flex-col items-center justify-center">
					<div className="mt-40 flex w-1/2 flex-col items-center justify-center rounded-3xl bg-gray-700 pt-16 pb-16">
						<h1 className="mb-1 text-gray-50">Tools</h1>
						<div className="mt-3 flex gap-3 md:flex-col lg:flex-row">
							<button className="importButton button" onClick={importMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
									<path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3"></path>
								</svg>
								Import
							</button>
							<button className="exportButton button" onClick={exportMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
									<path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
								</svg>
								Export
							</button>
						</div>

						<div className="importMenu block-container mt-1 flex flex-col items-center justify-center">
							<h3 className="mt-5">Import</h3>
							<h4 className="mt-1 text-center">You can import from 2FA QR codes here.</h4>
							<button type="button" className="button m-5" id="input" onClick={importCodes}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<line x1="15" y1="8" x2="15.01" y2="8"></line>
									<rect x="4" y="4" width="16" height="16" rx="3"></rect>
									<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
									<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
								</svg>
								Choose images
							</button>
						</div>

						<div className="exportMenu block-container mt-1 hidden flex-col items-center justify-center">
							<h3 className="mt-5">Export</h3>
							<h4 className="mt-1 text-center">You can export your 2FA QR codes if you saved them.</h4>
							<button className="button m-5" onClick={exportCodes}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Tools
