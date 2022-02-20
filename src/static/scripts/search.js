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
        });

       //Enable the textbox again if needed.
       $('#search-input').removeAttr("disabled");
    }
});


function handleResponnse(responseObject) {
    for (const key in responseObject) {
        if (Object.hasOwnProperty.call(responseObject, key)) {
            const element = responseObject[key];
            console.log(element, key)
            
        }
    }
}


function pagnitionSearch() {
    $.post("http://localhost:8080/api/more_search", {seach_query: search_value}, (response) => {
        console.log(response);
    });
}