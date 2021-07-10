/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"

const ClearDataDialog = (props) => {
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	const clearData = () => {
		setIsOpen(false)

		localStorage.clear()

		location.reload()

		location.replace("/")
	}

	return (
		<>
			<div className="inset-0 flex items-center justify-center">
				<button type="button" onClick={openModal} className="button">
					{props.name}
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 z-10 backdrop-filter backdrop-grayscale backdrop-blur" onClose={closeModal}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-gray-600 shadow-xl rounded-2xl">
								<Dialog.Title as="h3" className="text-4xl font-medium leading-6 text-gray-50 flex justify-center">
									{props.name}
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-xl text-gray-50 flex justify-center text-center">{props.text}</p>
								</div>

								<div className="flex flex-row gap-3 justify-center">
									<div className="">
										<button type="button" className="button" onClick={clearData}>
											{props.button0}
										</button>
									</div>

									<div className="">
										<button type="button" className="button" onClick={closeModal}>
											{props.button1}
										</button>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ClearDataDialog
