function set_prefered_darkmode_setting(darkmodeEnabled) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
        // Om datorns har preferenser använd den
        document.body.classList.add("dark-mode");
        console.log("Turn on darkmode");

    } else {

        setDarkMode(darkmodeEnabled)
        // document.body.classList.remove("dark-theme");
        // Annars kolla session
    }
}

function toggle_dark_mode() {
    update_dark_mode_setting();
    let darkmodeEnabled = get_dark_mode_setting();
    // Hämta nuvarande darkmode setting från session backend
    
    // call till funktion för att ändra darkmode setting i backend
    
    setDarkMode(darkmodeEnabled)

}

// Modifierar DOM och lägger till eller tar bort klasser beronde på darkmode status
function setDarkMode(darkmodeEnabled) {
    if (darkmodeEnabled) {
            
        $("h1, p, h2, span, body, div, input, header").removeClass("dark-mode");
    }
    else {
        // document.body.classList.add("dark-mode");
        $("p, h1, h2, span, body, div, input, header").addClass("dark-mode");

    }
}


// Call funktion till backend för att ändra darkmode
function update_dark_mode_setting() {
    $.post("/api/toggleDarkmodeSetting") 
}

function get_dark_mode_setting() {
    let result = null;
    
    $.ajax({
       url: "/api/getDarkmodeSetting",
       type: 'get',
       dataType: 'json',
       async: false,
       success: (res) => {
           result = res;
       } 
    });

    console.log("get_dark_mode_setting result", result);

    return result;
}


($().ready(() => {
    
    let darkmodeEnabled = get_dark_mode_setting();
    
    console.log("Website darkmode on ready handle; darkmode ->", darkmodeEnabled)
    set_prefered_darkmode_setting(darkmodeEnabled)

    // Vid DOM change så ska den uppdatera darkmode för de elementen
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let observer = new MutationObserver((mutations, observer) =>  {
        // fired when a mutation occurs
        console.log("DOM change detected on website");
        setDarkMode(darkmodeEnabled);
            
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    // https://dom.spec.whatwg.org/#interface-mutationobserver
    observer.observe(document, {
        subtree: true,
        childList: true
    });

}));

($('#dark_mode_button').click(() => {
    toggle_dark_mode()
}));




