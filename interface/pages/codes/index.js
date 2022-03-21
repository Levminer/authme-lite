import speakeasy from "@levminer/speakeasy"
import { invoke } from "@tauri-apps/api/tauri"
import { convert } from "../../../libraries/convert"
import bcrypt from "bcryptjs"
import SimpleCrypto from "simple-crypto-js"

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
 * @param {import("react").SyntheticEvent} event
 */
export const loadFile = (event) => {
	// handle for react
	event.persist()

	// check if file reader supported
	if (window.FileReader) {
		const reader = new FileReader()

		// file reader error
		reader.onerror = () => {
			if (event.target.error.name == "NotReadableError") {
				console.warn("Failed to upload the file! You uploaded a corrupted or not supported file")
			}
		}

		// file reader successful
		reader.onload = (file) => {
			const loaded = JSON.parse(file.target.result)
			const processed = convert(Buffer.from(loaded.codes, "base64").toString())

			sessionStorage.setItem("text", loaded.codes)

			createElements(processed)
		}

		reader.readAsText(event.target.files[0])
	} else {
		console.warn("Authme - Can't upload file")
	}
}

/**
 * Create code blocks
 * @param {LibImportFile} processed
 */
const createElements = (processed) => {
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = JSON.parse(localStorage.getItem("storage"))

	let names_state = false

	if (storage !== null) {
		names_state = storage.settings.names
	}

	const names = processed.names
	const secrets = processed.secrets
	const issuers = processed.issuers

	sessionStorage.setItem("names", JSON.stringify(names))
	sessionStorage.setItem("secrets", JSON.stringify(secrets))
	sessionStorage.setItem("issuers", JSON.stringify(issuers))

	document.querySelector("#block0").style.display = "none"
	document.querySelector("#input").style.display = "none"

	const generate = () => {
		for (let i = 0; i < names.length; i++) {
			// create div
			const element = document.createElement("div")

			// set div elements
			if (names_state === false) {
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
			} else {
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
				<div class="flex flex-col flex-1 justify-center items-center lg:mr-20 lg:ml-20 md:mr-5 md:ml-5">
				<h2 id="names${i}" tabindex="0" class="text-2xl font-normal text-center w-full relative -top-10 mb-4 py-2 px-5 rounded-2xl bg-gray-600 select-all"></h2>
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
			}

			// set div in html
			element.classList.add("codes-container")
			element.setAttribute("id", `container${i}`)
			document.querySelector(".next").appendChild(element)

			// names
			if (names_state === true) {
				const names_text = document.querySelector(`#names${i}`)
				names_text.textContent = names[i]
			}

			// elements
			const name = document.querySelector(`#name${i}`)
			const code = document.querySelector(`#code${i}`)
			const time = document.querySelector(`#time${i}`)
			const copy = document.querySelector(`#copy${i}`)
			const progress = document.querySelector(`#progress${i}`)

			// add to search query
			query.push(issuers[i].toLowerCase())

			// copy code
			copy.addEventListener("click", () => {
				navigator.clipboard.writeText(code.textContent)

				copy.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Copied`

				setTimeout(() => {
					copy.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Copy`
				}, 800)
			})

			// generate token
			const token = speakeasy.totp({
				secret: secrets[i],
				encoding: "base32",
			})

			// remaining time
			const remaining_time = 30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30)

			// set content
			name.textContent = issuers[i]
			code.textContent = token
			time.textContent = remaining_time

			// refresh codes
			setInterval(() => {
				// generate token
				const token = speakeasy.totp({
					secret: secrets[i],
					encoding: "base32",
				})

				// remaining time
				const remaining_time = 30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30)

				// set content
				name.textContent = issuers[i]
				code.textContent = token
				time.textContent = remaining_time

				// progress bar
				const value = remaining_time * (100 / 30)
				progress.style.width = `${value}%`
			}, 500)
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
export const saveCodes = async () => {
	const response = await invoke("password_encryption")
	document.querySelector("#block2").style.display = "none"

	if (response === "true") {
		document.querySelector("#block3").style.display = "flex"
	} else {
		/**
		 * LocalStorage Storage
		 * @type{LibStorage}
		 */
		const storage = {
			password: null,
			require_password: false,
			hash: null,
			settings: {
				names: false,
			},
		}

		localStorage.setItem("storage", JSON.stringify(storage))

		const names = JSON.parse(sessionStorage.getItem("names"))
		const secrets = JSON.parse(sessionStorage.getItem("secrets"))
		const issuers = JSON.parse(sessionStorage.getItem("issuers"))

		localStorage.setItem("names", JSON.stringify(names))
		localStorage.setItem("secrets", JSON.stringify(secrets))
		localStorage.setItem("issuers", JSON.stringify(issuers))

		const message = "Codes saved!\n\nThe save is currently only kept until you update the app!\n\nKeep a copy of the import file!"
		invoke("warning", { invokeMessage: message })
	}
}

/**
 * Load saved codes
 */
export const loadSavedCodes = () => {
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = JSON.parse(localStorage.getItem("storage"))

	if (storage.require_password === false) {
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
}

export const loadEncryptedSavedCodes = async () => {
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = JSON.parse(localStorage.getItem("storage"))

	const text = document.querySelector("#text2")
	const password_input = Buffer.from(document.querySelector("#password_input2").value)

	const compare = await bcrypt.compare(password_input.toString(), storage.password)

	if (compare === true) {
		text.style.color = "#28A443"
		text.textContent = "Passwords match! Please wait!"

		const aes = new SimpleCrypto(password_input)

		const decrypted = aes.decrypt(storage.hash)

		const processed = convert(Buffer.from(decrypted, "base64").toString())

		setTimeout(() => {
			console.log(processed)

			createElements(processed)

			document.querySelector("#block2").style.display = "none"
			document.querySelector("#block4").style.display = "none"
		}, 300)
	} else {
		text.style.color = "#A30015"
		text.textContent = "Passwords don't match! Try again!"
	}
}

/**
 * Search function
 */
export const search = () => {
	const search = document.querySelector("#search")
	const input = search.value.toLowerCase()
	let no_results = 0
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
 * Go to Tools tab
 */
export const createFile = () => {
	location.replace("/tools")
}

export const createPassword = () => {
	const text = document.querySelector("#text")
	const password_input0 = Buffer.from(document.querySelector("#password_input0").value)
	const password_input1 = Buffer.from(document.querySelector("#password_input1").value)
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = {}

	const encryptCodes = () => {
		const text = sessionStorage.getItem("text")

		const aes = new SimpleCrypto(password_input0.toString())
		const encrypted = aes.encrypt(text)

		storage.hash = encrypted

		localStorage.setItem("storage", JSON.stringify(storage))
		sessionStorage.clear()

		password_input0.fill(0)
		password_input1.fill(0)

		document.querySelector("#block3").style.display = ""
	}

	const hashPasswords = async () => {
		const salt = await bcrypt.genSalt(10)

		const hashed = await bcrypt.hash(password_input0.toString(), salt)

		storage.password = hashed
		storage.require_password = true
		storage.settings = { names: false }

		localStorage.setItem("storage", JSON.stringify(storage))

		encryptCodes()
	}

	if (password_input0.toString().length > 64) {
		text.style.color = "#A30015"
		text.textContent = "Maximum password length is 64 characters!"
	} else if (password_input0.toString().length < 8) {
		text.style.color = "#A30015"
		text.textContent = "Minimum password length is 8 characters!"
	} else {
		if (password_input0.toString() == password_input1.toString()) {
			console.warn("Authme - Passwords match!")

			text.style.color = "#28A443"
			text.textContent = "Passwords match! Please wait!"

			hashPasswords()
		} else {
			console.warn("Authme - Passwords dont match!")

			text.style.color = "#A30015"
			text.textContent = "Passwords don't match! Try again!"
		}
	}
}
