const express = require('express')
const router = express.Router()
const db = require('../../model/db');

/*-----------------------------------------------*/
router.get('/get-stores', async function (req, res) {
  const { longitude, latitude } = req.query;
  const store_exist = await db.StoreModel.find()

  if(!store_exist) {
    res.status(400).send({ message: "使用者周圍地區無商家" });
  } else {
    console.log(store_exist)
  }
});

router.get('/get-foods', async function (req, res) {
//   const { store_id } = req.query; TODO
  const store_id = "000014"
  const store_exist = await db.StoreModel.findOne({ family_id: store_id })

  if(!store_exist) {
    res.status(400).send({ message: "查無店家資訊" });
  } else {
    if (store_exist.stocks.length == 0) {
        res.status(200).send({ message: "店家目前無食物" });
    }
    else {
        var foods = Array()
        for (const stock of store_exist.stocks) {
            const food_id = stock.family_pid
            const quantity = stock.quantity

            const food_exist = await db.FoodModel.findOne({ family_pid: food_id })
            if(!food_exist) {
                res.status(400).send({ message: "查無食物資訊" });
            } else {
                foods.push({ food: food_exist, quantity: quantity });
            }
        }
        res.status(200).send({ message: foods })
    }
  }
});
/*-----------------------------------------------*/

module.exports = router;