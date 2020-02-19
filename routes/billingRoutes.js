const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const auth = require('../middlewares/Auth');

module.exports = app => {
  app.post('/api/stripe', auth, async (req, res) => {
    let user = await User.findOne({
      email: req.user
    });

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/cards/collecting/web#create-token
    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: `Charge for ${req.user}`
    });

    let nbalance = user.balance + 500;

    let user1 = await User.findOneAndUpdate(
      { email: req.user },
      { balance: nbalance },
      { new: true }
    );
    // console.log(user1);
    res.send(user1);
  });
};
