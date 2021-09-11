import React, { useEffect } from "react"
import KeepAlive from "react-activation"
import { loadSavedCodes, saveCodes, loadFile, openDialog } from "../../resources/js/codes"

let render = false

const Codes = () => {
	useEffect(() => {
		if (render === false) {
			console.log("Authme - Page loaded")

			setTimeout(() => {
				loadSavedCodes()
			}, 100)

			render = true
		}
	}, [])

	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32 ">
					<div className="next mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center w-1/2">
						<h1 className="text-gray-50 text-6xl">Codes</h1>
						<div className="mx-a">
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".txt" />
							<button type="button" className="button" id="input" onClick={openDialog}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								Choose file
							</button>

							<button type="button" className="button hidden" id="save" onClick={saveCodes}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								Save codes
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Codes
