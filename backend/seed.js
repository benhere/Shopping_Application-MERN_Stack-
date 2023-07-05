const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product')


const  products = 
[
    {
      name: "Drone",
      price: "3000",
      img: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      desc: "Some quick example text to build on the card title and make up the bulk of the card content",
    },
    {
      name: "Laptop",
      price: "35000",
      img: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      desc: "Some quick example text to build on the card title and make up the bulk of the card content",
    },
    {
      name: "DELL Laptop",
      price: "25000",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      desc: "Some quick example text to build on the card title and make up the bulk of the card content",
    },
    {
      name: "Jackets",
      price: "15000",
      img: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      desc: "Some quick example text to build on the card title and make up the bulk of the card content",
    },
    {
        name: "Drone",
        price: "11000",
        img: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card content",
      },
]

async function seedDB(){

    await Product.insertMany(products);
    console.log('DB Seeded');
}

module.exports = seedDB;



