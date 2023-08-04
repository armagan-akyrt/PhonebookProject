const sql = require('mssql/msnodesqlv8');
const Connection = require("./Connection.js");
let conn = new Connection();

class ConferenceRoom {
    
    constructor() { 
        this.roomId = 0;
        this.overseerId = 0;
        this.roomCapacity = 0;
        this.isEmpty = true;
        this.meetingTopic = "";
        this.meetindDescription = "";
        this.startTime = null;
        this.endTime = null;
        this.participants = [];

    }

    async CreateConferenceRoom() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("overseerId", sql.Int, this.overseerId);
            request.input("roomCapacity", sql.Int, this.roomCapacity);

            request.output("roomId", sql.Int, this.roomId);

            let result = await request.execute("CreateConferenceRoom");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }
        

        return true;
    }

    async RemoveConferenceRoom() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("roomId", sql.Int, this.roomId);

            let result = await request.execute("RemoveConferenceRoom");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async ListMeetingRooms() {
        let rooms = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            let result = await request.execute("ConferenceListMeetingRooms");

            let rawRooms = result.recordsets[0];
            
            rawRooms.forEach(element => {
                let room = new ConferenceRoom();
                room.roomId = element.roomId;
                room.overseerId = element.overseerId;
                room.roomCapacity = element.capacity;
                room.isEmpty = true;
                if (element.roomStatus == 'In Use') {
                    room.isEmpty = false;
                    room.meetingTopic = element.topic;
                    room.meetindDescription = element.description;
                    room.endTime = element.endTime;
                    room.description = element.description;
                } 
                
                rooms.push(room);
            });

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            conn.close();
        }

        return rooms;
    }
} module.exports = ConferenceRoom;


async function main() {
    let room = new ConferenceRoom();
    let rooms = await room.ListMeetingRooms();

    console.log(rooms);
}

main();