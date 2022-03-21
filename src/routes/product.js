import express from "express";
import { Product } from '../database';
import { session_check, save_last_site_visited } from "../middleware";

const router = express.Router()

router.get('/:hash', async (req, res, next) => {
    
    if (!req.params.hash) return next("No product");

    let product = new Product();
    let [fetched_product, fetched_reviews, error] = await product.fetch(req.params.hash);
    
    if (error) return next(error);

    // console.log({product: fetched_product,  reviews: fetched_reviews});
    res.render('product', {user: req.session.client_data, product: fetched_product,  reviews: fetched_reviews})
    // res.render('product', {product: fetched_product, reviews: fetched_reviews})
})

// Ifall man skulle vilja se rådatan så kan man lägga till /raw för att endast se objektet och inte någon html
router.get('/:hash/raw', async (req, res) => {
    
    if (!req.params.hash) return next("No product");

    let product = new Product();
    let [fetched_product, fetched_reviews, error] = await product.fetch(req.params.hash);
    
    if (error != null) return next(error);
    
    // console.log({product: fetched_product,  reviews: fetched_reviews});
    res.send({user: req.session.client_data, product: fetched_product,  reviews: fetched_reviews})
    // res.render('product', {product: fetched_product, reviews: fetched_reviews})
})

router.post('/post_product', session_check, async (req, res) => {
    let product = new Product();
    console.log(req.body)
    await product.post_product(req.body, req.session.client_data.id);
    res.redirect('/p/p_product')
})

export { router as productRoute };


