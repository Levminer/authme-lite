import React from "react"
import { Link } from "react-router-dom"

const Appbar = () => {
	return (
		<>
			<header className="text-gray-50 bg-gray-900 sticky top-0 z-50">
				<div className="container mx-auto flex lex-shrink-0 flex-wrap p-5 flex-col md:flex-row items-center">
					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
						{/* codes tab */}
						<button className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/" className="flex flex-col justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
								</svg>
								Codes
							</Link>
						</button>

						{/* advanced tab */}
						<button className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/advanced" className="flex flex-col justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="4" y1="21" x2="4" y2="14"></line>
									<line x1="4" y1="10" x2="4" y2="3"></line>
									<line x1="12" y1="21" x2="12" y2="12"></line>
									<line x1="12" y1="8" x2="12" y2="3"></line>
									<line x1="20" y1="21" x2="20" y2="16"></line>
									<line x1="20" y1="12" x2="20" y2="3"></line>
									<line x1="1" y1="14" x2="7" y2="14"></line>
									<line x1="9" y1="8" x2="15" y2="8"></line>
									<line x1="17" y1="16" x2="23" y2="16"></line>
								</svg>
								Advanced
							</Link>
						</button>

						{/* settings tab */}
						<button className="mr-5 text-2xl hover:text-gray-300 duration-200 cursor-pointer flex flex-col justify-center items-center">
							<Link to="/settings" className="flex flex-col justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="3"></circle>
									<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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

export default Appbar
