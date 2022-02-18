($().ready(()  => {
    setTimeout(() => {
        $('.full-screen').hide()
    }, 250)
    
}))


function navbar_button(){
    ($("#nav_links").is(':hidden')) ? $("#nav_links").show() : $("#nav_links").hide();
}