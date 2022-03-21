($().ready(()  => {
    // Ta bort loader 250ms efter att sidan laddat in
    setTimeout(() => {
        $('.full-screen').hide()
    }, 250)
    
}))


// Om navbar är display: hidden; så ska den visas annars så ska den vara gämd
function navbar_button(){
    ($("#nav_links").is(':hidden')) ? $("#nav_links").show() : $("#nav_links").hide();
}