import React from "react"
import ReactDOM from "react-dom"
import { window } from "@tauri-apps/api"

import "../resources/tailwind.scss"

import Router from "./router.js"

const wm = new window.WindowManager()

if (process.env.NODE_ENV === "production") {
	wm.maximize()
}

ReactDOM.render(<Router />, document.getElementById("root"))

document.addEventListener("keydown", (event) => {
	if (event.ctrlKey && event.code === "KeyA" && event.target.type !== "text" && event.target.type !== "number" && event.target.type !== "textarea") {
		event.preventDefault()
	}

	if (event.altKey && event.code === "F4") {
		event.preventDefault()
	}
})
