const fs = require("fs")
const { version } = require("../package.json")

const build = new Date().toISOString().replace("T", "X").replaceAll(":", ".").substring(0, 19).replaceAll("-", ".").slice(2).replaceAll(".", "").replace("X", ".")

const date = new Date()

const year = date.getFullYear()
const month = date.toLocaleString("en-us", { timeZone: "UTC", month: "long" })
const day = date.toISOString().substring(8, 10)

const build_number = `alpha.${build}`
const release_date = `${year}. ${month} ${day}.`

const file = {
	number: build_number,
	date: release_date,
}

if (!fs.existsSync("core/target/release")) {
	fs.mkdirSync("core/target/release", { recursive: true })
}

fs.writeFileSync("build.json", JSON.stringify(file, null, "\t"))
fs.writeFileSync("core/target/release/build.json", JSON.stringify(file, null, "\t"))

const conf = JSON.parse(fs.readFileSync("core/tauri.conf.json", "utf-8"))
conf.package.version = version

fs.writeFileSync("core/tauri.conf.json", JSON.stringify(conf, null, "\t"))
