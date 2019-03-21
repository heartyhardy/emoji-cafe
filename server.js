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
app.use(parser.urlencoded({extended:false}));
app.use(shop_route.router);
app.use('/admin', admin_route.router);
app.use('/user', user_route.router);
app.use(PageNotFoundError);

app.listen(PORT, () => console.log(`🍕  Serving food like nobody's business on PORT: ${PORT}`));
