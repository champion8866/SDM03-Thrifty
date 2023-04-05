const express = require('express');
const router = express.Router();

// 引入 StoreInfo model
const StoreInfo = require('../model/store_info');

router.get('/', async function (req, res) {
    const { longitude, latitude } = req.query;
  
    try {
      const store_exist = await StoreInfo.find({
          location: {
              $near: {
                  $geometry: { type: "Point",  coordinates: [ longitude, latitude ] },
                  $minDistance: 0, // meters
                  $maxDistance: 1000 // meters
              }
          }
        })
      
        if(!store_exist) {
          res.status(400).send({ message: "使用者周圍地區無商家" });
        } else {
          res.status(200).send({ message: store_exist })
        }
    } catch(error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error!" });
    }
    
  });

module.exports = router;