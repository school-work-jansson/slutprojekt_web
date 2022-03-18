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
    // Hämta nuvarande darkmode setting från session backend
    $.get("/api/getDarkmodeSetting", (response) => {
        console.log(response, typeof(response))
        
        // call till funktion för att ändra darkmode setting i backend
        update_dark_mode_setting();
        
        setDarkMode(response)
    });

}

// Modifierar DOM och lägger till eller tar bort klasser beronde på darkmode status
function setDarkMode(response) {
    if (response) {
            
        $("h1, p, h2, span, body").removeClass("dark-mode");
    }
    else {
        // document.body.classList.add("dark-mode");
        $("p, h1, h2, span, body").addClass("dark-mode");

    }
}


// Call funktion till backend för att ändra darkmode
function update_dark_mode_setting() {
    $.post("/api/toggleDarkmodeSetting") 
}



( $().ready(() => {
    
    console.log("on ready darkmode")
    set_prefered_darkmode_setting()
}));

($('#dark_mode_button').click(() => {
    toggle_dark_mode()
}));


// Vid DOM change så ska den uppdatera darkmode för de elementen
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver((mutations, observer) =>  {
    // fired when a mutation occurs
    // console.log(mutations, observer);
    $.get("/api/getDarkmodeSetting", (response) => {
        setDarkMode(response)
    });
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
// https://dom.spec.whatwg.org/#interface-mutationobserver
observer.observe(document, {
//   subtree: true,
  attributes: true
});


