const companyController = require('../controller').company;
const customerController = require('../controller').customer;
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  
  app.get('/api/companieslists', companyController.list); // get all records
  app.post('/api/companycreate', companyController.create); // create new record
  app.get('/api/company/update/:compId', companyController.retrieveComp); //retrive single value
  app.put('/api/company-update/:compId', companyController.updateComp); // update record
  app.delete('/api/company/delelte/:compId', companyController.destroy); //delete record by id

  app.post('/api/charge/customer', customerController.create); // charge customer post
};