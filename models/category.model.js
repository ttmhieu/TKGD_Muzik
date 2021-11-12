const db = require("../utils/dao");

const TBL_Categories = "Categories";
const TBL_SONG="Songs";

module.exports = {
    countCategory: async function () {
        const rs = await db.load(`SELECT count(CT.ID) as numOfcate FROM ${TBL_Categories} CT WHERE CT.delete = 0`);
        return rs[0].numOfcate;
    },
    getByID: async id => {
        // const result = await db.load(`SELECT CT.* FROM ${TBL_Categories} CT WHERE CT.delete = 0 and ID=${id}`);
        // return result[0];
        return db.load(`SELECT CT.* FROM ${TBL_Categories} CT WHERE CT.delete = 0 and ID=${id}`)
    },
    getIdName: async ()=>{
        return db.load(`SELECT CT.ID,CT.Name FROM ${TBL_Categories} CT WHERE CT.delete = 0`)
    },
    getListCategoryByPagination: function (page, offset) {
        return db.load(`SELECT CT.* FROM ${TBL_Categories} CT 
            WHERE CT.delete = 0 limit ${page} offset ${offset}`
        );
    },
    getAlbum: async(num)=>{
        return db.load(`SET @rank_song=0,@category=-1;
        SELECT s.*,c.Name categoryName, c.description
        FROM ${TBL_Categories} c JOIN ( 
            SELECT ID,Name,composer,
                @rank_song:=if(@category=category,@rank_song+1,1) as rank_song,@category:=category as category
            FROM ${TBL_SONG} s
            WHERE s.delete is null and s.status=1
            ORDER BY category, publishDate desc
        ) s on c.ID=s.category
        WHERE c.delete != 1 and rank_song <= ${num}`)
    },
    getTopTrend: async (number) => {
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and status=1
        ORDER BY views DESC, publishDate DESC, comments DESC, likes DESC LIMIT ${number}`)
    },
    getNewest: async (number) => {
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and status=1
        ORDER BY publishDate DESC LIMIT ${number}`)
    },
    getHotSong: async (number) => {
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and status=1
        ORDER BY comments DESC, likes DESC LIMIT ${number}`)
    },
    getTrend: async (number) => {
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and status=1
        ORDER BY views DESC LIMIT ${number}`)
    },
    getPopular: async (number) => {
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and status=1
        ORDER BY RAND() LIMIT ${number}`)
    },
    deleteCategory: function (ID) {
        const entity = {
            delete: 1
        }
        const conditions = {
            ID: ID
        }
        return db.patch(TBL_Categories, entity, conditions);
    },
    add: function(category){
        return db.add(TBL_Categories, category);
    },
    edit: function(entity){
        const conditions = {ID: entity.ID};
        delete(entity.ID);
        return db.patch(TBL_Categories, entity, conditions);
    }
}