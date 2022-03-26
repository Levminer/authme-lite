import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Codes from "./pages/codes/codes.jsx"
import Tools from "./pages/tools/tools.jsx"
import Settings from "./pages/settings/settings.jsx"

import AppBar from "./components/appBar.jsx"

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<AppBar />
				<Routes>
					<Route exact path="/" element={<Codes />} />
					<Route exact path="/tools" element={<Tools />} />
					<Route exact path="/settings" element={<Settings />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Router
