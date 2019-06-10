var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    image:String
});

mongoose.model('User', UserSchema);