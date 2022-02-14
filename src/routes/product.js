import express from "express";
const router = express.Router()
import { Product } from '../database';


/* PÅ något sätt ska den ha ett unikt "id" för att kunna separera två olika typer av samma produkt */
// router.get("/:name", (req, res) => {
//     // Check database for name
//     fetched_product, fetched_reviews, error = get_product(req.params.name)
//     // If result from database check return product
    
//         // Get product info if name exists
//         // return to user
//         res.render('product', {product: fetched_product, reviews: fetched_reviews, error: null})
// })



router.get('/p_product', (req, res) => {
    res.render('product')
})

router.get('/p_review', (req, res) => {
    res.render('review')
})

router.post("/post_review", async (req, res) => {

    
});

router.post('/post_product', async (req, res) => {
    let product = new Product();
    console.log(req.body)
    await product.post_product(req.body);
    res.redirect('/p/p_product')
})


// router.get("/get_products", (req, res))

export { router as productRoute };


