const sql = require("mssql/msnodesqlv8");
const Connection = require("./connection");
const UsefulUtilities = require("./UsefulUtilities");
const { raw } = require("express");

conn = new Connection();
util = new UsefulUtilities();

class Guest {

    constructor() {
    this.name = "";
    this.surname = "";
    this.cardId = 0;
    this.id = 0;

    this.visiting = new User();
    
    cardAcquisitionDate = new Date();
    cardSubmitDate = new Date();

    }

    async CreateGuest() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);
    
            request.input("userId", sql.Int, this.visiting.id);
            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("cardId", sql.Int, this.cardId);
    
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

    async GuestListAll(searchWord, startDate, endDate, companyName) {
        let guests = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("username", sql.VarChar(100), searchWord);
            request.input("startDate", sql.DateTime, startDate);
            request.input("endDate", sql.DateTime, endDate);
            request.input("companyName", sql.VarChar(100), companyName);

            let result = await request.execute("RetrieveGuests");

            let rawGuests = result.recordset[0];

            rawGuests.forEach(rawGuest => {

                let tempGuest = new Guest();
                tempGuest.id = rawGuest.id;
                tempGuest.name = rawGuest.firstName;
                tempGuest.surname = rawGuest.lastName;
                tempGuest.cardId = rawGuest.cardId;
                tempGuest.cardAcquisitionDate = rawGuest.acquisitionTime;
                tempGuest.cardSubmitDate = rawGuest.cardSubmitDate;
                tempGuestcompanyName = rawGuest.companyName;

                let user = new User();
                user.id = rawGuest.userId;
                user.username = rawGuest.username;
                user.name = rawGuest.firstName;
                user.surname = rawGuest.lastName;
                user.email = rawGuest.email;
                user.phoneNumber = rawGuest.gsmNumber;
                user.address = rawGuest.address;
                user.role = rawGuest.role;

                tempGuest.visiting = user;

                guests.push(tempGuest);

            });


        } catch (error) {
            console.error(error);
            return null;
        }
        finally {
            conn.close();
        }

        return guests;
    }

    async GuestListInside(searchWord, startDate, endDate, companyName) {
        let guests = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("username", sql.VarChar(100), searchWord);
            request.input("startDate", sql.DateTime, startDate);
            request.input("endDate", sql.DateTime, endDate);
            request.input("companyName", sql.VarChar(100), companyName);

            let result = await request.execute("RetrieveGuestsInside");

            let rawGuests = result.recordset[0];

            rawGuests.forEach(rawGuest => {

                let tempGuest = new Guest();
                tempGuest.id = rawGuest.id;
                tempGuest.name = rawGuest.firstName;
                tempGuest.surname = rawGuest.lastName;
                tempGuest.cardId = rawGuest.cardId;
                tempGuest.cardAcquisitionDate = rawGuest.acquisitionTime;
                tempGuest.cardSubmitDate = rawGuest.cardSubmitDate;
                tempGuestcompanyName = rawGuest.companyName;

                let user = new User();
                user.id = rawGuest.userId;
                user.username = rawGuest.username;
                user.name = rawGuest.firstName;
                user.surname = rawGuest.lastName;
                user.email = rawGuest.email;
                user.phoneNumber = rawGuest.gsmNumber;
                user.address = rawGuest.address;
                user.role = rawGuest.role;

                tempGuest.visiting = user;

                guests.push(tempGuest);

            });


        } catch (error) {
            console.error(error);
            return null;
        }
        finally {
            conn.close();
        }

        return guests;
    }

    async GuestListOutside(searchWord, startDate, endDate, companyName) {

        let guests = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("username", sql.VarChar(100), searchWord);
            request.input("startDate", sql.DateTime, startDate);
            request.input("endDate", sql.DateTime, endDate);
            request.input("companyName", sql.VarChar(100), companyName);

            let result = await request.execute("RetrieveGuestsOutside");

            let rawGuests = result.recordset[0];

            rawGuests.forEach(rawGuest => {

                let tempGuest = new Guest();
                tempGuest.id = rawGuest.id;
                tempGuest.name = rawGuest.firstName;
                tempGuest.surname = rawGuest.lastName;
                tempGuest.cardId = rawGuest.cardId;
                tempGuest.cardAcquisitionDate = rawGuest.acquisitionTime;
                tempGuest.cardSubmitDate = rawGuest.cardSubmitDate;
                tempGuestcompanyName = rawGuest.companyName;

                let user = new User();
                user.id = rawGuest.userId;
                user.username = rawGuest.username;
                user.name = rawGuest.firstName;
                user.surname = rawGuest.lastName;
                user.email = rawGuest.email;
                user.phoneNumber = rawGuest.gsmNumber;
                user.address = rawGuest.address;
                user.role = rawGuest.role;

                tempGuest.visiting = user;

                guests.push(tempGuest);

            });


        } catch (error) {
            console.error(error);
            return null;
        }
        finally {
            conn.close();
        }

        return guests;

    }

    async ObtainCard() {

        try {

            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("cardId", sql.Int, this.cardId);
            request.input("id", sql.Int, this.id);

            let result = await request.execute("ObtainCard");
            
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;

    }

    async DeleteGuest() { 

        try {
            
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);

            let result = await request.execute("DeleteGuest");

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