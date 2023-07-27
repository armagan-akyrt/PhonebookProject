const crypto = require('crypto');
class UsefulUtilities {
        /**
     * 
     * @param {* input password to - be encrpyted} input 
     * @returns sha256 encrypted password
     */
    async encrypt(input) {
        const hash = crypto.createHash('sha256');
        hash.update(input)

        const hashedInput = hash.digest('base64');

        return hashedInput;
    }

}

module.exports = UsefulUtilities;
