import React from "react"
import KeepAlive from "react-activation"
import QrcodeDecoder from "qrcode-decoder"

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
		console.log(event)

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
						alert("No QR code(s) found!")
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
									const substr = `\nName:   ${names[j].trim()} \nSecret: ${secrets[j].trim()} \nIssuer: ${issuers[
										j
									].trim()} \nType:   OTP_TOTP\n`
									str += substr
								}
								const blob = new Blob([str], { type: "text/plain;charset=utf-8" })
								FileSaver.saveAs(blob, "authme_lite_import.txt")
							}, 500)
						}
					} else {
						// no qr code
						alert("No QR code(s) found!")
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
					<div className="mt-52 bg-gray-700 pt-16 pb-16 rounded-3xl flex flex-col justify-center items-center box">
						<h1 className="text-gray-50 text-6xl">Advanced</h1>
						<div className="flex justify-center items-center flex-row gap-3">
							<button className="button" onClick={importMenu}>
								Import
							</button>
							<button className="button" onClick={exportMenu}>
								Export
							</button>
						</div>
						<div className="importMenu mt-3 flex flex-col justify-center items-center">
							<h2 className="text-4xl mt-5">Import</h2>
							<h3 className="text-2xl mt-1">You can import from QR code(s) here.</h3>
							<input type="file" className="hidden" id="file" onChange={loadFile} accept=".jpg, .jpeg, .png, .bmp" multiple />
							<button type="button" className="button m-5" id="input" onClick={openDialog}>
								Import QR code(s)
							</button>
						</div>

						<div className="exportMenu mt-3 hidden flex-col justify-center items-center">
							<h2 className="text-4xl mt-5">Export</h2>
							<h3 className="text-2xl mt-1">You can export your QR code(s) if you saved them.</h3>
							<button className="button m-5" onClick={downloadAlert}>
								Export QR code(s)
							</button>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Advanced
