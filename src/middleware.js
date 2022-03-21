function session_check(req, res, next) {
    if (!req.session.authenticated && !req.session.client_data)
        return res.redirect('/');

    next();

}

function save_last_site_visited(req, res, next) {
    if( req.query.origin )
        req.session.last_visited = req.query.origin
    else
        req.session.last_visited = req.header('Referer')

    console.log("org URL: ", req.session.last_visited, req.header('Referer'));

    next();
}

export { session_check , save_last_site_visited }