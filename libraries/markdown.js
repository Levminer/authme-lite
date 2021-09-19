/**
 * Convert Markdown to text
 * @param {String} text
 * @return {String} body
 */
export const convert = (text) => {
	const body = text
		.replaceAll("###", "")
		.replaceAll("*", " -")
		.replaceAll(/(#[0-9])\w+/g, "")
		.replaceAll("-  ", "- ")

	return body
}
