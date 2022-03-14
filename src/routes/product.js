import express from "express";
const router = express.Router()
import { Product } from '../database';
import { session_check } from "../middleware";

/* PÅ något sätt ska den ha ett unikt "id" för att kunna separera två olika typer av samma produkt */
// router.get("/:name", (req, res) => {
//     // Check database for name
//     fetched_product, fetched_reviews, error = get_product(req.params.name)
//     // If result from database check return product
    
//         // Get product info if name exists
//         // return to user
//         res.render('product', {product: fetched_product, reviews: fetched_reviews, error: null})
// })


router.get('/:hash', async (req, res, next) => {
    
    if (!req.params.hash) return next();

    let product = new Product();
    let [fetched_product, fetched_reviews, error] = await product.fetch(req.params.hash);
    
    if (error != null) return res.send(error);
    // console.log({product: fetched_product,  reviews: fetched_reviews});
    res.render('product', {product: fetched_product,  reviews: fetched_reviews})
    // res.render('product', {product: fetched_product, reviews: fetched_reviews})
})

router.get('/:hash/raw', async (req, res) => {
    
    if (!req.params.hash) return next();

    let product = new Product();
    let [fetched_product, fetched_reviews, error] = await product.fetch(req.params.hash);
    
    if (error != null) return res.send(error);
    
    // console.log({product: fetched_product,  reviews: fetched_reviews});
    res.send({product: fetched_product,  reviews: fetched_reviews})
    // res.render('product', {product: fetched_product, reviews: fetched_reviews})
})


router.get('/p_product', session_check, (req, res) => {
    res.render('product')
})

router.get('/p_review', (req, res) => {
    res.render('review')
})



router.post('/post_product', session_check, async (req, res) => {
    let product = new Product();
    console.log(req.body)
    await product.post_product(req.body, req.session.client_data.id);
    res.redirect('/p/p_product')
})


// router.get("/get_products", (req, res))

export { router as productRoute };


