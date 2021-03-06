function handleResponnse(responseObject) {

    let firstProductImage = (product) => {
        // Om arrayen av bilder större än 0
        if (product.pictures.length > 0)
            return product.pictures[0].url;
        else 
            return "https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_yet2.jpg"
    }
    
    let cardsContent = "";
    // console.log(responseObject.pictures)
    // itererar igenom hela respons objektet
    for (const key in responseObject) {
        if (Object.hasOwnProperty.call(responseObject, key)) {
            const product = responseObject[key];
            // Lägger till html till varabel
            cardsContent += `
            <div class="card">
                <div class="card-image">
                    <a href="/p?hash=${product.hash}">
                        <img src="${firstProductImage(product)}" crossorigin="anonymous" alt="Picture of ${product.name}">
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
                        <a href="/p?hash=${product.hash}">Visa mer...</a>
                    </div>
                </div>
            </div> 
            `
            console.log(product, key)
            
        }
    }
    // Pushar till cards div
    $(".cards").append(cardsContent)
}

$(() => {
    let last_input = ""; // ajabaja
    let low_lim = 1;    
    let high_lim = 1;

    $(".pagnition").hide()

    $('#search-input').on('keypress',  (e) => {
        // lägg till för telefon sökning
        low_lim = 1;
        high_lim = 1;
        if(e.which === 13){
            

            let search_value = $('#search-input').val();

            
    
            // Förhindra användaren att spamma servern
            if (last_input == search_value) return;

            // cleara nuvarande cards
            $(".cards").html(null);
           
            //Disable textbox to prevent multiple submit
            $('#search-input').attr("disabled", "disabled");
            
            last_input = search_value;
            // console.log(search_value)
            $.post("http://localhost:8080/api/search", {seach_query: search_value}, (response) => {
                // console.log(response[0].AverageRating);
                handleResponnse(response)
                $(".search-result").html(`<span>Results: ${response.length}</span>`)
                $(".pagnition").show()
            });
    
           //Enable the textbox again if needed.
           $('#search-input').removeAttr("disabled");
        }
    });
    
    $('.pagnition_button').click(() => {
        let search_value = $('#search-input').val();
        let result = pagination(search_value, low_lim, high_lim, "product");

        // Om jag får tillbaka något resultat så vill jag öka pagnition low_lim 
        if (result.length > 0)
        {
            low_lim = high_lim + 1;
            high_lim += 5;
        }
            
    
        handleResponnse(result)
        

    });
    
    
})
