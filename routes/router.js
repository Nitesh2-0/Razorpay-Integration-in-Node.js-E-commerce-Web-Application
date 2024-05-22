const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();


router.get('/', (req, res) => {
  try {
    res.render('products');
  } catch (error) {
    console.log(error.message);
    res.redirect('*');
  }
});

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

router.post('/createOrder', (req, res) => {
  try {
    const amount = req.body.amount * 100;
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };
    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: 'Order Created',
          order_id: order.id,
          amount: amount,
          key_id: process.env.RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: '9155061725',
          name: 'Nitesh Kumar',
          email: 'niteshkr16062004@gmail.com'
        });
      } else {
        res.status(400).send({ success: false, msg: 'Something went wrong' });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: 'Server Error' });
  }
});

router.get('*', (req, res) => {
  res.send('Page Not Found');
});

module.exports = router;
