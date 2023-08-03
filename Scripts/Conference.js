
const Connection = require("./Connection.js");
const ConferenceRoom = require("./ConferenceRoom.js");

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

        result = await request.execute("ConferenceCreate");

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

            conn.console();
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }
        try {
            await conn.open();

            this.participantIds.forEach(async (participantId) => {
                let request = new sql.Request(conn.pool);
                
                request.input("requestId", sql.Int, this.requestId);
                request.input("participantId", sql.Int, participantId);

                let result = await request.execute("ConferenceAddParticipant");
            });


        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }


} module.exports = Conference;