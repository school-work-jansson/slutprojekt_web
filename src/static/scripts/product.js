// TODO: Kanske skriva om den här koden va?

function contentEditable() {
    const ele = document.getElementById('__review-title');



    // Get the placeholder attribute
    const placeholder = ele.getAttribute('data-placeholder');
    $("#__review-title").keypress(() => {
        if($("#__review-title").text.length >= 10) Event.preventDefault();
    })
    



    // Set the placeholder as initial content if it's empty
    ele.innerHTML === '' && (ele.innerHTML = placeholder);
    ele.addEventListener('focus', function (e) {
        const value = e.target.innerHTML;
        value === placeholder && (e.target.innerHTML = '');
    });

    ele.addEventListener('blur', function (e) {
        const value = e.target.innerHTML;
        value === '' && (e.target.innerHTML = placeholder);
    });
}

function validKeycodes(code) {
    switch (code) {
        case 65:
        case 67:
        case 86:
        case 88:
        case 8:
        case 37:
        case 38:
        case 39:
        case 40:
        case 16:
        case 36:
        case 35:
        case 33:
        case 34:
            return true;
        default:
            return false
            break;
    }
    
}


function handle_review_form() {
    // contentEditable()

    /* Star-rating Inspiration (https://codepen.io/Leoschmittk/pen/OJbQBgb) */
    let stars = $('.rating__star.rating-changable').map((_, element) => {return element}).get()    // Mappar alla raiting__star iconerna till en array
    const star_whole = "rating__star rating-changable fas fa-star";
    const star_none = "rating__star rating-changable far fa-star";
    let submit_button = $("#submit-review-button");
    let title_element = $('#title, #__review-title')
    let content_element = $("#__review-content");

    // Listner som preventar att titeln blir längre än 55 chars
    $(title_element).on('keydown paste', (event) => { //Prevent on paste as well
        if ( $(title_element).text().length >= 55 && event.keyCode != 8) event.preventDefault();
        // console.log($("#__review-title").text(), $("#__review-title").text().length, $("#__review-title").text().length >= 55 && event.keyCode != 8)
        // TODO: Key code för backspace pilarna, ctrl + a, c, v, r, x
        // Man ska inte kunna cp pasta in text som är längre än gränsen
        
        // let sliced = $("#__review-title").text().slice(0, 55)
        // $("#__review-title").text(sliced)
    });

    /* Listner som väntar på ändringar i review formuläret*/
    // Test on change
    title_element.on('input', () => {
        review_object.title = title_element.text();
    });

    content_element.on('input', () => {
        review_object.content = content_element.text()
    });

    /* Användaren klickar på submit */
    submit_button.click(() => {
        console.log("submiting", review_object);
        submit_button.addClass("active");
        post_review(review_object)
    })

    // på något sätt fungerar detta för att ändra mängden stjärnor
    // När en användare clickar på en stjärna
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

        })
    })

}


function post_review(review) {
    // $.ajax()
    let validated = validateReviewForm()
    
    if (!validated[0]) return $("#submit_result span").text(`${validated[1]}`);

    $.ajax({
        url: `/api/post_review`,
        type: 'POST',
        data: review,
        dataType: 'JSON', // Hämta data i JSON format
        async: false,
        success: (res) => {
            console.log("post result", res)
            if (res) {

                $("#submit_result span").text(`Din recenssion är inskickad!`)
                $("#review-form input, #review-form textarea").prop('disabled', true);

            }
            else {
                $("#submit_result").html(`<h3>Tyvärr var det något som inte riktigt fungerade där. Pröva gärna lite senare!<h3>`)
            }
                
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