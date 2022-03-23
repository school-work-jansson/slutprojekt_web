function handle_review_form() {

    /* Star-rating Inspiration (https://codepen.io/Leoschmittk/pen/OJbQBgb) */
    const star_whole = "rating__star rating-changable fas fa-star";
    const star_half = "raiting__star rating-changable fas fa-star-half-alt"
    const star_none = "rating__star rating-changable far fa-star";

    // Mappar alla raiting__star iconerna till en array
    let stars = $('.rating__star.rating-changable').map((_, element) => {return element}).get()

    /* När användaren faktiskt skickar reviewn mot servern */
    $("#send_review_button").click(() => {
        post_review(review_object)
    })

    /* Listner som väntar på ändringar i review formuläret*/
    $('#title').on('input', () => {
        let title_value = $("#title").val()
        $("#preview-title").html(title_value)
        $("#preview-date").html(getDate())
        review_object.title = title_value
    });

    $('#content').on('input', () => {
        let content_value = $("#content").val()
        $("#preview-content").html(content_value)
        $("#preview-date").html(getDate())

        review_object.content = content_value
    });

    $('#name').on('input', () => {
        let name_value = $("#name").val()
        $("#preview-name").html(name_value)
        $("#preview-date").html(getDate())
        review_object.name = name_value
    });

    // console.log("DEBUG: ", stars)

    // på något sätt fungerar detta för att ändra mängden stjärnor
    // När en användare clickar på 
    $(stars).each((star_index) => {
        $(stars[star_index]).click(() => {
            let i = star_index;
            review_object.rating = (star_index + 1) // Index av den stjärnan som användaren klickar på plus ett

            if ( !$(stars[star_index]).hasClass(star_whole) )
            {
                for (i; i >= 0; --i)
                    $(stars[i]).attr("class", star_whole)
                
            }   
            else {
                for (i; i < stars.length; i++)
                    $(stars[i]).attr("class", star_none)
                
            }

            update_preview_stars(review_object.rating)
            
            // console.log("Current rating", review_object.rating)

        })
    })

}

function update_preview_stars(rating)
{

    const preview_star_whole = "preview__rating__star fas fa-star";
    const preview_star_none = "preview__rating__star far fa-star";

    let preview_stars = $('.preview__rating__star').map((_, element) => {return element}).get()

    $(preview_stars).each((star_index) => {
        let i = rating - 1
        
        if ( $(preview_stars[i]).hasClass(preview_star_whole) )
        {
            for (i; i < preview_stars.length; i++)
                $(preview_stars[i]).attr("class", preview_star_none)
        }
        else {
            for (i; i >= 0; --i)
                $(preview_stars[i]).attr("class", preview_star_whole)
        }
        
    })   

}

function post_review(review) {
    // $.ajax()
    let validated = validateReviewForm()
    
    if (!validated[0]) return $("#submit_result").html(`<h3>${validated[1]}<h3>`);

    $.ajax({
        url: `/api/post_review`,
        type: 'POST',
        data: review,
        dataType: 'JSON', // Hämta data i JSON format
        async: false,
        success: (res) => {
            console.log("post result", res)
            if (res)
            {

                $("#submit_result").html(`<h3>Din recenssion är inskickad!<h3>`)
                $("#review-form input, #review-form textarea").prop('disabled', true);

                // setTimeout(() => {

                // }, 5000)
            }
            else
                $("#submit_result").html(`<h3>Tyvärr var det något som inte riktigt fungerade där. Pröva gärna lite senare!<h3>`)
        }
    });

}

function getDate() {
    return new Date().toISOString()
}

function validateReviewForm() {
    if (review_object.title.length < 1)
        return [false, "Du behöver ange en title"]
    
    return [true, null]

}


let productHash = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("hash");
}

let review_object = {
    hash: productHash(),
    title: "",
    content: "",
    date: getDate(),
    rating: 0
}

function initial_reviews() {
    $.ajax({
        url: `/api/p_raw?hash=${productHash()}`,
        type: 'GET',
        dataType: 'json', // Hämta data i JSON format
        async: false,
        success: (res) => {console.log(res);handleReviewResponse(res);}
        // success: (res) => {
        //     result = res;
        // } 
    });
}


$(() => {



    handle_review_form()

    let low_lim = 0;
    let high_lim = 10;
    
    $(".popup-button").click( () => {
        $('.popup-background').show();
    });
    $('.close-popup-button').click( () => {
        $('.popup-background').hide();
    });

    initial_reviews()

    $('.pagnition_button').click(() => {
        let result = pagination(productHash(), low_lim, high_lim, "product_review");

        // Om jag får tillbaka något resultat så vill jag öka pagnition low_lim 
        if (result.reviews.length > 0)
        {
            low_lim = high_lim + 1;
            high_lim += 10;
        }
    
        handleReviewResponse(result)
        

    });

    
})