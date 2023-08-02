const sql = require("mssql/msnodesqlv8");
const { DateTime } = require("msnodesqlv8");
const Connection = require("./connection");
const UsefulUtilities = require("./UsefulUtilities");

let conn = new Connection();

class Meeting {

    constructor() {
        this.meetingId = 0;
        this.userId = 0;
        this.contactId = 0;

        this.meetingStartDate = new DateTime();
        this.meetingEndDate = new DateTime();

        this.meetingNotes = "";
        this.contactFullName = "";
    }

    async CreateMeeting() {

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("userId", sql.Int,this.userId);
            request.input("contactId", sql.Int, this.contactId);
            request.input("startDate", sql.DateTime, this.meetingStartDate);
            request.input("endDate", sql.DateTime, this.meetingEndDate);
            request.input("notes", sql.VarChar(1000), this.meetingNotes);

            await request.execute("AddMeeting");


        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async UpdateMeeting() {
        try {
                
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("meetingId", sql.Int, this.meetingId);
            request.input("userId", sql.Int, this.userId);
            request.input("contactId", sql.Int, this.contactId);
            request.input("newStartDate", sql.DateTime, this.meetingStartDate);
            request.input("endDate", sql.DateTime, this.meetingEndDate);
            request.input("notes", sql.VarChar(1000), this.meetingNotes);

            await request.execute("UpdateMeeting");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async RemoveMeeting() {

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("meetingId", sql.Int, this.meetingId);

            await request.execute("DeleteMeeting");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async MeetingsList(searchWord, activeState, startInterval, endInterval, userId) {
        let meetings = [];

        try {
            await conn.open();

            let request = new sql.Request(conn.pool);

            request.input("usernameSearch", sql.VarChar(100), searchWord);
            request.input("activeState", sql.Bit, activeState);
            request.input("startInterval", sql.DateTime, startInterval);
            request.input("endInterval", sql.DateTime, endInterval);
            request.input("userId", sql.Int, userId);

            let result = await request.execute("RetrieveMeetings");

            let rawMeetings = result.recordsets[0];

            rawMeetings.forEach(rawMeeting => {
                
                let tempMeeting = new Meeting();

                tempMeeting.meetingId = rawMeeting.meetingId;
                tempMeeting.meetingNotes = rawMeeting.notes;
                tempMeeting.meetingStartDate = rawMeeting.startDate;
                tempMeeting.meetingEndDate = rawMeeting.endDate;
                tempMeeting.contactId = rawMeeting.contactId;
                tempMeeting.contactFullName = rawMeeting.firstName + " " + rawMeeting.lastName;

                meetings.push(tempMeeting);

            });

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            conn.close();
        }

        return meetings;

    }

    async MeetingsListPrevious(searchWord, activeState, startInterval, endInterval, userId) {
        let meetings = [];

        try {
            await conn.open();

            let request = new sql.Request(conn.pool);

            request.input("usernameSearch", sql.VarChar(100), searchWord);
            request.input("activeState", sql.Bit, activeState);
            request.input("startInterval", sql.DateTime, startInterval);
            request.input("endInterval", sql.DateTime, endInterval);
            request.input("userId", sql.Int, userId);

            let result = await request.execute("RetrievePreviousMeetings");

            let rawMeetings = result.recordsets[0];

            rawMeetings.forEach(rawMeeting => {
                
                let tempMeeting = new Meeting();

                tempMeeting.meetingId = rawMeeting.meetingId;
                tempMeeting.meetingNotes = rawMeeting.notes;
                tempMeeting.meetingStartDate = rawMeeting.startDate;
                tempMeeting.meetingEndDate = rawMeeting.endDate;
                tempMeeting.contactId = rawMeeting.contactId;
                tempMeeting.contactFullName = rawMeeting.firstName + " " + rawMeeting.lastName;

                meetings.push(tempMeeting);

            });

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            conn.close();
        }

        return meetings;
    }

    async BringBackMeeting() {

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("meetingId", sql.Int, this.meetingId);

            await request.execute("BringBackMeeting");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

}

module.exports.Meeting = Meeting;