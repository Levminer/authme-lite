import React from "react"
import ReactDOM from "react-dom"
import { window } from "@tauri-apps/api"
import { version } from "../package.json"

import "./styles/index.css"

import Router from "./router.js"

const wm = new window.WindowManager()

if (process.env.NODE_ENV === "production") {
	wm.maximize()
}

wm.setTitle(`Authme (${version})`)

ReactDOM.render(<Router />, document.getElementById("root"))

document.addEventListener("keydown", (event) => {
	if (event.altKey && event.code === "F4") {
		event.preventDefault()
	}
})
