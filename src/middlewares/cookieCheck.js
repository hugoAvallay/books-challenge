module.exports = (req,res,next) => {
    if(req.cookies.recuperatorioComision20){
        req.session.userLogin = req.cookies.recuperatorioComision20
    }
    next()
}