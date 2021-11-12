const exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
const moment = require('moment');
moment.locale('vi')

module.exports = function (app) {
    app.engine('hbs', exphbs({
        extname: "hbs",
        defaultLayout: 'main.hbs',
        helpers:
        {
            section: express_handlebars_sections(),
            parseTime: (time) => {
                return moment(time).format('HH:mm, DD/MM/YYYY');
            },
            parseDate: (date) => {
                return moment(date).format('YYYY-MM-DD');
            },
            isEqual: (a,b) => a==b,
            or: (a,b) => a || b,
            and: (a,b) => a && b
        }
    }));
    app.set('view engine', 'hbs');
};