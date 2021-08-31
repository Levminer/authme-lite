import React, { useEffect } from "react"
import KeepAlive from "react-activation"

let render = false

let names = []
let secret = []
let issuer = []
let data = []
let save_text
const type = []
let save = false

const Codes = () => {
	const speakeasy = require("@levminer/speakeasy")

	const openDialog = () => {
		document.getElementById("file").click()
	}

	const loadFile = (file) => {
		file.persist()

		handlefiles(file.target.files)
	}

	const handlefiles = (files) => {
		// read file
		if (window.FileReader) {
			getastext(files[0])
			console.warn("Authme - File uploaded successfully")
		} else {
			console.warn("Authme - Can't upload file")
		}
	}

	const getastext = (fileToRead) => {
		const reader = new FileReader()
		reader.onload = loadhandler
		reader.onerror = errorhandler
		reader.readAsText(fileToRead)
	}

	const loadhandler = (event) => {
		const text = event.target.result
		save_text = text
		processdata(text)
	}

	const errorhandler = (evt) => {
		if (evt.target.error.name == "NotReadableError") {
			console.warn("Failed to upload the file! You uploaded a corrupted or not supported file")
		}
	}

	const processdata = (text) => {
		// remove double qoutes
		const pre_data1 = text.replace(/"/g, "")

		// new line
		const pre_data2 = pre_data1.replace(/,/g, "\n")

		// make the array
		const pre_data3 = pre_data2.split(/\n/)
		while (pre_data3.length) {
			data.push(pre_data3.shift())
		}

		// remove first blank
		data.splice(0, 1)

		data = data.filter((_, i) => {
			return (i + 1) % 5
		})

		separation()
	}

	const separation = () => {
		let c0 = 0
		let c1 = 1
		let c2 = 2
		let c3 = 3

		for (let i = 0; i < data.length; i++) {
			if (i == c0) {
				const names_before = data[i]
				const names_after = names_before.slice(8)
				names.push(names_after.trim())
				c0 = c0 + 4
			}

			if (i == c1) {
				const secret_before = data[i]
				const secret_after = secret_before.slice(8)
				secret.push(secret_after.trim())
				c1 = c1 + 4
			}

			if (i == c2) {
				const issuer_before = data[i]
				const issuer_after = issuer_before.slice(8)
				issuer.push(issuer_after.trim())
				c2 = c2 + 4
			}

			if (i == c3) {
				type.push(data[i].trim())
				c3 = c3 + 4
			}
		}

		go()
	}

	const go = () => {
		document.querySelector("#input").style.display = "none"

		const generate = () => {
			// counter
			let counter = 0

			for (let i = 0; i < names.length; i++) {
				// create div
				const element = document.createElement("div")

				// set div elements
				element.innerHTML = `
							<div class="flex md:flex-col lg:flex-row flex-row mt-8 mb-14">
							<div class=" flex flex-col flex-1 justify-center items-center lg:ml-10">
							<h1 class="text-3xl font-bold">Name</h1>
							<h2 id="name${i}" class="text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all"></h2>
							</div>
							<div class=" flex flex-col flex-1 justify-center items-center">
							<h1 class="text-3xl font-bold md:mt-3">Time</h1>
							<h2 id="time${i}" class="w-20 text-center text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600"></h2>
							</div>
							<div class=" flex flex-col flex-1 justify-center items-center lg:mr-10">
							<h1 class="text-3xl font-bold md:mt-3">Code</h1>
							<h2 id="code${i}" class="text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all"></h2>
							</div>
							</div>
							<div class="flex flex-col justify-center items-center">
							<div class="progress">
							<div id="progress${i}" class="progress__fill"></div>
							<span class="progress__text">0%</span>
							</div>
							<button id="copy${i}" class="buttoni">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
							Copy
							</button>
							</div>
				
				`

				// set div in html
				element.classList.add("ctdiv")
				document.querySelector(".next").appendChild(element)

				// elements
				const name_text = document.querySelector(`#name${i}`)
				const code_text = document.querySelector(`#code${i}`)
				const time_text = document.querySelector(`#time${i}`)
				const copy_button = document.querySelector(`#copy${i}`)
				const progress_bar = document.querySelector(`#progress${i}`)

				// copy code
				copy_button.addEventListener("click", () => {
					navigator.clipboard.writeText(code_text.textContent)

					copy_button.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
					</svg>
					Copied`

					setTimeout(() => {
						copy_button.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						Copy`
					}, 800)
				})

				// add to query
				const item = issuer[i].toLowerCase().trim()

				/* 				querry.push(item) */

				// interval0
				const int0 = setInterval(() => {
					// generate token
					const token = speakeasy.totp({
						secret: secret[i],
						encoding: "base32",
					})

					// time
					const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

					name_text.textContent = issuer[i]
					code_text.textContent = token
					time_text.textContent = remaining
				}, 100)

				// interval1
				const int1 = setInterval(() => {
					// generate token
					const token = speakeasy.totp({
						secret: secret[i],
						encoding: "base32",
					})

					// time
					const remaining_time = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

					// settting elements
					name_text.textContent = issuer[i]
					code_text.textContent = token
					time_text.textContent = remaining_time

					// progress bar
					const value = remaining_time * (100 / 30)
					progress_bar.style.width = `${value}%`

					clearInterval(int0)
				}, 500)

				// add one to counter
				counter++
			}
		}

		generate()

		if (save === false) {
			document.querySelector("#save").style.display = "block"
		}
	}

	const loaded_names = JSON.parse(localStorage.getItem("name"))
	const loaded_secret = JSON.parse(localStorage.getItem("secret"))
	const loaded_issuer = JSON.parse(localStorage.getItem("issuer"))

	useEffect(() => {
		if (render === false) {
			console.log("Authme - Page loaded")

			setTimeout(() => {
				loadSavedCodes()
			}, 100)

			render = true
		}
	}, [])

	const saveCodes = () => {
		localStorage.setItem("name", JSON.stringify(names))
		localStorage.setItem("secret", JSON.stringify(secret))
		localStorage.setItem("issuer", JSON.stringify(issuer))

		document.querySelector("#save").style.display = "none"
	}

	const loadSavedCodes = () => {
		if (loaded_names !== undefined && loaded_names !== null) {
			console.log("Authme - Save found")

			names = loaded_names
			secret = loaded_secret
			issuer = loaded_issuer

			save = true

			go()
		} else {
			console.warn("Authme - No save found")
		}
	}

	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32 ">
					<div className="next mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center w-1/2">
						<h1 className="text-gray-50 text-6xl">Codes</h1>
						<div className="mx-a">
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".txt" />
							<button type="button" className="button m-5" id="input" onClick={openDialog}>
								Choose a file
							</button>

							<button type="button" className="button m-5 hidden" id="save" onClick={saveCodes}>
								Save codes
							</button>
						</div>

						{/* test */}
						<div className="hidden container w-2/3 bg-gray-800 mt-10 mb-10 rounded-2xl">
							<div className="flex flex-row mt-8 mb-14">
								<div className=" flex flex-col flex-1 justify-center items-center ml-10">
									<h1 className="text-3xl font-bold">Name</h1>
									<h2 id="name" className="text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all">
										Google
									</h2>
								</div>
								<div className=" flex flex-col flex-1 justify-center items-center">
									<h1 className="text-3xl font-bold">Time</h1>
									<h2 id="time" className="w-20 text-center text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600">
										15
									</h2>
								</div>
								<div className=" flex flex-col flex-1 justify-center items-center mr-10">
									<h1 className="text-3xl font-bold">Code</h1>
									<h2 id="code" className="text-2xl mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all">
										123456
									</h2>
								</div>
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className="progress">
									<div className="progress__fill"></div>
									<span className="progress__text">0%</span>
								</div>
								<button className="w-40 flex flex-row mb-6 py-3 px-10 font-medium text-xl bg-white text-black rounded-2xl border-2 hover:bg-transparent hover:text-white duration-200 ease-in transform">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
									</svg>
									Copy
								</button>
							</div>
						</div>
						{/* end */}
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Codes
