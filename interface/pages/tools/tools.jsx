import React from "react"
import KeepAlive from "react-activation"
import { switchMenu, importCodes, openImportCodes, exportCodes } from "."

const Advanced = () => {
	return (
		<>
			<KeepAlive>
				<div className="mb-32 flex flex-col items-center justify-center">
					<div className="mt-40 flex w-1/2 flex-col items-center justify-center rounded-3xl bg-gray-700 pt-16 pb-16">
						<h1 className="mb-1 text-gray-50">Advanced</h1>
						<div className="flex flex-row items-center justify-center gap-3">
							<button className="importButton button" onClick={switchMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
								</svg>
								Import
							</button>
							<button className="exportButton button" onClick={switchMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Export
							</button>
						</div>

						<div className="importMenu block-container mt-1 flex flex-col items-center justify-center">
							<h3 className="mt-5">Import</h3>
							<h4 className="mt-1">You can import from QR code(s) here.</h4>
							<input type="file" className="hidden" id="file" onChange={importCodes} accept=".jpg, .jpeg, .png, .bmp" multiple />
							<button type="button" className="button m-5" id="input" onClick={openImportCodes}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
								</svg>
								Import
							</button>
						</div>

						<div className="exportMenu block-container mt-1 hidden flex-col items-center justify-center">
							<h3 className="mt-5">Export</h3>
							<h4 className="mt-1 text-center">You can export your QR code(s) if you saved them.</h4>
							<button className="button m-5" onClick={exportCodes}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
								</svg>
								Export
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Advanced
