const sql = require("mssql/msnodesqlv8");
const Connection = require("./Connection");
const UsefulUtilities = require("./UsefulUtilities");
const { raw } = require("express");

conn = new Connection();
util = new UsefulUtilities();

/**
 * @class User 
 */
class User {
    constructor() {
        this.name = "";
        this.surname = "";
        this.phoneNumber = "";
        this.email = "";
        this.address = "";
        this.username = "";
        this.password = "";
        this.id = 0;
        this.role = "USER";
    }

    get Password() {
        return this.password;
    }

    set Password(password) {
        this.password = util.encrypt(password);
    }

    async VerifyLogin(email, password) {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            let hashedPwd = util.encrypt(password);

            request.input("email", sql.VarChar(100), email);
            request.input("password", sql.VarChar(100), hashedPwd);

            let result = await request.execute("VerifyUnamePwd");

            if (result.recordsets[0] && result.recordsets[0][0]) {
                
                this.name = result.recordsets[0][0].firstName;
                this.surname = result.recordsets[0][0].lastName;
                this.phoneNumber = result.recordsets[0][0].gsmNumber;
                this.email = result.recordsets[0][0].email;
                this.address = result.recordsets[0][0].address;
                this.username = result.recordsets[0][0].username;
                this.id = result.recordsets[0][0].id;
                this.password = result.recordsets[0][0].password;
                this.role = result.recordsets[0][0].role;

            } else {
                console.log("No user found with the provided credentials");
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async CreateUser() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            //let hashedPwd = await util.encrypt(this.password);

            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("gsmNum", sql.VarChar(100), this.phoneNumber);
            request.input("email", sql.VarChar(100), this.email);
            request.input("address", sql.VarChar(100), this.address);
            request.input("username", sql.VarChar(100), this.username);
            request.input("password", sql.VarChar(100), this.password);
            request.input("role", sql.VarChar(100), this.role);

            request.output("id", sql.Int, this.id);

            let result = await request.execute("CreateUser");

            let f = 124545;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async UpdateUser() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);
            request.input("name", sql.VarChar(100), this.name);
            request.input("surname", sql.VarChar(100), this.surname);
            request.input("gsmNum", sql.VarChar(100), this.phoneNumber);
            request.input("email", sql.VarChar(100), this.email);
            request.input("address", sql.VarChar(100), this.address);
            request.input("username", sql.VarChar(100), this.username);
            request.input("password", sql.VarChar(100), this.password);
            request.input("role", sql.VarChar(100), this.role);

            let result = await request.execute("UpdateUser");


        } catch (error) {
            console.error(error);
            return false;
        }
        finally {
            conn.close();
        }

        return true;
    }

    async ChangePassword(oldPassword, newPassword) {
        let hashedOldPassword = util.encrypt(oldPassword);
        if (this.password != hashedOldPassword) {
            return false;
        }

        let newHashedPwd = util.encrypt(newPassword);
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);
            request.input("password", sql.VarChar(100), newHashedPwd);

            let result = await request.execute("ChangePassword");


        } catch (error) {
            console.error(error);
        } finally {
            conn.close();
        }

        this.password = newHashedPwd;
        return true;
    }

    async HardDeleteUser() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);

            let result = await request.execute("RemoveUser");
        }
        catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async SoftDeleteUser() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);

            let result = await request.execute("SoftDeleteFromUsers");

        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    async BringBackUser() {
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("id", sql.Int, this.id);
            let result = await request.execute("RetrieveDeletedUser");
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            conn.close();
        }

        return true;
    }

    GenerateRandomPassword() {
        let pwd = "";
        for (let i = 0; i < 8; i++) {
            let chance = Math.floor(Math.random() * 100);

            if (chance < 20) { // for upper cases
                let randomChar = Math.floor(Math.random() * 26) + 65;
                pwd += String.fromCharCode(randomChar);
            } else if (chance < 80) { // for lower cases
                let randomChar = Math.floor(Math.random() * 26) + 97;
                pwd += String.fromCharCode(randomChar);
            } else { // for numbers
                let randomChar = Math.floor(Math.random() * 10) + 48;
                pwd += String.fromCharCode(randomChar);
            }
        }
        this.Password = pwd;

        return pwd;
    }

    async ListUsers(searchWord, activeState) {

        let users = [];
        try {
            await conn.open();
            let request = new sql.Request(conn.pool);

            request.input("userSearch", sql.VarChar(100), searchWord);

            let activeStateBit = 1;

            if (activeState == "false") {
                activeStateBit = 0;
            }
            

            request.input("activeState", sql.Bit, activeStateBit);

            let result = await request.execute("RetrieveUsers");

            let rawUsers = result.recordsets[0];


            rawUsers.forEach(user => {
                let tempUser = new User();
                tempUser.id = user.id;
                tempUser.name = user.firstName;
                tempUser.surname =  user.lastName;
                tempUser.phoneNumber = user.gsmNumber;
                tempUser.email = user.email;
                tempUser.address = user.address;
                tempUser.username = user.username;
                tempUser.role = user.role;
                tempUser.password = user.password;

                users.push(tempUser)
            });


        } catch (error) {
            console.error(error);
        } finally {
            conn.close();
        }

        return users;
    }

    

}

module.exports = User;

// async function test() {
    
//     let user = new User();
//     user.id = 18;

//     let result = await user.SoftDeleteUser();

//     let i = 5;

// }

// test();
