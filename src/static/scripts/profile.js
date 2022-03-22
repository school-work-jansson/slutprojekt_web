function handleResponnse(responseObject) {
    let cardsContent = "";

    // itererar igenom hela respons objektet
    for (const key in responseObject) {
        if (Object.hasOwnProperty.call(responseObject, key)) {
            const review = responseObject[key];
            // Lägger till html till varabel
            cardsContent += `
            <div class="card">
                <div>
                    <div class="card-title">
                        <h1><a href="#">${review.title}</a></h1> 
                    </div>
                    <div class="average-rating">
                    ${generateStars(review.rating)}
                        <span>${ review.rating }/5</span>
                    </div>
                    <div class="description">
                        <p> ${ review.content } </p>
                        <a href="/p/${review.hash}">Gå till produkt...</a>
                    </div>
                </div>
            </div> 
            `
            console.log(review, key)
            
        }
    }
    // Pushar till cards div
    $(".cards").append(cardsContent)
}

function generateStars(rating)
{
    rating = Math.round(rating)
    let stars = ""
    for (let index = 0; index < 5; index++) {
        // const element = array[index];
        if (rating > index)
            stars += `<i class="rating__star fas fa-star"></i>`
        else
            stars += `<i class="rating__star far fa-star"></i>`
    }
    return stars
}


function initial_reviews() {
    $.ajax({
        url: "/api/get_user_reviews",
        type: 'GET',
        dataType: 'json', // Hämta data i JSON format
        async: false,
        success: (res) => {handleResponnse(res)}
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
        let search_value = $('#search-input').val();
        let result = pagination(null, low_lim, high_lim, "review");

        // Om jag får tillbaka något resultat så vill jag öka pagnition low_lim 
        if (result.length > 0)
        {
            low_lim = high_lim + 1;
            high_lim += 10;
        }
            
    
        handleResponnse(result)
        

    });
})