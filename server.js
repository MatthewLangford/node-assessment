let express = require('express');
let bodyParser = require('body-parser');
let userCtrl = require('./userCtrl');

let app = express();
app.use(bodyParser.json());


app.get('/api/users', (req, res, next) =>{

   if(!req.query){
       res.status(200).json(userCtrl.readAll());
   }
    switch (req.query){
        case 'favorites':
            res.status(200).json(userCtrl.getUsersByFavorite(req.query.favorites));
            break;
        case 'age':
            res.status(200).json(userCtrl.getUsersByAgeLimit(req.query.age));
            break;
        case 'last_name':
            res.status(200).json(userCtrl.findUserByQuery(req.query.last_name));
            break;
        case 'email':
            res.status(200).json(userCtrl.findUserByQuery(req.query.email));
            break;
        default:
            res.status(200).json(userCtrl.readAll());
    }
});

app.get('/api/users/:id', (req, res, next) =>{
   if(!req.params.id){
       res.status(404).send('not found');
   }else{
       res.status(200).json(userCtrl.findUserById(req.params.id));
   }
});

app.get('/api/admins', (req, res, next) =>{
    res.status(200).json(userCtrl.getAdmins());
});
app.get('/api/nonadmins', (req, res, next) =>{
    res.status(200).json(userCtrl.getNonAdmins());
});

app.put('/api/users/:id', (req, res, next) =>{
   res.status(200).json(userCtrl.updateUser(req.params.id, req.body))
});

app.post('/api/users', (req, res, next) =>{
    res.status(200).json(userCtrl.createUser(req.body))
});

app.delete('/api/users/:id', (req, res, next) =>{
   res.status(200).json(userCtrl.removeUser(req.params.id))
});






// app.listen(3000);

module.exports = app;