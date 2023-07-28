const crypto = require('crypto');
class UsefulUtilities {
        /**
     * 
     * @param {* input password to - be encrpyted} input 
     * @returns sha256 encrypted password
     */
    encrypt(input) {
        const hash = crypto.createHash('sha256');
        hash.update(input)

        const hashedInput = hash.digest('base64');

        return hashedInput;
    }

    /**
     * 
     * @param {* input string to be normalized} input 
     * @returns normalized string.
     */
    convertTurkishToAscii(input) {
        input = input.toLowerCase().replace(/\s/g, "");

        // Contains lowercase Turkish characters
        const charMap = {
            'ç': 'c',
            'ğ': 'g',
            'ı': 'i',
            'ö': 'o',
            'ş': 's',
            'ü': 'u'
        };
    
        for (let key in charMap) {
            let regex = new RegExp(key, 'g'); // Using 'g' flag for global match (replace all occurrences)
            input = input.replace(regex, charMap[key]);
        }
    
        return input;
    
    }

}

module.exports = UsefulUtilities;
