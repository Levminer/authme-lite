import React, { useEffect } from "react"
import KeepAlive from "react-activation"
import { useNavigate } from "react-router-dom"
import { loadSavedCodes, saveCodes, loadFile, openDialog, search, createPassword, loadEncryptedSavedCodes } from "."

let render = false

const Codes = () => {
	const navigate = useNavigate()

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

	/**
	 * Go to Tools tab
	 */
	const createFile = () => {
		navigate("/tools")
	}

	return (
		<>
			<KeepAlive>
				<div className="mb-32 flex flex-col items-center justify-center ">
					<div className="next mt-40 flex w-1/2 flex-col items-center justify-center rounded-3xl bg-gray-700 pt-16 pb-16">
						<h1 className="text-gray-50">Authme</h1>
						<div className="mx-a flex w-full flex-col justify-center">
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".authme" />

							<div className="block-container mx-auto text-center" id="block0">
								<h3 className="mt-3 mb-3">Import your codes</h3>
								<h4 className="px-3">Create your import file from your 2FA codes, or if you have an import file choose it.</h4>

								<div className="mt-3 flex flex-row space-x-5">
									<button type="button" className="button" id="input" onClick={createFile}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										Create file
									</button>

									<button type="button" className="button" id="input" onClick={openDialog}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
										</svg>
										Choose file
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
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
										<circle cx="12" cy="14" r="2"></circle>
										<polyline points="14 4 14 8 8 8 8 4"></polyline>
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
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Confirm
								</button>
							</div>

							<div className="noResultsFound hidden">
								<div className="mx-auto mb-8 flex w-2/3 flex-col items-center justify-center rounded-2xl bg-gray-800 p-4">
									<h3 className="pt-3">No search results found!</h3>
									<h4 className="searchQuery py-3"></h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Codes
