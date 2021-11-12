const db=require("../utils/dao");

const TBL_SONG="Songs";
const TBL_Users_Comments = "Users_Comments";
const TBL_Users_like_Songs = "Users_like_Songs";
const TBL_Users = "Users";
const TBL_Users_Favorite_Songs = "Users_Favorite_Songs";

module.exports={
    add: function(song){
        return db.add(TBL_SONG, song);
    },
    delete: async(id,author) => {
        let sql = ''
        if (author)
            sql =` and author=${author}`
        return db.load(`UPDATE ${TBL_SONG} CT SET CT.delete=1  WHERE ID=${id} ${sql}`)
    },
    likedList: async id => {
        return db.load(`select CT.ID from ${TBL_SONG} CT 
        JOIN ${TBL_Users_like_Songs} US on CT.ID = US.Song
        where CT.delete is NULL and US.User=${id}`)
    },
    like :async(Song,User) =>{
        return db.add(TBL_Users_like_Songs,{Song,User})
    },
    unLike: async(Song,User) =>{
        return db.load(`delete from ${TBL_Users_like_Songs} where Song = ${Song} and User = ${User}`)
    },
    updateLike: async () => {
        return db.load(`UPDATE ${TBL_SONG} as US 
        LEFT JOIN (
            SELECT Song, COUNT(Song) countSong
            FROM ${TBL_Users_like_Songs}
            GROUP BY Song
        ) as LJ on US.ID=LJ.Song
        set likes = IFNULL(LJ.countSong,0)`)
    },
    updateComment: async () => {
        return db.load(`UPDATE ${TBL_SONG} as US 
        LEFT JOIN (
            SELECT Song, COUNT(Song) countSong
            FROM ${TBL_Users_Comments}
            GROUP BY Song
        ) as LJ on US.ID=LJ.Song
        set comments = IFNULL(LJ.countSong,0)`)
    },
    getListSong:async(id=-1)=>{
        let sql =''
        if (id!=-1)
            sql = ` and author=${id}`
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
            WHERE CT.delete is NULL ${sql}`
        );
    },
    getById: async(id,author)=>{
        let sql = ''
        if (author)
            sql =` and author=${author}`
        return db.load(`SELECT * FROM ${TBL_SONG} CT WHERE ID= '${id}' AND CT.delete is NULL ${sql}`)
    },
    getRandomByCategory: async (category,num=1)=>{
        return db.load(`SELECT CT.* FROM ${TBL_SONG} CT 
        WHERE CT.delete is NULL and category = ${category}
            and status=1
        ORDER BY RAND() LIMIT ${num+1}`)
    },
    patch: async(id,entity) =>{
        return db.patch(TBL_SONG,entity,{id})
    },
    search: function(searchString,count=false,page,offset){
        let sql = "*",sql2=`limit ${page} offset ${offset}`
        if (count){
            sql = "COUNT(*) numOfSong"
            sql2 = ''
        }
        return db.load(`SELECT ${sql} FROM ${TBL_SONG} CT
        WHERE CT.delete is NULL and status=1 and MATCH (Name,Singer,composer)
        AGAINST ('${searchString}' IN NATURAL LANGUAGE MODE) ${sql2}`)
    },
    getByCategory: async (id,count=false,page,offset) => {
        let sql = "*",sql2=`limit ${page} offset ${offset}`
        if (count){
            sql = "COUNT(*) numOfSong"
            sql2 = ''
        }
        return db.load(`SELECT ${sql} FROM ${TBL_SONG} CT
        WHERE CT.delete is NULL and status=1 and category=${id} ${sql2}`)
    },
    addComment: function(entity){
        return db.add(TBL_Users_Comments, entity);
    },
    getCommentListById: function(id){
        return db.load(`SELECT us.ID, us.userName, us.avatar, usCM.content, DATE_FORMAT(usCM.createDate, "%M %d, %Y %H:%i") as cmDate
        FROM ${TBL_Users_Comments} usCM JOIN ${TBL_Users} us ON usCM.User = us.ID 
        WHERE usCM.Song = ${id} and usCM.delete = 0
        ORDER BY usCM.createDate DESC`);
    },
    getNewCommentOfUserById: async function(idUser, idSong) {
        const commentInfo = await db.load(`SELECT usCM.ID, usCM.content, DATE_FORMAT(usCM.createDate, "%M %d, %Y %H:%i") as cmDate 
        FROM ${TBL_Users_Comments} usCM 
        WHERE usCM.User = ${idUser} And usCM.Song = ${idSong}
        ORDER BY usCM.createDate DESC LIMIT 1`);
        return commentInfo[0];
    },
    getFavoriteListByUserId: function(userId){
        return db.load(`SELECT s.ID as songId, s.views, s.Name, s.composer
        FROM ${TBL_Users_Favorite_Songs} usFS JOIN ${TBL_SONG} s ON usFS.Song = s.ID JOIN ${TBL_Users} us ON s.author = us.ID 
        WHERE usFS.User = ${userId} AND s.delete is NULL`);
    },
    deleteFavoriteSong: function(userId, songId){
        return db.load(`DELETE FROM ${TBL_Users_Favorite_Songs} WHERE User = ${userId} AND Song = ${songId}`);
    },
    addFavoriteSong: function(userId, songId){
        return db.add(TBL_Users_Favorite_Songs, {
            User: userId,
            Song: songId
        });
    }
}