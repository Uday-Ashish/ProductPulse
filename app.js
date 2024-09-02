const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const { contentType } = require('express/lib/response');
const Review = require('./models/review');
require('dotenv').config()

const app = express()
const url2 = process.env.DB_CONNECTION_STRING;

const PORT = process.env.PORT || 3000;

mongoose.connect(url2)
    .then((result) => {
        console.log('db connected');
        app.listen(PORT)
    })
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended :true}));



app.post('/submitReview' ,(req,res) =>{
    console.log('Review Submted!!')

    const review = new Review(req.body);

    review.save()
        .then(result => {
            console.log(result);
            res.redirect('reviews')
        })
        .catch(err => {
            res.status(500).send(err)
        })

})


app.get('/', (req,res) => {
    // console.log('request made');
    res.render('index', {title : 'Home'});
});



app.get('/review', (req,res) => {

    let id = req.query.id;
    Review.findById(id)
        .then( result =>{
            res.render('singlereview',{title:'single', review : result})
        })
        .catch(err => {
            console.log(err);
        })

});

app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
});


app.get('/createreview',(req, res)=> {
    res.render('createReview', {title : 'Create Review'})
})

app.get('/reviews', (req,res) => {

    Review.find().sort( { createdAt : -1})
        .then(result => {
            res.render('reviews', {title : 'All Reviews', reviews : result});
        })
        .catch(err => {
            console.log(err);
        })    
})


app.use((req,res)=>{
    res.status(404).render('404' ,{title: 'page doesnt exist'});
})