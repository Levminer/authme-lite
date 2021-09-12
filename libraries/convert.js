import "./typedef"

/**
 * Convert codes from plain text to arrays
 * @param {string} text
 * @return {LibImportFile} Import file structure
 */
export const convert = (text) => {
	const data = []
	const names = []
	const secrets = []
	const issuers = []
	const types = []
	let c0 = 0
	let c1 = 1
	let c2 = 2
	let c3 = 3

	// remove double qoutes
	const pre_data1 = text.replace(/"/g, "")

	// new line
	const pre_data2 = pre_data1.replace(/,/g, "\n")

	// convert string the array
	const pre_data3 = pre_data2.split(/\n/)
	while (pre_data3.length) {
		data.push(pre_data3.shift())
	}

	// remove first blank line
	data.splice(0, 1)

	// remove blank strings
	for (let i = 0; i < data.length; i++) {
		if (data[i] === "" || data[i] === "\r" || data[i] === "\n" || data[i] === "\r\n") {
			data.splice(i, 1)
		}
	}

	for (let i = 0; i < data.length; i++) {
		// push names to array
		if (i == c0) {
			const names_before = data[i]
			const names_after = names_before.slice(8)
			names.push(names_after.trim())
			c0 = c0 + 4
		}

		// push secrets to array
		if (i == c1) {
			const secrets_before = data[i]
			const secrets_after = secrets_before.slice(8)
			secrets.push(secrets_after.trim())
			c1 = c1 + 4
		}

		// push issuers to array
		if (i == c2) {
			const issuers_before = data[i]
			const issuers_after = issuers_before.slice(8)
			issuers.push(issuers_after.trim())
			c2 = c2 + 4
		}

		// push types to array
		if (i == c3) {
			const types_before = data[i]
			const types_after = types_before.slice(8)
			types.push(types_after.trim())
			c3 = c3 + 4
		}
	}

	return {
		names,
		secrets,
		issuers,
		types,
	}
}
