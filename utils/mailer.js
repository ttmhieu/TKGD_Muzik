const nodemailer=require('nodemailer');
const config = require('../config/default.json')

const transport = nodemailer.createTransport({

    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    tls:{
        rejectUnauthorized: false
    }
});

const from = {
    name: config.email.from,
    address: config.email.user
}

async function _sendEmail(to,subject,html){
    return new Promise((resolve,)=>{
        transport.sendMail({from, subject, to, html}, (err, info)=>{
            if(err){
                console.log(err)
                resolve(false);
            }
            resolve(true);
        })
    })
}

//send mail 
const tryAgainCount = 2

module.exports = {
    sendEmail: async function(to,subject,html){
        let result = false
        for(let i =0;i<tryAgainCount;++i){
            result = await _sendEmail(to,subject,html)
            if (result)
                return result
        }
        return result
    },

    /**
     * Ham gui link kich hoat tai khoan
     * @param {*} email `abc@gmail.com`
     * @param {*} link `http://example.com`
     */
    sendActiveToken: async function(email,link){
        const subject = "Active account"
        const html = `<h3>Please click on the link below to activate</h3><br>
            <a href="${link}">${link}</a>`
        
        return await this.sendEmail(email,subject,html)
    },

    /**
     * Ham gui link quen mat khau
     * @param {*} email `abc@gmail.com`
     * @param {*} link `http://example.com`
     */
    sendForgetToken: async function(email,link){
        const subject = "Reset password"
        const html = `<h3>Please click on the link below to change your password</h3><br>
            <a href="${link}">${link}</a>`
        return await this.sendEmail(email,subject,html)
    }
};

