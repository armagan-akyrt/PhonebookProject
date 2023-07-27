const sql = require("mssql/msnodesqlv8");
const Connection = require("./connection");

conn = new Connection();

class Contact {
    constructor() {
        this.name = "";
        this.surname = "";
        this.phoneNumber = "";
        this.email = "";
        this.address = "";
        this.username = "";
        this.id = 0;


    }

    async CreateContact(userId) {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);
    
            request.input("userId", sql.Int, userId);
            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("gsmNum", sql.VarChar(100), this.phoneNumber);
            request.input("email", sql.VarChar(100), this.email);
            request.input("address", sql.VarChar(100), this.address);
    
            request.output("id", sql.Int, this.id);
    
            let result = await request.execute("CreateContact");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async UpdateContact() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);
            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("gsmNum", sql.VarChar(100), this.phoneNumber);
            request.input("email", sql.VarChar(100), this.email);
            request.input("address", sql.VarChar(100), this.address);

            let result = await request.execute("UpdateContact");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }
    }

    async SoftDeleteContact() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);

            let result = await request.execute("SoftDeleteFromContacts");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }
    }

    async SevereUserContact(userId) {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("userId", sql.Int, userId);
            request.input("contactId", sql.Int, this.id);

            let result = await request.execute("SevereUserContact");
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            conn.close();
        }
    }

    async ListContacts(id, contactSearch, activeState) {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, id);
            request.input("contactSearch", sql.VarChar(100), contactSearch);
            request.input("activeState", sql.Bit, activeState);

            let result = await request.execute("RetrieveData");

            // result.recordsets should already be an array of contacts
            // If you want to format it or print each contact, you can use something like:

            let rawContacts = result.recordsets[0];

            let contacts = [];
            contacts = rawContacts.map((contact) => ({
                id: contact.id,
                name: contact.firstName,
                surame: contact.lastName,
                phoneNumber: contact.gsmNumber,
                email: contact.email,
                address: contact.address,
                username: contact.username,
                active: contact.activeState,
            }));

            //   result.recordsets.forEach((contact, index) => {
            //     console.log(`Contact ${index + 1}:`, contact);
            //   });
            return contacts;
        } catch (error) {
            console.error(error);
        } finally {
            this.conn.close();
        }
    }
}

module.exports = Contact;

/* For testing. */
// async function main() {
//     let id = 1;
//     let contactSearch = "";
//     let activeState = true;

//     let contact = new Contact();
//     let contactsList = []
//     contactsList = await contact.ListContacts(id, contactSearch, activeState)

//     console.log(contactsList);

//     let i = 4;
// }

// main.catch((error) => console.error(error));


