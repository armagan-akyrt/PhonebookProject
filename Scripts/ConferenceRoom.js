

class ConferenceRoom {
    
    constructor() { 
        this.roomId = 0;
        this.overseerId = 0;
        this.roomCapacity = 0;
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
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            let result = await request.execute("ConferenceListMeetingRooms");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async ListConferenceRoomsFull() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            let result = await request.execute("ConferenceListMeetingRooms");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }
}