const sql = require("mssql/msnodesqlv8");
const Connection = require("./connection");
const User = require("./User");
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
    
    this.companyName = "";
    
    this.visiting = new User();
    
    this.cardAcquisitionDate = new Date();
    this.cardSubmitDate = new Date();

    }

    async CreateGuest() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);
    
            request.input("firstName", sql.VarChar(100), this.name);
            request.input("lastName", sql.VarChar(100), this.surname);
            request.input("companyName", sql.VarChar(100), this.companyName);
            request.input("userId", sql.Int, this.visiting.id);
            request.input("cardId", sql.Int, this.cardId);
    
            request.output("id", sql.Int, this.id);
    
            let result = await request.execute("AddGuest");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    /**
     * 
     * @param {*} searchWord search by associated user's username.
     * @param {*} startDate start date
     * @param {*} endDate end date
     * @param {*} companyName search by company name
     * @param {*} isInside search by inside or all
     * @returns list of guests
     */
    async GuestList(searchWord, startDate, endDate, companyName, isInside) {
        let guests = [];
        
        let procedureString = "RetrieveGuests"
        if (isInside == 'true') {
            procedureString = "RetrieveGuestsInside";
        }
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("username", sql.VarChar(100), searchWord);
            request.input("startDate", sql.DateTime, startDate);
            request.input("endDate", sql.DateTime, endDate);
            request.input("companyName", sql.VarChar(100), companyName);

            let result = await request.execute(procedureString);

            let rawGuests = result.recordsets[0];

            rawGuests.forEach((rawGuest) => {

                let tempGuest = new Guest();
                tempGuest.id = rawGuest.id;
                tempGuest.name = rawGuest.firstName;
                tempGuest.surname = rawGuest.lastName;
                tempGuest.cardId = rawGuest.cardId;
                tempGuest.companyName = rawGuest.companyName;
                tempGuest.cardAcquisitionDate = rawGuest.acquisitionTime;
                tempGuest.cardSubmitDate = rawGuest.cardSubmitDate;
                tempGuest.companyName = rawGuest.companyName;

                let user = new User();
                user.id = rawGuest.userId;
                user.username = rawGuest.userUsername;
                user.name = rawGuest.userFirstname;
                user.surname = rawGuest.userLastname;
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
                tempGuest.companyName = rawGuest.companyName;
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
                tempGuest.companyName = rawGuest.companyName;
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