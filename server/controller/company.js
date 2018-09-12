var db = require('../config/db');
module.exports = {
  // get all records include child tables data
  list(req, res) {
    db.query('select * from company', function(err, result) {
        if (err) throw err;
        res.json(result);
      });
  },
  //create new records in company
  create(req, res) {
    var obj = req.body;
    
    if(Object.keys(obj).length > 0){
        var post  = {name:req.body.name, email:req.body.email};
        db.query('INSERT INTO company SET ?', post, function(err, result) {
          if (err) throw err;
          res.json({'status':'true', 'message':'Company created successfully', 'data' : result});
        });  
    }else{
      var error = {
        "data" : null,
        "status" : 404,
        "message" : "Error. Payload Getting Blank."
      }
      res.json({"data" : error});
    }
    
  },

   //update records in company
   retrieveComp(req, res, next) {
    var compid = req.params.compId;
    
    //db.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
    db.query('SELECT * FROM company WHERE id ='+compid, function(err, rows, fields) {
      if (err){
        throw err;
      }else{
        if (rows.length <= 0) {
          req.send({'error' :'company not found with id = ' + req.params.id});
          res.redirect('/companieslists')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            res.send({
                title: 'Edit Company', 
                //data: rows[0],
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email                    
            });
        }
      }

    });
  },

  //update records in company
  updateComp(req, res, next) {
    var compid = req.params.compId;
    var compData  = {name:req.body.name, email:req.body.email};
    db.query('UPDATE company SET ?  WHERE id ='+compid, compData, function(err, result) {
      if (err){
        throw err;
      }else{
        res.send({'success':'Data updated successfully!'});
      }

    });
  },

//delete records in company
destroy(req, res, next) {
    var compid = req.params.compId;
    db.query('DELETE FROM company WHERE id ='+compid, function(err, result) {
      if (err){
        throw err;
      }else{
        res.send({'delete':'Deleted successfully!'});
      }

    });
  } 
};


//http://blog.chapagain.com.np/node-js-express-mysql-simple-add-edit-delete-view-crud/
//res.render
//res.send
//res.json
//res.redirect