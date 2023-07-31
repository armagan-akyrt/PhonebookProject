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

        return true;
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

        return true;
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

        return true;
    }

    async ListContacts(id, contactSearch, activeState) {

        let contacts = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, id);
            request.input("contactSearch", sql.VarChar(100), contactSearch);

            let activeStateBit = 1;
            
            if (activeState == "false") {
                activeStateBit = 0;
            }

            console.log(`Active State: ${activeStateBit}`);
            request.input("activeState", sql.Bit, activeStateBit);

            let result = await request.execute("RetrieveData");

            // result.recordsets should already be an array of contacts
            // If you want to format it or print each contact, you can use something like:

            let rawContacts = result.recordsets[0];

            rawContacts.forEach((contact) => {
                let tempContact = new Contact();

                tempContact.id = contact.id;
                tempContact.name = contact.firstName;
                tempContact.surname = contact.lastName;
                tempContact.phoneNumber = contact.gsmNumber;
                tempContact.email = contact.email;
                tempContact.address = contact.address;
                tempContact.username = contact.username;
                tempContact.active = contact.activeState;

                contacts.push(tempContact);
            });

            

        } catch (error) {
            console.error(error);
        } finally {
            conn.close();
        }

        return contacts;
    }

    async BringBackContact() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);

            let result = await request.execute("RetrieveDeletedContact");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }
}

module.exports = Contact;



