import React from "react"
import KeepAlive from "react-activation"

import Appbar from "../components/appbar.jsx"

const Advanced = () => {
	return (
		<>
			<KeepAlive>
				<div className="conatiner flex flex-col justify-center items-center mb-32">
					<div className="mt-52 bg-gray-700 p-32 rounded-3xl flex flex-col justify-center items-center">
						<h1 className="text-gray-50 text-6xl">Advanced</h1>
						<div className="flex justify-center items-center flex-col">
							<h1 className="text-4xl">Coming soon...</h1>
						</div>
					</div>
				</div>
			</KeepAlive>
		</>
	)
}

export default Advanced
