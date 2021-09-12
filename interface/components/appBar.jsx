import React from "react"
import { Link } from "react-router-dom"
import { number } from "../../build.json"
import BuildNumber from "./buildNumber.jsx"
import UpdatePopup from "./updatePopup.jsx"

const style = async () => {
	if (number.startsWith("alpha")) {
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
			<header id="header" className="text-gray-50 bg-gray-900 sticky z-40">
				<div className="container mx-auto flex lex-shrink-0 flex-wrap p-5 flex-col md:flex-row items-center">
					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
						{/* codes tab */}
						<button tabIndex="-1" className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/" className="link flex flex-col justify-center items-center">
								<svg tabIndex="-1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
								</svg>
								Codes
							</Link>
						</button>

						{/* advanced tab */}
						<button tabIndex="-1" className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/advanced" className="link flex flex-col justify-center items-center">
								<svg tabIndex="-1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
								</svg>
								Advanced
							</Link>
						</button>

						{/* settings tab */}
						<button tabIndex="-1" className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/settings" className="link flex flex-col justify-center items-center">
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
