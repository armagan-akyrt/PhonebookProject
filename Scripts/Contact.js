const sql = require("mssql/msnodesqlv8");
const Connection = require("./connection");
const { raw } = require("express");

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

    async ListContacts(id, contactSearch, activeState) {
        try {
            await this.conn.open();
            let request = new sql.Request(this.conn.pool);

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


async function main() {
    let id = 1;
    let contactSearch = "";
    let activeState = true;

    let contact = new Contact();
    let contactsList = []
    contactsList = await contact.ListContacts(id, contactSearch, activeState)

    console.log(contactsList);

    let i = 4;
}

main.catch((error) => console.error(error));


