
// Get the main shop window with all items
const GetShopWindow = (req, res, next) => {
    res
        .status(200)
        .render('shop/shop', {title: "Emoji grocery and café"});
}

module.exports = {
    GetShopWindow
}