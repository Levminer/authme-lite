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
