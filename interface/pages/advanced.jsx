import React from "react"
import KeepAlive from "react-activation"
import QrcodeDecoder from "qrcode-decoder"
import { invoke } from "@tauri-apps/api/tauri"

const Advanced = () => {
	const importMenu = () => {
		const imp_div = document.querySelector(".importMenu")
		const exp_div = document.querySelector(".exportMenu")

		imp_div.style.display = "flex"
		exp_div.style.display = "none"
	}

	const exportMenu = () => {
		const imp_div = document.querySelector(".importMenu")
		const exp_div = document.querySelector(".exportMenu")

		imp_div.style.display = "none"
		exp_div.style.display = "flex"
	}

	const openDialog = () => {
		document.getElementById("file").click()
	}

	const loadFile = (file) => {
		file.persist()

		createCodes(file)
	}

	const createCodes = (event) => {
		const FileSaver = require("file-saver")
		const arr = event.target.files
		const names = []
		const secrets = []
		const issuers = []
		const button = document.querySelector(".upload")
		for (let i = 0; i < arr.length; i++) {
			const element = arr[i]
			const image = URL.createObjectURL(element)
			const process_images = async () => {
				const qr = new QrcodeDecoder()
				// decode image
				qr.decodeFromImage(image).then((res) => {
					if (res === false) {
						// no qr code
						return invoke("error", { invokeMessage: "No QR code(s) found on the picture!\n\nPlease try again with another picture!" })
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
							alert("QR code(s) found!")
							setTimeout(() => {
								let str = ""
								for (let j = 0; j < names.length; j++) {
									const substr = `\nName:   ${names[j].trim()} \nSecret: ${secrets[j].trim()} \nIssuer: ${issuers[j].trim()} \nType:   OTP_TOTP\n`
									str += substr
								}
								const blob = new Blob([str], { type: "text/plain;charset=utf-8" })
								FileSaver.saveAs(blob, "authme_lite_import.txt")
							}, 500)
						}
					} else {
						// no qr code
						return invoke("error", { invokeMessage: "No QR code(s) found on the picture!\n\nPlease try again with another picture!" })
					}
				})
			}
			process_images()
		}
	}

	const downloadAlert = () => {
		const FileSaver = require("file-saver")

		const names = JSON.parse(localStorage.getItem("name"))
		const secrets = JSON.parse(localStorage.getItem("secret"))
		const issuers = JSON.parse(localStorage.getItem("issuer"))

		if (names === null) {
			return invoke("error", { invokeMessage: "No save file found!\n\nGo back to the codes page and save your codes!" })
		}

		console.log(names)

		let str = ""
		for (let i = 0; i < names.length; i++) {
			const substr = `\nName:   ${names[i].trim()} \nSecret: ${secrets[i].trim()} \nIssuer: ${issuers[i].trim()} \nType:   OTP_TOTP\n`
			str += substr
		}
		const blob = new Blob([str], { type: "text/plain;charset=utf-8" })
		FileSaver.saveAs(blob, "authme_lite_export.txt")
	}

	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center w-1/2">
						<h1 className="text-gray-50 text-6xl mb-10">Advanced</h1>
						<div className="flex justify-center items-center flex-row gap-3">
							<button className="button" onClick={importMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
								</svg>
								Import
							</button>
							<button className="button" onClick={exportMenu}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Export
							</button>
						</div>

						<div className="importMenu mt-3 flex flex-col justify-center items-center">
							<h2 className="text-4xl mt-5">Import</h2>
							<h3 className="text-2xl mt-1">You can import from QR code(s) here.</h3>
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".jpg, .jpeg, .png, .bmp" multiple />
							<button type="button" className="button m-5" id="input" onClick={openDialog}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
								</svg>
								Import
							</button>
						</div>

						<div className="exportMenu mt-3 hidden flex-col justify-center items-center">
							<h2 className="text-4xl mt-5">Export</h2>
							<h3 className="text-2xl mt-1">You can export your QR code(s) if you saved them.</h3>
							<button className="button m-5" onClick={downloadAlert}>
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
