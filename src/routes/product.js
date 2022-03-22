import express from "express";
import { Product } from '../database';
import { session_check, save_last_site_visited } from "../middleware";

const router = express.Router()

router.get('/', async (req, res, next) => {
    // ?hash={hash}
    if (!req.query.hash) return next("No product");

    let product = new Product();

    let [fetched_product, product_error] = await product.fetch_product(req.query.hash);
    let [fetched_reviews, review_error] = await product.fetch_product_reviews(req.query.hash);
    
    if (product_error) return next(product_error);
    else if (review_error) return next(review_error);

    res.render('product', {user: req.session.client_data, product: fetched_product,  reviews: fetched_reviews})
})

router.post('/post_product', session_check, async (req, res) => {
    let product = new Product();
    console.log(req.body)
    await product.post_product(req.body, req.session.client_data.id);
    res.redirect('/p/p_product')
})

export { router as productRoute };


