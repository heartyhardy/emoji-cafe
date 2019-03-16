
const PageNotFoundError = (req, res, next) => {
    res
        .status(404)
        .render('error/404', {title:"Oops! we failed to find any food here."})
}

module.exports = {
    PageNotFoundError
}