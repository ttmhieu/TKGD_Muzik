const db = require("../utils/dao");

const TBL_USER = "Users"
module.exports = {
    getListUserByPagination: function(page, offset){
        return db.load(`SELECT US.* FROM ${TBL_USER} US WHERE US.delete = 0 limit ${page} offset ${offset}`);
    },
    add: function(user){
        return db.add(TBL_USER, user);
    },
    getByID: async (id) => {
        return db.load(`SELECT * FROM ${TBL_USER} US WHERE US.delete = 0 and ID = '${id}'`)
    },
    getByEmai: async (email) => {
        return db.load(`SELECT * FROM ${TBL_USER} US WHERE US.delete = 0 and email = '${email}'`);
    },
    getByEmailOrUsername: async (str) => {
        return db.load(`SELECT * FROM ${TBL_USER} WHERE (email = '${str}' 
            or userName = '${str}') and \`delete\` = 0
        `);
    },
    setForgetToken: async (token,id) => {
        return db.patch(TBL_USER,{refreshToken:token},{ID:id})
    },
    getByForgetToken: async (token) => {
        return db.load(`SELECT * FROM ${TBL_USER} US WHERE US.delete = 0 and refreshToken = '${token}'`);
    },
    patch: async (entity,id) => {
        delete entity.ID
        return db.patch(TBL_USER,entity,{ID:id})
    },
    checkExistUsername: async function(userName){
        const result = await db.load(`SELECT * FROM ${TBL_USER} US WHERE US.delete = 0 and userName = '${userName}'`);
        return result.length > 0;
    },
    checkExistEmail: async function(Email){
        const result = await db.load(`SELECT * FROM ${TBL_USER} US WHERE US.delete = 0 and email = '${Email}'`);
        return result.length > 0;
    },
    activeAccount: function(token){
        const condition  = {
            activeToken: token
        };
        const entity = {
            activeToken: null,
            status: 1
        }
        return db.patch(TBL_USER, entity, condition);
    },

    // get data
    singleByUserNameorEmail: async function (username) {
        const rows = await db.load(`select * from ${TBL_USER} US WHERE US.delete = 0 and username = '${username}' or email = '${username}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    //check username
    checkExistAccount: async function(username){
        const result = await db.load(`SELECT * FROM ${TBL_USER} WHERE username = '${username} or email = '${username}'`);
        return result.length > 0;
    },

    // active account

    // get otp 
    singleOtp: async function (username, email) {
        const rows = await db.load(`select otpverify from ${TBL_USER} where username = '${username}' or email = '${email}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },

    updatePermission: function(entity){
        const condition = {
            ID: entity.ID
        };
        delete(entity.ID);
        return db.patch(TBL_USER, entity, condition);
    },

    activeAccountByAdmin: function(entity){
        const condition = {
            ID: entity.ID
        };
        delete(entity.ID);
        return db.patch(TBL_USER, entity, condition);
    },

    checkExistEmailWithID: async function(Email, ID){
        const rs = await db.load(`SELECT count(US.ID) as userCount FROM ${TBL_USER} US WHERE US.delete = 0 and US.Email = '${Email}' AND US.ID != ${ID}`);
        return +rs[0].userCount > 0;
    },

    delete: function(entity){
        const condition = {
            ID: entity.ID
        }
        delete(entity.ID);
        return db.patch(TBL_USER, entity, condition);
    },

    countUser: async function(){
        const rs = await db.load(`SELECT count(US.ID) as numOfUser FROM ${TBL_USER} US WHERE US.delete = 0`);
        return +rs[0].numOfUser;
    }
}