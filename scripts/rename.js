const fs = require("fs")
const os = require("os")
const { version } = require("../package.json")

if (os.platform() === "win32") {
	try {
		fs.renameSync("./core/target/release/Authme Lite.exe", `./core/target/release/authme-lite-${version}-windows-x64-portable.exe`)
		fs.renameSync(`./core/target/release/bundle/msi/Authme Lite_${version}_x64_en-US.msi`, `./core/target/release/authme-lite-${version}-windows-x64-installer.msi`)
	} catch (err) {
		console.log("File not found")
	}
} else if (os.platform() === "darwin") {
	try {
		fs.renameSync("./core/target/release/Authme Lite", `./core/target/release/authme-lite-${version}-mac-x64-portable`)
		fs.renameSync(`./core/target/release/bundle/dmg/Authme Lite_${version}_x64.dmg`, `./core/target/release/authme-lite-${version}-mac-x64-installer.dmg`)
	} catch (err) {
		console.log("File not found")
	}
} else {
	try {
		fs.renameSync("./core/target/release/authme-lite", `./core/target/release/authme-lite-${version}-linux-x64-portable`)
		fs.renameSync(`./core/target/release/bundle/appimage/authme-lite_${version}_amd64.AppImage`, `./core/target/release/authme-lite-${version}-linux-x64-installer.appimage`)
	} catch (err) {
		console.log("File not found")
	}
}
