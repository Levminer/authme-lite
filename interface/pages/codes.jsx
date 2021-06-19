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
				<div class="grid" id="grid${counter}">
				<div class="div1 flex flex-col justify-center">
				<h3 class="header">Name</h3>
				<p class="texts" id="name${counter}">Name</p>
				</div>
				<div class="div2 flex flex-col justify-center">
				<h3 class="header mx-auto">Code</h3>
				<input type="text" class="input" id="code${counter}" readonly/>
				</div>
				<div class="div3 flex flex-col justify-center">
				<h3 class="header">Time</h3>
				<p class="texts" id="time${counter}">Time</p>
				</div>
				<div class="div4">
				<button class="button text-center" id="copy${counter}">Copy</button>
				</div>
				</div>
				`

				// set div in html
				document.querySelector(".next").appendChild(element)

				// elements
				const name = document.querySelector(`#name${counter}`)
				const code = document.querySelector(`#code${counter}`)
				const time = document.querySelector(`#time${counter}`)
				const text = document.querySelector(`#text${counter}`)
				const copy = document.querySelector(`#copy${counter}`)

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

					// settting elements
					try {
						text.textContent = names[i]
					} catch (error) {
						console.warn(`Authme - Setting names - ${error}`)
					}

					name.textContent = issuer[i]
					code.value = token
					time.textContent = remaining
				}, 100)

				// interval1
				const int1 = setInterval(() => {
					// generate token
					const token = speakeasy.totp({
						secret: secret[i],
						encoding: "base32",
					})

					// time
					const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

					// settting elements
					name.textContent = issuer[i]
					code.value = token
					time.textContent = remaining

					clearInterval(int0)
				}, 500)

				// copy
				const el = copy.addEventListener("click", () => {
					code.select()
					code.setSelectionRange(0, 9999)
					document.execCommand("copy")
					copy.textContent = "Copied"

					window.getSelection().removeAllRanges()

					setTimeout(() => {
						copy.textContent = "Copy"

						setTimeout(() => {
							if (copy_state === true) {
								for (let i = 0; i < names.length; i++) {
									const div = document.querySelector(`#grid${[i]}`)
									div.style.display = "grid"
								}
							}

							document.querySelector("#search").value = ""
						}, 1200)

						document.getElementById("search").focus()
					}, 1000)
				})

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
				<div className="conatiner flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 p-32 rounded-3xl flex flex-col justify-center items-center">
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

						<div className="next"></div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Codes
