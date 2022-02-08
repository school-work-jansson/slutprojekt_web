import express from "express";
const router = express.Router()

/* PÅ något sätt ska den ha ett unikt "id" för att kunna separera två olika typer av samma produkt */
router.get("/:name", (req, res) => {
    // Check database for name
    fetched_product, fetched_reviews, error = get_product(req.params.name)
    // If result from database check return product
    
        // Get product info if name exists
        // return to user
        res.render('product', {product: fetched_product, reviews: fetched_reviews, error: null})
})



router.post("/post_review", (req, res) => {

});


router.get("/get_products", (req, res))

export { router as productRoute };


