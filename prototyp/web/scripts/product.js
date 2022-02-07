let review_object = {
    title: "",
    content: "",
    name: "",
    date: getDate(),
    rating: 0
}


$(() => {
    handle_review_form()
})

function handle_review_form() {

    /* Star-rating Inspiration (https://codepen.io/Leoschmittk/pen/OJbQBgb) */
    const star_whole = "rating__star fas fa-star";
    const star_half = "raiting__star fas fa-star-half-alt"
    const star_none = "rating__star far fa-star";

    // Mappar alla raiting__star iconerna till en array
    let stars = $('.rating__star').map((_, element) => {return element}).get()

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

// KAnske använder någon gång
// function handleformating(key)
// {
//     switch (key) {
//         case 13:
//             return "<br>"
//             break;

//         default:
//             break;
//     }
// }

function post_review(review) {
    $.post("/send_review", review)
    console.log(review_object)
}

function getDate() {
    return new Date().toISOString()
}

function loadProduct()
{

}