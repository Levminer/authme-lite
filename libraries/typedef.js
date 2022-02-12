/**
 * Authme import file structure
 * @typedef {Object} LibImportFile
 * @property {Array<String>} names - Names array
 * @property {Array<String>} secrets - Secrets array
 * @property {Array<String>} issuers - Issuers array
 * @property {Array<String>} types - Types array
 */

/**
 * Authme import file structure
 * @typedef {Object} LibStorage
 * @property {String} password - Password encrypted with bcrypt
 * @property {Boolean} require_password - Require password
 * @property {String} hash - Text encrypted with password
 * @property {Object} settings - App settings
 * @property {Boolean} settings.names - Show 2FA names
 */

/**
 * .authme file structure
 * @typedef {object} LibAuthmeFile
 * @property {string} role - Role of the file (codes, import, export, rollback, backup)
 * @property {boolean} encrypted - Is the file encrypted
 * @property {string} codes - Base64 encoded string
 * @property {Date} date - Date when the file created
 * @property {number} version - Indicates version (3)
 */
