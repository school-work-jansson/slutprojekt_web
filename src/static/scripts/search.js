let last_input = "";

$('#search-input').on('keypress',  (e) => {
    if(e.which === 13){
        let search_value = $('#search-input').val();

        // Förhindra användaren att spamma servern
        if (last_input == search_value) return;
       
        //Disable textbox to prevent multiple submit
        $('#search-input').attr("disabled", "disabled");
        
        last_input = search_value;
        console.log(search_value)
        $.post("http://localhost:8080/api/search", {seach_query: search_value}, (response) => {
            // console.log(response[0].AverageRating);
            handleResponnse(response)
            $(".search-result").html(`<span>Results: ${response.length}</span>`)
        });

       //Enable the textbox again if needed.
       $('#search-input').removeAttr("disabled");
    }
});


function handleResponnse(responseObject) {
    let cardsContent = "";

    // itererar igenom hela respons objektet
    for (const key in responseObject) {
        if (Object.hasOwnProperty.call(responseObject, key)) {
            const product = responseObject[key];
            // Lägger till html till varabel
            cardsContent += `
            <div class="card">
                <div class="card-image">
                    <a href="#">
                        <img src="https://2.bp.blogspot.com/-Alyh9NCQTgY/VL77pFNp3GI/AAAAAAAAQAU/dk538mjy93g/s1600/14.jpg" crossorigin="anonymous" alt="Picture of product">
                    </a>
                </div>
                <div>
                    <div class="card-title">
                        <h1><a href="#">${product.name}</a></h1> 
                    </div>
                    <div class="average-rating">
                        ${generateStars(product.AverageRating)}
                        <span>${product.AverageRating}/5</span>
                    </div>
                    <div class="description">
                        <p>${product.description}</p>
                        <a href="#">Visa mer...</a>
                    </div>
                </div>
            </div> 
            `
            console.log(product, key)
            
        }
    }
    // Pushar till cards div
    $(".cards").html(cardsContent)
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

function pagnitionSearch() {
    let search_value = $('#search-input').val();
    $.post("http://localhost:8080/api/more_search", {seach_query: search_value, low_lim: 0, high_lim: 10}, (response) => {
        console.log(response);
    });
}