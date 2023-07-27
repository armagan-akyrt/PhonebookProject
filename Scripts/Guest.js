const sql = require("mssql/msnodesqlv8");
const Connection = require("./connection");
const UsefulUtilities = require("./UsefulUtilities");

conn = new Connection();
util = new UsefulUtilities();

class Guest {

    constructor() {
    this.name = "";
    this.surname = "";
    this.cardId = 0;
    this.id = 0;

    this.visitingId = new User();
    
    cardAcquisitionDate = new Date();
    cardExpirationDate = new Date();

    }

    async CreateGuest() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);
    
            request.input("userId", sql.Int, this.visiting.id);
            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("cardId", sql.Int, this.cardId);
            request.input("cardAcquisitionDate", sql.DateTime, this.cardAcquisitionDate);
            request.input("cardExpirationDate", sql.DateTime, this.cardExpirationDate);
    
            request.output("id", sql.Int, this.id);
    
            let result = await request.execute("CreateGuest");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }



}

module.exports = Guest;