var db = require('../config/db');
const keyPublishable = 'pk_test_HxxhTNdpMipOAsqzZw2mXJol';
const keySecret = 'sk_test_vh4AudxzgLj9hwOKfH62cILt';
const stripe = require("stripe")(keySecret);
module.exports = {
  //create new records in company
  create(req, res) {
    var obj = req.body;
    console.log("resquest object ::: ", obj);
    let amount = 500;
    const token = req.body.token;
    console.log("token :: ", token);
    stripe.charges.create({
        amount: 500,
        description: "Sample Charge",
        currency: "usd",
        source: token
      }, function(err, charge){
          if(err){
            console.log("charged Error :: ", err);
            res.send({"error":err});
          }else{
            console.log("charged called :: ", charge);
            res.send({"charge result":charge});
          }
        
      });
      
      
    // stripe.customers.create({
    //    email: 'ramesh.prajapati@bacancytechnology.com',
    //   source: req.body.token
    // })
    // .then(customer =>
    //   stripe.charges.create({
    //     amount,
    //     description: "Sample Charge",
    //        currency: "usd",
    //        customer: customer.id
    //   }))
    // .then(charge => res.send("charge.pug"));

  }

}