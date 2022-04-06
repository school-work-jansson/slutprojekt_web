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

function handleReviewResponse(responseObject) {
    let cardsContent = "";

    // itererar igenom hela respons objektet
    responseObject.reviews.forEach(element => {
        cardsContent += `
        <div class="card wordwrap">
            <div>
                <div class="card-title">
                    <h1 id="review-title" >${element.title}</h1> 
                </div>
                <div class="average-rating">
                    ${generateStars(element.rating)}
                    <span>${ element.rating }/5</span>
                    <span id="review-date">${element.created_at}</span>
                    <span id="review-name">${element.nickname}</span>
                </div>
                <div class="description">
                    <p> ${ element.content } </p>
                    ${ (element.hash) ? '<a href="/p?hash=' + element.hash + '">Gå till produkt...</a>' : "" }
                </div>
            </div>
        </div> 
        `

        // Gamla card diven med data
        // <div class="review-card">
        //         <h1 id="review-title"><%= reviews[key].title %></h1> 
        //         <div class="average-rating">
        //             <i class="rating__star far fa-star"></i>
        //             <i class="rating__star far fa-star"></i>
        //             <i class="rating__star far fa-star"></i>
        //             <i class="rating__star far fa-star"></i>
        //             <i class="rating__star far fa-star"></i>
        //             <span><%= reviews[key].rating %>/5</span>
        //         </div>
        //         <span id="review-name"><%= reviews[key].nickname %></span>
        //         <span id="review-date"><%= reviews[key].created_at %></span>
        //         <p id="review-content"><%= reviews[key].content %></p>                
        // </div> 
    });
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