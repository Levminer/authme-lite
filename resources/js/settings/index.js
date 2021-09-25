import React from "react"
import { app, os } from "@tauri-apps/api"
import { invoke } from "@tauri-apps/api/tauri"
import { number, date } from "../../../build.json"

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

	const message = `Authme Lite: ${authme} \n\nTauri: ${tauri}\nReact: ${React.version}\n\nOS version: ${os_type} ${os_arch.replace("x86_64", "x64")} ${os_version}\nHardware info: ${cpu}${memory} RAM\n\nRelease date: ${date}\nBuild number: ${number}\n\nCreated by: Lőrik Levente`

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

	if (number.startsWith("alpha")) {
		document.querySelector(".ver").textContent = `${authme} (${number})`
	} else {
		document.querySelector(".ver").textContent = `${authme} (${date})`
	}
}
