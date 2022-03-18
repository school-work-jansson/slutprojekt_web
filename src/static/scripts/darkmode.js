( $().ready(() => {
    
    console.log("on ready darkmode")
    set_prefered_darkmode_setting()
}));

($('#dark_mode_button').click(() => {
    toggle_dark_mode()
}));

function set_prefered_darkmode_setting() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
        // Om datorns har preferenser använd den
        document.body.classList.add("dark-mode");
        console.log("Turn on darkmode");

    } else {
        // document.body.classList.remove("dark-theme");
        // Annars kolla session
    }
}

function toggle_dark_mode() {
    // Hämta nuvarande darkmode setting från session 
    $.get("/api/getDarkmodeSetting", (response) => {
        console.log(response, typeof(response))
        
        update_dark_mode_setting();
        
        if (response) {
            document.body.classList.remove("dark-mode");
        }
        else {
            document.body.classList.add("dark-mode");
        }
    });

}

function update_dark_mode_setting() {
    $.post("/api/toggleDarkmodeSetting") 
}

