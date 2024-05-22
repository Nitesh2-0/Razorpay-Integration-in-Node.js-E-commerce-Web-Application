# Razorpay Integration in Node.js E-commerce Web Application

Welcome to the Razorpay integration in a Node.js E-commerce Web Application. This project demonstrates how to implement Razorpay for online payments in a modern e-commerce platform using various technologies. Follow this README to understand the setup and features of this application.

![E-commerce UI Screenshot](./public/Screenshot%202024-05-22%20132126.png)

[Watch the Demo Video](./public//Home%20-%20Brave%202024-05-22%2013-41-27.mp4)

## Tech Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom user interfaces.
- **EJS (Embedded JavaScript Templates)**: Simple templating language that lets you generate HTML markup with plain JavaScript.
- **AJAX (Asynchronous JavaScript and XML)**: A set of web development techniques using many web technologies on the client side to create asynchronous web applications.
- **Razorpay**: Payment gateway for accepting online payments in India.

## Features

- **Modern UI**: Users can interact with a sleek and responsive user interface designed with Tailwind CSS.
- **Product Purchase**: Users can browse and select products to purchase.
- **Online Payments**: Users can make payments securely online using Razorpay.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```sh
    RAZORPAY_KEY_ID=your_key_id
    RAZORPAY_KEY_SECRET=your_key_secret
    ```

4. **Start the server**:
    ```sh
    npm start
    ```

## Usage

1. **Navigate to the application**:
    Open your browser and go to `http://localhost:3000`.

2. **Browse products**:
    Explore the product listings and select items to add to your cart.

3. **Proceed to checkout**:
    Go to your cart and proceed to the checkout page.

4. **Make a payment**:
    Fill in the necessary details and use the Razorpay payment gateway to complete your purchase.

## Code Overview

### Setting up Razorpay

1. **Install Razorpay package**:
    ```sh
    npm install razorpay
    ```

2. **Integrate Razorpay in your server**:
    ```javascript
    const Razorpay = require('razorpay');

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
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
    ```

3. **Handle payment verification**:
    ```javascript
    app.post('/verify/payment', (req, res) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest === razorpay_signature) {
            res.json({ status: 'success' });
        } else {
            res.json({ status: 'failure' });
        }
    });
    ```

### Frontend Integration

1. **Include Razorpay script**:
    ```html
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    ```

2. **Handle payment button click**:
    ```html
   $(document).ready(() => {
    $('.pay-form').submit(function (e) {
      e.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        url: '/createOrder',
        type: 'POST',
        data: formData,
        success: function (res) {
          if (res.success) {
            var options = {
              "key": res.key_id,
              "amount": res.amount,
              "currency": "INR",
              "name": res.product_name,
              "image": "https://plus.unsplash.com/premium_photo-1678187782578-70b5a348f502?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "order_id": res.order_id,
              "handler": function (response) {
                alert('Payment Successful');
              },
              "prefill": {
                "contact": res.contact,
                "name": res.name,
                "email": res.email
              },
              "notes": {
                "description": res.description
              },
              "theme": {
                "color": "#2300a3"
              }
            };
            var razorpayObject = new Razorpay(options);
            razorpayObject.on('payment.failed', function (response) {
              alert('Payment Failed');
            });
            razorpayObject.open();
          } else {
            alert(res.msg);
          }
        }
      });
    });
  });
    ```


## Contact Us

If you have any questions or need further assistance, feel free to contact us on WhatsApp:

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact%20Us-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/9155061725)

---

Enjoy a seamless and secure online shopping experience with our Node.js E-commerce Web Application integrated with Razorpay.
