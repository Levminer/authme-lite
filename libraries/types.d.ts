/** Query selector element types */
interface Element {
	/** Element styles */
	style: CSSStyleDeclaration

	/**Is element disabled */
	disabled: boolean

	/**Input element value */
	value: string

	/**Is checkbox element checked */
	checked: boolean
}

/** HTML dialog element types */
interface LibDialogElement extends Element {
	/** Show the dialog as a modal */
	showModal: Function

	/* Close the modal */
	close: Function
}

/* Authme Import file structure  */
interface LibImportFile {
	names: string[]
	secrets: string[]
	issuers: string[]
	types?: string[]
}

interface LibAuthmeFile {
	role: "codes" | "import" | "export"
	encrypted: boolean
	codes: string
	date: string
	version: 3
}

interface LibStorage {
	password: string
	require_password: boolean
	hash: string
	settings: {
		names: boolean
	}
}
