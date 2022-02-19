let last_input = "";

$('#search-input').on('keypress',  (e) => {
    if(e.which === 13){
        let search_value = $('#search-input').val();

        // Förhindra användaren att spamma servern
        if (last_input == search_value) return;
       
        //Disable textbox to prevent multiple submit
        $('#search-input').attr("disabled", "disabled");
        
        last_input = search_value;

        $.post("http://localhost:8080/api/search", {query: search_value}, (response) => {
            console.log(response);
        });

       //Enable the textbox again if needed.
       $('#search-input').removeAttr("disabled");
    }
});


function pagnitionSearch() {
    $.post("http://localhost:8080/api/more_search", {query: search_value}, (response) => {
        console.log(response);
    });
}