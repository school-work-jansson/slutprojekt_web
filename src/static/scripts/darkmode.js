function set_prefered_darkmode_setting(darkmodeEnabled) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
        // Om datorns har preferenser använd den
        // document.body.classList.add("dark-mode");
        // console.log("Turn on darkmode detection");
        setDarkMode(true)

    } else {

        setDarkMode(darkmodeEnabled)

        // Annars kolla session
    }
}

async function toggle_dark_mode() {
    // call till funktion för att ändra darkmode setting i backend
    await update_dark_mode_setting();

    // Hämta nuvarande darkmode setting från session backend
    let darkmodeEnabled = await get_dark_mode_setting();
    
    // Ändra DOM till nuvarande darkmode settings
    setDarkMode(darkmodeEnabled)

}

// Modifierar DOM och lägger till eller tar bort klasser beronde på darkmode status
function setDarkMode(darkmodeEnabled) {
    let elements = "a, p, h1, h2, h3, h4, h5, h6, span, body, div, input, header, footer, li";
    // Ändrar DOM
    if (darkmodeEnabled) {
        $("#dark_mode_button").html("<i class='fa-solid fa-sun' style='color:yellow;'></i>");
        $(elements).addClass("dark-mode");
    }
    else {
        $("#dark_mode_button").html("<i class='fa-solid fa-moon' style='color:white;'></i>")
        $(elements).removeClass("dark-mode");
    }
}


// Call funktion till backend för att ändra darkmode
async function update_dark_mode_setting() {
    let result = null;

    $.ajax({
        url: "/api/toggleDarkmodeSetting",
        type: 'post',
        dataType: 'json', // Hämta data i JSON format
        async: false,
        success: (res) => {
            result = res;
        } 
    });
    return result
}

async function get_dark_mode_setting() {
    let result = null;
    
    // Get request till backend för att hämta darkmode setting session värdet
    // https://stackoverflow.com/questions/1639555/return-get-data-in-a-function-using-jquery
    $.ajax({
       url: "/api/getDarkmodeSetting",
       type: 'get',
       dataType: 'json', // Hämta data i JSON format
       async: false,
       success: (res) => {
           result = res;
       } 
    });

    // console.log("get_dark_mode_setting result", result);

    return result;
}


($().ready(async () => {
    
    let darkmodeEnabled = await get_dark_mode_setting();
    
    console.log("Website darkmode on ready handle; darkmode ->", darkmodeEnabled)
    set_prefered_darkmode_setting(darkmodeEnabled)

    // Vid DOM change (tex sökning) så ska den uppdatera darkmode för de elementen
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let observer = new MutationObserver( async (mutations, observer) =>  {
        
        // console.log("DOM change detected", mutations[0], "on website; darkmode options = ", darkmodeEnabled);

        // Ifall knappen själv ändras så ska den inte orsaka en mutation
        if ( mutations[0].target == $("#dark_mode_button")[0] ) return;

        darkmodeEnabled = await get_dark_mode_setting();
        
        setDarkMode(darkmodeEnabled);
            
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    // https://dom.spec.whatwg.org/#interface-mutationobserver
    // Hämta DOM noden (motsvarande var l = document.getElementById("#"))
    observer.observe($(".main-content")[0], {
        // attributes:    true,
        childList:     true,
        // characterData: true,
        subtree: true
    });

}));

// När användaren klickar på darkmode knappen så ska den ändras
($('#dark_mode_button').click( async () => {
    await toggle_dark_mode();    
}));




