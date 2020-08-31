var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/perfect-place');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product',function(request,response){
	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
        
        product.save(function(err, savedProduct){
                if(err){
                    response.status(500).send({error:"Resource not found"});
                }else{
                    response.send(savedProduct);
                }
        });
});

app.get('/getProducts',function(request,response){ 
	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    Product.find({},function(err, products){
                   if(err){
          response.status(500).send({error:"No product found via getProducts" });
                    }else{
						response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                         response.send(products);
                    }
        });    
});

app.get('/getWishlist', function(request,response){
	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    WishList.find({}).populate({path: 'products', model: 'Product'}).exec(function(err,wishLists)
    {
      if(err){ response.status(500).send({error:"No Wishlist found" });}
        else { response.send(wishLists);}
    });                  
});


app.post('/wishlist',function(request,response){
	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	var wishList = new WishList();    
    wishList.save(function(err, newWishList){
       if(err){
           response.status(500).send({error: "Could not create wishList"});
       }else{
           response.send(newWishList);
       } 
    });
});

app.put('/wishlist/product/add', function(request,response)
{	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    Product.findOne({_id: request.body.productId}, function(err, product){
        if(err){
                response.status(500).send({error: "Could not create wishList"});
        } else {
                WishList.update({_id:request.body.wishListId}, {$addToSet:{ products: product._id}}, function(err,wishList){
                            if(err){
                                    response.status(500).send({error: "Could not create wishList"});
                            } else {
                                    response.send(wishList); 
                                    }
                });
        }
     });
});
        
app.listen(3005,function(){
   console.log("Perfect Place API started on port: 3005");
});