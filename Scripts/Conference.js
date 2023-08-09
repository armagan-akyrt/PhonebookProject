
const Connection = require("./Connection.js");
const ConferenceRoom = require("./ConferenceRoom.js");
const sql = require("mssql");

conn = new Connection();

class Conference {

    constructor() {
        this.conferenceId = 0;
        this.requestId = 0;
        this.requesterId = 0;
        this.participantIds = [];
        this.conferenceRoom = new ConferenceRoom();
        this.topic = "";
        this.description = "";
        this.notes = "";

        this.startDate = null;
        this.endDate = null;
    }
    
    /**
     * Creates a conference, then creates a request,then adds participants to the request.
     * @returns {boolean} True if the conference was created successfully, false otherwise.
     */
    async CreateConference() {

        try {
            
        await conn.open();
        let request = new sql.Request(conn.pool);

        request.input("roomId", sql.Int, this.conferenceRoom.roomId);
        request.input("topic", sql.VarChar(100), this.topic);
        request.input("description", sql.VarChar(1000), this.description);
        request.input("notes", sql.VarChar(1000), this.notes);
        request.input("startDate", sql.DateTime, this.startDate);
        request.input("endDate", sql.DateTime, this.endDate);

        request.output("conferenceId", sql.Int, this.conferenceId);

        let result = await request.execute("ConferenceCreate");
        
        this.conferenceId = result.output.conferenceId;


        } catch (error) {
            console.error(error);
            return false;            
        } finally {
            conn.close();
        }

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("conferenceId", sql.Int, this.conferenceId);
            request.input("requesterId", sql.Int, this.requesterId);

            request.output("requestId", sql.Int, this.requestId);

            let result = await request.execute("ConferenceNewRequest");
            this.requestId = result.output.requestId;

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }
        try {
            await conn.open();

            for (let i = 0; i < this.participantIds.length; i++) {
                const participantId = this.participantIds[i];
                let request = new sql.Request(conn.pool);
                
                request.input("requestId", sql.Int, this.requestId);
                request.input("participantId", sql.Int, participantId);

                let result = await request.execute("ConferenceAddParticipant");
            }

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async ListParticipantRequests(currentUserId) {

        let requests = [];

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("participantId", sql.Int, currentUserId);

            let result = await request.execute("ConferenceListPendingParticipants");

            let rawRequests = result.recordsets[0];

            rawRequests.forEach((rawRequest) => {

                let tempConference = new Conference();
                tempConference.conferenceId = rawRequest.conferenceId;
                tempConference.requestId = rawRequest.requestId;
                tempConference.requesterId = rawRequest.requesterId;

                tempConference.topic = rawRequest.topic;
                tempConference.description = rawRequest.description;
                tempConference.notes = rawRequest.notes;

                tempConference.startDate = rawRequest.startDate;
                tempConference.endDate = rawRequest.endDate;

                tempConference.conferenceRoom.roomId = rawRequest.roomId;

                requests.push(tempConference);
            });

        } catch (error) {
            console.error(error);
            return null;
        }

        return requests;
    }

    async ParticipantResponse(participantId, response) {
        
        let procedureString = "ConferenceAcceptRequest";

        if (response == "reject") {
            procedureString = "ConferenceParticipantRejectRequest";
        }

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("requestId", sql.Int, this.requestId);
            request.input("participantId", sql.Int, participantId);

            let result = await request.execute(procedureString);

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async ListPendingApprovals(currentUserId) {

        let requests = [];

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("overseerId", sql.Int, currentUserId);

            let result = await request.execute("ConferenceListPendingApprovals");

            let rawRequests = result.recordsets[0];

            rawRequests.forEach((rawRequest) => {

                let tempConference = new Conference();
                tempConference.conferenceId = rawRequest.conferenceId;
                tempConference.requestId = rawRequest.requestId;
                tempConference.requesterId = rawRequest.requesterId;

                tempConference.topic = rawRequest.topic;
                tempConference.description = rawRequest.description;
                tempConference.notes = rawRequest.notes;

                tempConference.startDate = rawRequest.startDate;
                tempConference.endDate = rawRequest.endDate;

                tempConference.conferenceRoom.roomId = rawRequest.roomId;

                requests.push(tempConference);
            });

        } catch (error) {
            console.error(error);
            return null;
        }

        return requests;
    }

    async OverseerRequestResponse(overseerId, response) {

        let procedureString = "ConferenceOverseerApprove";

        if (response == "reject") {
            procedureString = "ConferenceRejectRequest";
        }

        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("requestId", sql.Int, this.requestId);
            request.input("overseerId", sql.Int, overseerId);

            let result = await request.execute(procedureString);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async UpdateConference() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("conferenceId", sql.Int, this.conferenceId);
            request.input("topic", sql.VarChar(100), this.topic);
            request.input("description", sql.VarChar(1000), this.description);
            request.input("notes", sql.VarChar(1000), this.notes);
            request.input("startDate", sql.DateTime, this.startDate);
            request.input("endDate", sql.DateTime, this.endDate);

            let result = await request.execute("ConferenceUpdateData");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async ListNotifications(userId)
    {
        let notifications = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("participantId", sql.Int, userId);

            let result = await request.execute("ConferenceListNotifications");

            let rawNotifications = result.recordsets[0];

            rawNotifications.forEach((rawNotification) => {
                notifications.push(rawNotification);
            });

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            conn.close();
        }

        return notifications;

    }

    async ClearNotifications(userId)
    {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("userId", sql.Int, userId);

            let result = await request.execute("ConferenceClearNotifications");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

} module.exports = Conference;