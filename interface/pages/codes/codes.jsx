import React, { useEffect } from "react"
import KeepAlive from "react-activation"
import { loadSavedCodes, saveCodes, loadFile, openDialog, createFile, search, createPassword, loadEncryptedSavedCodes } from "."

let render = false

const Codes = () => {
	useEffect(() => {
		if (render === false) {
			console.log("Authme - Page loaded")

			setTimeout(() => {
				/**
				 * LocalStorage Storage
				 * @type{LibStorage}
				 */
				const storage = JSON.parse(localStorage.getItem("storage"))

				try {
					if (storage.require_password === true) {
						document.querySelector("#block4").style.display = "flex"
						document.querySelector("#block0").style.display = "none"
					} else {
						loadSavedCodes()
					}
				} catch (error) {
					console.warn("FIRST START!")
				}
			}, 100)

			render = true
		}
	}, [])

	return (
		<>
			<KeepAlive>
				<div className="mb-32 flex flex-col items-center justify-center ">
					<div className="next mt-40 flex w-1/2 flex-col items-center justify-center rounded-3xl bg-gray-700 pt-16 pb-16">
						<h1 className="text-gray-50">Codes</h1>
						<div className="mx-a flex w-full flex-col justify-center">
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".authme" />

							<div className="block-container" id="block0">
								<h3 className="mt-3 mb-3">Please choose your import file!</h3>
								<h4>If you don't have an import file please create one!</h4>

								<div className="mt-3 flex flex-row space-x-5">
									<button type="button" className="button" id="input" onClick={openDialog}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
										</svg>
										Choose file
									</button>

									<button type="button" className="button" id="input" onClick={createFile}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										Create file
									</button>
								</div>
							</div>

							<div className="flex justify-center" id="block1">
								<input type="text" spellCheck="false" id="search" className="input mt-10 hidden w-2/5" onKeyUp={search} onKeyDown={search} placeholder="Search for names..." />
							</div>

							<div className="block-container hidden justify-center" id="block2">
								<h3 className="mt-3 mb-3">Save codes</h3>
								<h4>Save your code(s) to your computer for future use.</h4>
								<button type="button" className="button" id="save" onClick={saveCodes}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Save codes
								</button>
							</div>

							<div className="block-container hidden justify-center" id="block3">
								<h3 className="mt-3 mb-3">Create password</h3>
								<h4 id="text">Create a password to save and encrypt your codes!</h4>
								<h5 className="-mb-10 mt-5">Password</h5>
								<input type="password" spellCheck="false" id="password_input0" className="input mt-10 w-3/5" />
								<h5 className="-mb-10">Confirm password</h5>
								<input type="password" spellCheck="false" id="password_input1" className="input mt-10 w-3/5" />
								<button type="button" className="button" id="save" onClick={createPassword}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
									</svg>
									Confirm
								</button>
							</div>

							<div className="block-container hidden justify-center" id="block4">
								<h3 className="mt-3 mb-3">Confirm password</h3>
								<h4 id="text2">Please type in a password to continue!</h4>
								<h5 className="-mb-10 mt-5">Password</h5>
								<input type="password" spellCheck="false" id="password_input2" className="input mt-10 w-3/5" />
								<button type="button" className="button" id="save" onClick={loadEncryptedSavedCodes}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
									</svg>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Codes
