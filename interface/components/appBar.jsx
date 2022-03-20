import React from "react"
import { Link } from "react-router-dom"
import build from "../../build.json"
import BuildNumber from "./buildNumber.jsx"
import UpdatePopup from "./updatePopup.jsx"

const style = async () => {
	if (build.number.startsWith("alpha")) {
		setTimeout(() => {
			document.querySelector("#header").style.top = "40px"
		}, 100)
	}
}

style()

const AppBar = () => {
	return (
		<>
			<BuildNumber />
			<UpdatePopup />
			<header id="header" className="sticky z-40 bg-gray-900 text-gray-50">
				<div className="lex-shrink-0 container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
					<nav className="flex flex-wrap items-center justify-center gap-5 text-base md:ml-auto md:mr-auto">
						{/* codes tab */}
						<button tabIndex="-1" className="mr-5 flex cursor-pointer flex-col items-center justify-center text-2xl duration-200 hover:text-gray-300">
							<Link to="/" className="link flex flex-col items-center justify-center">
								<svg tabIndex="-1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
								</svg>
								Codes
							</Link>
						</button>

						{/* advanced tab */}
						<button tabIndex="-1" className="mr-5 flex cursor-pointer flex-col items-center justify-center text-2xl duration-200 hover:text-gray-300">
							<Link to="/advanced" className="link flex flex-col items-center justify-center">
								<svg tabIndex="-1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
								</svg>
								Tools
							</Link>
						</button>

						{/* settings tab */}
						<button tabIndex="-1" className="mr-5 flex cursor-pointer flex-col items-center justify-center text-2xl duration-200 hover:text-gray-300">
							<Link to="/settings" className="link flex flex-col items-center justify-center">
								<svg tabIndex="-1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								Settings
							</Link>
						</button>
					</nav>
				</div>
			</header>
		</>
	)
}

export default AppBar
