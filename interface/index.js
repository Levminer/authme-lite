import React from "react"
import ReactDOM from "react-dom"
import { window, os } from "@tauri-apps/api"
import { version } from "../package.json"

import "./styles/index.css"

import Router from "./router.js"

// @ts-ignore
const mainWindow = new window.WindowManager()

if (process.env.NODE_ENV === "production") {
	mainWindow.maximize()
}

const background = async () => {
	const system = await os.type()
	const build = await os.version()

	if (system === "Windows_NT" || system === "Darwin") {
		if (build < "10.0.22000") {
			document.querySelector("body").style.background = "black"
		}

		console.log("k")
	} else {
		document.querySelector("body").style.background = "black"
	}
}

background()

mainWindow.setTitle(`Authme Lite (${version})`)

ReactDOM.render(<Router />, document.getElementById("root"))

document.addEventListener("keydown", (event) => {
	if (event.altKey && event.code === "F4") {
		event.preventDefault()
	}
})
