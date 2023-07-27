// Import the necessary modules
const sql = require('mssql/msnodesqlv8');

// SQL Server config
const config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server=.;Database=PhoneDirectory;Trusted_Connection=yes;',
};

class Connection {

    constructor() {
        this.pool = null;
    }

    async open() {
        this.pool = await sql.connect(config);
    }

    close() {
        if (this.pool) {
            this.pool.close();
        }
    }
}

module.exports = Connection;