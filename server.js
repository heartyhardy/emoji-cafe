const express = require('express');
const parser = require('body-parser');

//import routes
const shop_route = require('./routes/shop');
const admin_route = require('./routes/admin');
const user_route = require('./routes/user');

//import error controller
const { PageNotFoundError } = require('./controllers/error-controller');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));
app.use(parser.urlencoded({ extended: false }));
app.use(shop_route.router);
app.use('/admin', admin_route.router);
app.use('/user', user_route.router);
app.use(PageNotFoundError);

const Access = require('./models/Access');

let access = new Access("xdx", "something new");
// (async () => {
//     try {
//         let tokens = await access.fetch();
//         console.log(tokens);
//     }catch(e){
//         console.log(e);
//     }

// })();

// (async() => {
//     let saved = await access.save();
//     console.log(saved);
// })();

// (async () => {
//     try {
//         let tokens = await access.fetch_by_id('uid');
//         console.log(tokens);
//     } catch (e) {
//         console.log(e);
//     }

// })();

(async () => {
    try{
        let x = await access.assign();
        console.log(x);
    }catch(e){
        console.log(e);
    }
})();

// (async()=> {
//     try{
//         let x = await Access.clean();
//         console.log(x);
//     }
//     catch(e){
//         console.log("error",e);
//     }
// })();
//Access.clean();

//access.getallTokens(result => console.log);

app.listen(PORT, () => console.log(`🍕  Serving food like nobody's business on PORT: ${PORT}`));
