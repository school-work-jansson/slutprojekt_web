function session_check(req, res, next) {
    if (!req.session.authenticated && !req.session.client_data)
        return res.redirect('/');

    next();

}


export { session_check }