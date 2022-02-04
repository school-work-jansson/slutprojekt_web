    
/* 
    TAGET FRÅN W3-SCHOOL https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top 
    -> omskrivet i jquery
*/
$(() => {
    // When the user scrolls down 20px from the top of the document, show the button
    let scroll_down_limiter = 20
    $(window).scroll( () => {
        ( $(document.body).scrollTop() > scroll_down_limiter || $(document.documentElement).scrollTop() > scroll_down_limiter) 
        ? $("#goto-top").attr("style", "display: block;") 
        : $("#goto-top").attr("style", "display: none;");
    });
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $(document.body).scrollTop(0);
    $(document.documentElement).scrollTop(0);
}
