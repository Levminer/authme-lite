import QrcodeDecoder from "qrcode-decoder"
import { invoke } from "@tauri-apps/api/tauri"
import FileSaver from "file-saver"

/**
 * Globals
 */
let menu_state = "import"

/**
 * Switch menu state
 */
export const switchMenu = () => {
	if (menu_state === "import") {
		const imp_div = document.querySelector(".importMenu")
		const exp_div = document.querySelector(".exportMenu")
		const exp_but = document.querySelector(".exportButton")
		const imp_but = document.querySelector(".importButton")

		imp_div.style.display = "none"
		exp_div.style.display = "flex"
		exp_but.disabled = true
		imp_but.disabled = false

		menu_state = "export"
	} else {
		const imp_div = document.querySelector(".importMenu")
		const exp_div = document.querySelector(".exportMenu")
		const exp_but = document.querySelector(".exportButton")
		const imp_but = document.querySelector(".importButton")

		imp_div.style.display = "flex"
		exp_div.style.display = "none"
		exp_but.disabled = false
		imp_but.disabled = true

		menu_state = "import"
	}
}

/**
 * Open choose file dialog
 */
export const openImportCodes = () => {
	document.getElementById("file").click()
}

/**
 * Convert images to strings
 * @param {import("react").SyntheticEvent} event
 */
export const importCodes = (event) => {
	event.persist()

	const arr = event.target.files
	const names = []
	const secrets = []
	const issuers = []

	for (let i = 0; i < arr.length; i++) {
		const element = arr[i]
		const image = URL.createObjectURL(element)

		const processImages = async () => {
			const qr = new QrcodeDecoder()

			// decode image
			qr.decodeFromImage(image).then((res) => {
				if (res === false) {
					// no qr code found
					return invoke("error", { invokeMessage: "No QR code found on the picture!\n\nPlease try again with another picture!" })
				} else if (res.data.startsWith("otpauth://totp/")) {
					// construct
					let url = res.data.replaceAll(/\s/g, "")
					url = url.slice(15)

					// get name
					const name_index = url.match(/[?]/)
					const name = url.slice(0, name_index.index)
					url = url.slice(name.length + 1)

					// get secret
					const secret_index = url.match(/[&]/)
					const secret = url.slice(7, secret_index.index)
					url = url.slice(secret.length + 14 + 1)

					// get issuer
					const issuer = url
					names.push(name)
					secrets.push(secret)
					issuers.push(issuer)

					if (arr.length === i + 1) {
						invoke("info", { invokeMessage: "QR code(s) found!" })

						setTimeout(() => {
							let str = ""

							for (let j = 0; j < names.length; j++) {
								const substr = `\nName:   ${names[j].trim()} \nSecret: ${secrets[j].trim()} \nIssuer: ${issuers[j].trim()} \nType:   OTP_TOTP\n`
								str += substr
							}

							/**
							 * .authme import file
							 * @type {LibAuthmeFile}
							 */
							const save_file = {
								role: "import",
								encrypted: false,
								codes: Buffer.from(str).toString("base64"),
								date: new Date().toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19),
								version: 3,
							}

							const blob = new Blob([JSON.stringify(save_file, null, "\t")], { type: "text/plain;charset=utf-8" })
							FileSaver.saveAs(blob, "authme_lite_import.authme")
						}, 500)
					}
				} else {
					// no qr code found
					return invoke("error", { invokeMessage: "Wrong QR code found on the picture!\n\nPlease try again with another picture!" })
				}
			})
		}

		processImages()
	}
}

/**
 * Export saved codes
 */
export const exportCodes = () => {
	const names = JSON.parse(localStorage.getItem("names"))
	const secrets = JSON.parse(localStorage.getItem("secrets"))
	const issuers = JSON.parse(localStorage.getItem("issuers"))

	console.log(names)

	if (names === null) {
		return invoke("error", { invokeMessage: "No save file found!\n\nGo back to the codes page and save your codes!" })
	}

	let str = ""

	for (let i = 0; i < names.length; i++) {
		const substr = `\nName:   ${names[i].trim()} \nSecret: ${secrets[i].trim()} \nIssuer: ${issuers[i].trim()} \nType:   OTP_TOTP\n`
		str += substr
	}

	/**
	 * .authme import file
	 * @type {LibAuthmeFile}
	 */
	const save_file = {
		role: "import",
		encrypted: false,
		codes: Buffer.from(str).toString("base64"),
		date: new Date().toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19),
		version: 3,
	}

	const blob = new Blob([JSON.stringify(save_file, null, "\t")])
	FileSaver.saveAs(blob, "authme_lite_export.authme")
}
