
function initial_reviews() {
    $.ajax({
        url: "/api/get_user_reviews",
        type: 'GET',
        dataType: 'json', // Hämta data i JSON format
        async: false,
        success: (res) => {handleReviewResponse(res)}
        // success: (res) => {
        //     result = res;
        // } 
    });
}

$(()  => {
    let low_lim = 0;
    let high_lim = 10;

    initial_reviews()

    $('.pagnition_button').click(() => {
        let result = pagination(null, low_lim, high_lim, "review");

        // Om jag får tillbaka något resultat så vill jag öka pagnition low_lim 
        if (result.length > 0)
        {
            low_lim = high_lim + 1;
            high_lim += 10;
        }
    
        handleReviewResponse(result)

    });
})