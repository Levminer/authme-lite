import React from "react"
import { app, os } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/tauri"
import build from "../../../build.json"
import "../../../libraries/typedef"

/**
 * Show an about dialog
 */
export const about = async () => {
	const authme = await app.getVersion()
	const tauri = await app.getTauriVersion()
	const os_type = await os.type()
	const os_arch = await os.arch()
	const os_version = await os.version()

	let hardware = await invoke("os")

	hardware = hardware.split("+")

	const cpu = hardware[0]
		.split("@")[0]
		.replaceAll("(R)", "")
		.replaceAll("(TM)", "")
		.replace(/ +(?= )/g, "")
	const memory = `${Math.round(hardware[1] / 1024 / 1024)}GB`

	const message = `Authme Lite: ${authme} \n\nTauri: ${tauri}\nReact: ${React.version}\n\nOS version: ${os_type} ${os_arch.replace("x86_64", "x64")} ${os_version}\nHardware info: ${cpu}${memory} RAM\n\nRelease date: ${build.date}\nBuild number: ${build.number}\n\nCreated by: Lőrik Levente`

	invoke("info", { invokeMessage: message })
}

/**
 * Show a clear data dialog
 */
export const clearData = async () => {
	const message = await invoke("clear_data")

	if (message === "true") {
		sessionStorage.clear()
		localStorage.clear()
		location.reload()
		location.replace("/")
	}
}

/**
 * Displays the version info on the page
 */
export const version = async () => {
	const authme = await app.getVersion()

	if (build.number.startsWith("alpha")) {
		document.querySelector(".ver").textContent = `${authme} (${build.number})`
	} else {
		document.querySelector(".ver").textContent = `${authme} (${build.date})`
	}
}

let names_state
/**
 * Settings for 2FA names
 */
export const names = () => {
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = JSON.parse(localStorage.getItem("storage"))

	const tgl0 = document.querySelector("#tgl0")
	const tgt0 = document.querySelector("#tgt0")

	if (storage === null) {
		tgl0.checked = false
		tgt0.textContent = "Off"
		names_state = false
		return console.warn("Codes not saved yet")
	} else if (storage.settings.names === true) {
		names_state = true

		tgl0.checked = true
		tgt0.textContent = "On"
	} else if (storage.settings.names === false) {
		names_state = false

		tgl0.checked = false
		tgt0.textContent = "Off"
	}
}

export const changeNames = () => {
	/**
	 * LocalStorage Storage
	 * @type{LibStorage}
	 */
	const storage = JSON.parse(localStorage.getItem("storage"))

	const tgl0 = document.querySelector("#tgl0")
	const tgt0 = document.querySelector("#tgt0")

	if (storage === null) {
		tgl0.checked = false
		tgt0.textContent = "Off"
		names_state = false
		return console.warn("Codes not saved yet")
	}

	if (names_state === false) {
		tgl0.checked = true
		tgt0.textContent = "On"

		names_state = true

		storage.settings.names = true

		localStorage.setItem("storage", JSON.stringify(storage))
	} else {
		tgl0.checked = false
		tgt0.textContent = "Off"

		names_state = false

		storage.settings.names = false

		localStorage.setItem("storage", JSON.stringify(storage))
	}

	location.reload()
}
