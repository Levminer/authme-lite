import React from "react"
import ReactDOM from "react-dom"
import { window } from "@tauri-apps/api"

import "../libraries/tailwind.scss"

import Router from "./router.js"

const wm = new window.WindowManager()

wm.maximize()

ReactDOM.render(<Router />, document.getElementById("root"))
