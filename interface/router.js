import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AliveScope from "react-activation"

import Codes from "./pages/codes.jsx"
import Advanced from "./pages/advanced.jsx"
import Settings from "./pages/settings.jsx"

import Appbar from "./components/appbar.jsx"

const Router = () => {
	return (
		<>
			<AliveScope>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Codes} />
						<Route exact path="/advanced" component={Advanced} />
						<Route exact path="/settings" component={Settings} />
					</Switch>
				</BrowserRouter>
			</AliveScope>
		</>
	)
}

export default Router
