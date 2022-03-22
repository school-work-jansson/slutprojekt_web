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

let pagination_type = (type_of_pagnition) => {        
    type = {
        review: "review",
        product: "product",
        product_review: "product_review"
    }
    return type[type_of_pagnition]
}


function pagination(search_value, l_lim = 0, h_lim = 10, type_of_pagnition) {
    let result;

    $.ajax({
        url: "/api/pagnition_search",
        type: 'POST',
        data: {
            search_query: search_value,
            low_lim: l_lim,
            high_lim: h_lim,
            type: pagination_type(type_of_pagnition),
        },
        dataType: 'json', // Hämta data i JSON format
        async: false,
        success: (res) => {
            result = res;
        } 

    });


    return result
}