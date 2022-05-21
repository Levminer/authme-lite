import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AliveScope } from "react-activation"

import Codes from "./pages/codes/codes.jsx"
import Tools from "./pages/tools/tools.jsx"
import Settings from "./pages/settings/settings.jsx"

import AppBar from "./components/appBar.jsx"

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<AppBar />
				<AliveScope>
					<Routes>
						<Route exact path="/" element={<Codes />} />
						<Route exact path="/tools" element={<Tools />} />
						<Route exact path="/settings" element={<Settings />} />
					</Routes>
				</AliveScope>
			</BrowserRouter>
		</>
	)
}

export default Router
