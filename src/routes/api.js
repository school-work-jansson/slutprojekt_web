import express from "express";

import { Product, User } from "../database";
import { session_check } from "../middleware";

const router = express.Router()

// https://www.w3schools.com/nodejs/nodejs_email.asp

router.get('/hello_world', (req, res) => { 
    res.send({status: 200});
})
  
router.post('/update_profile', session_check, (req, res) => {
    let user_data = req.body;

    // om användaren inte skickar med något användarnamn
    req.session.client_data.username = user_data.username;
    req.session.client_data.email = user_data.email;

    console.log(user_data);
    
    (async () => {
        let user = new User(req.session.client_data.id);
        // Eftersom att jag måste lagra refresh_token så "initlizar" jag användaren
        // sedan uppdaterar jag databasen med ny data ifall användaren vill byta namn eller epost
        let result = await user.update(req.session.client_data);
        
        console.log(result);

    })();

    res.redirect("/u/profile");
    
})

router.delete('/remove_user', session_check, (req, res) => {
    console.log("User requested account deletion");
    res.redirect('index');
})



router.post('/search', async (req, res) => {
    try {

        let product = new Product();
        
        let result = await product.search(req.body.seach_query);

        return res.send(result);    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
    
    
})

router.get("/getDarkmodeSetting", (req, res) => {
    if (req.session.user_darkmode) {
        res.status(202).send(req.session.user_darkmode);
    }
    else {
        req.session.user_darkmode = false;

        res.status(202).send(req.session.user_darkmode);
    }

    
})


// TODO: möjligen ändra så att den sparas i någon column i databasen istället för i session
// så att man inte blir flashad så fort mitt i natten ifall servern startar om eller man inte varit inne på ett tag
router.post("/toggleDarkmodeSetting", (req, res) => {
    // DEBUG
    // console.log("\nSet darkmode flag;", 
    //             "\nGot:", req.session.user_darkmode, 
    //             "\ntype:", typeof(req.session.user_darkmode), 
    //             "\nNeeds conversion?:", (typeof(req.session.user_darkmode) == "string") ? " yes" : "no",
    //             "\nupdated user settings to ->", req.session.user_darkmode, "(", !req.session.user_darkmode, ")"
    //             )    
    
    // Sätter darkmode cookien till omvänt värde
    try {
        req.session.user_darkmode = !req.session.user_darkmode
        res.sendStatus(202); // returnerar 202 "accepted"    
    } catch (error) {
        res.status(500).send(null);
    }
    
})


router.post("/post_review", session_check, async (req, res) => {
    console.log("review data: ", req.body)
    
    const pr = new Product()

    res = await pr.post_review(req.body)

    console.log(res)

});

router.post('/pagnition_search', async (req, res) => {
    // console.log(req.body)

    switch (req.body.type) {
        case "product":
                try {
                
                    let product = new Product();
                    let result = await product.search(req.body.search_query, req.body.low_lim, req.body.high_lim);
                    
                    console.log("result from search with pagnition" , req.body.low_lim, req.body.high_lim )
                    result.forEach(result => {
                        console.log(result.hash)
                    });


                    return res.send(result);        
                } catch (error) {
                    console.log(error);
                    return res.send(error);
                }
                
            break;
        
        case "review":
            try {
                let user = new User(req.session.client_data.id)
                let user_reviews = await user.get_user_reviews(req.body.low_lim, req.body.high_lim)

                return res.send(user_reviews)
            } catch (error) {
                console.log(error);
                return res.send(error);
            }
            break;

        case "product_review":
            try {
                let product = new Product();
                let [fetched_reviews, review_error] = await product.fetch_product_reviews(req.body.search_query, req.body.low_lim, req.body.high_lim);
                res.send({reviews: fetched_reviews});
                
            } catch (error) {
                console.log(error);
                return res.send(error);
            }
            break;
        
        
        default:
            return res.status(500).send("Pagnation error")
            break;
    }    

    
});

// Ifall man skulle vilja se rådatan så kan man lägga till /raw för att endast se objektet och inte någon html
router.get('/p_raw', async (req, res) => {
    
    // Returnera ett tomt objekt ifall det inte specifieras en hash
    if (!req.query.hash) return res.status(404).send({});

    let product = new Product();

    let [fetched_product, product_error] = await product.fetch_product(req.query.hash);
    let [fetched_reviews, review_error] = await product.fetch_product_reviews(req.query.hash);
    
    if (product_error) return next(product_error);
    else if (review_error) return next(review_error);
    
    // console.log({product: fetched_product,  reviews: fetched_reviews});
    res.send({product: fetched_product,  reviews: fetched_reviews})
});


router.get('/get_user_reviews', async (req, res) => {
    try {
        let user = new User(req.session.client_data.id)
        let user_reviews = await user.get_user_reviews()
    
        res.status(202).send(user_reviews)    
    } catch (error) {
        console.log(error);
        return next(error);
    }
    

})

export {router as apiRoute}