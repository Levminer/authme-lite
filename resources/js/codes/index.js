import speakeasy from "@levminer/speakeasy"
import { invoke } from "@tauri-apps/api/tauri"
import { convert } from "../../../libraries/convert"

/**
 * Globals
 */
let save = false
const query = []

/**
 * Open load dialog
 */
export const openDialog = () => {
	document.getElementById("file").click()
}

/**
 * Load file from disk
 * @param {Object} file
 */
export const loadFile = (file) => {
	file.persist()

	handleFiles(file.target.files)
}

/**
 * Handle uploaded file
 * @param {Array} files
 */
const handleFiles = (files) => {
	if (window.FileReader) {
		convertToText(files[0])
		console.warn("Authme - File uploaded successfully")
	} else {
		console.warn("Authme - Can't upload file")
	}
}

/**
 * Convert to text
 * @param {String} file
 */
const convertToText = (file) => {
	const reader = new FileReader()
	reader.onload = loadHandler
	reader.onerror = errorHandler
	reader.readAsText(file)
}

/**
 * Handle converted text
 * @param {Object} event
 */
const loadHandler = (event) => {
	const text = event.target.result

	const processed = convert(text)

	createElements(processed)
}

/**
 * Error loading file
 * @param {Object} event
 */
const errorHandler = (event) => {
	if (event.target.error.name == "NotReadableError") {
		console.warn("Failed to upload the file! You uploaded a corrupted or not supported file")
	}
}

/**
 * Create code blocks
 * @param {LibImportFile} processed
 */
const createElements = (processed) => {
	const names = processed.names
	const secrets = processed.secrets
	const issuers = processed.issuers

	sessionStorage.setItem("names", JSON.stringify(names))
	sessionStorage.setItem("secrets", JSON.stringify(secrets))
	sessionStorage.setItem("issuers", JSON.stringify(issuers))

	document.querySelector("#block0").style.display = "none"
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
                        <div class="flex flex-col flex-1 justify-center items-center lg:ml-10">
                        <h1 class="text-3xl font-bold md:mt-3">Name</h1>
                        <h2 id="name${i}" tabindex="0" class="text-2xl font-normal mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all"></h2>
                        </div>
                        <div class="flex flex-col flex-1 justify-center items-center">
                        <h1 class="text-3xl font-bold md:mt-3">Time</h1>
                        <h2 id="time${i}" class="w-20 text-center text-2xl font-normal mt-3 py-2 px-3 rounded-2xl bg-gray-600"></h2>
                        </div>
                        <div class="flex flex-col flex-1 justify-center items-center lg:mr-10">
                        <h1 class="text-3xl font-bold md:mt-3">Code</h1>
                        <h2 id="code${i}" tabindex="0" class="text-2xl font-normal mt-3 py-2 px-3 rounded-2xl bg-gray-600 select-all"></h2>
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
			element.setAttribute("id", `container${i}`)
			document.querySelector(".next").appendChild(element)

			// elements
			const name_text = document.querySelector(`#name${i}`)
			const code_text = document.querySelector(`#code${i}`)
			const time_text = document.querySelector(`#time${i}`)
			const copy_button = document.querySelector(`#copy${i}`)
			const progress_bar = document.querySelector(`#progress${i}`)

			query.push(issuers[i].toLowerCase())

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

			// interval0
			const int0 = setInterval(() => {
				// generate token
				const token = speakeasy.totp({
					secret: secrets[i],
					encoding: "base32",
				})

				// time
				const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

				name_text.textContent = issuers[i]
				code_text.textContent = token
				time_text.textContent = remaining
			}, 100)

			// interval1
			const int1 = setInterval(() => {
				// generate token
				const token = speakeasy.totp({
					secret: secrets[i],
					encoding: "base32",
				})

				// time
				const remaining_time = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

				// settting elements
				name_text.textContent = issuers[i]
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
		document.querySelector("#block2").style.display = "flex"
	}

	document.querySelector("#search").style.display = "flex"
}

/**
 * Save loaded codes
 */
export const saveCodes = () => {
	const names = JSON.parse(sessionStorage.getItem("names"))
	const secrets = JSON.parse(sessionStorage.getItem("secrets"))
	const issuers = JSON.parse(sessionStorage.getItem("issuers"))

	localStorage.setItem("names", JSON.stringify(names))
	localStorage.setItem("secrets", JSON.stringify(secrets))
	localStorage.setItem("issuers", JSON.stringify(issuers))

	document.querySelector("#block2").style.display = "none"

	const message = "Codes saved!"
	invoke("info", { invokeMessage: message })

	const warning = "The save is currently only kept until you update the app!\n\nKeep a copy of the import file!"
	invoke("warning", { invokeMessage: warning })
}

/**
 * Load saved codes
 */
export const loadSavedCodes = () => {
	const loaded_names = JSON.parse(localStorage.getItem("names"))
	const loaded_secrets = JSON.parse(localStorage.getItem("secrets"))
	const loaded_issuers = JSON.parse(localStorage.getItem("issuers"))

	if (loaded_names != null) {
		console.log("Authme - Save found")

		save = true

		const names = loaded_names
		const secrets = loaded_secrets
		const issuers = loaded_issuers

		/**
		 * Import file structure
		 * @type {LibImportFile} loaded
		 */
		const loaded = {
			names,
			secrets,
			issuers,
		}

		createElements(loaded)
	} else {
		console.warn("Authme - No save found")
	}
}

/**
 * Search function
 */
export const search = () => {
	const search = document.querySelector("#search")
	const input = search.value.toLowerCase()
	let i = 0

	// restart
	for (let i = 0; i < query.length; i++) {
		const div = document.querySelector(`#container${[i]}`)
		div.style.display = ""
	}

	// search algorithm
	query.forEach((element) => {
		if (element.startsWith(input)) {
			console.warn("Authme - Search result found")
		} else {
			const div = document.querySelector(`#container${[i]}`)
			div.style.display = "none"
		}
		i++
	})

	// if search empty
	if (search.value == "") {
		for (let i = 0; i < query.length; i++) {
			const div = document.querySelector(`#container${[i]}`)
			div.style.display = ""
		}
	}
}

/**
 * Go to advanced tab
 */
export const createFile = () => {
	location.replace("/advanced")
}
