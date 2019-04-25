/*
Import
*/
    // Mongoose
    const mongoose = require('mongoose')
    const { Schema } = mongoose;
//


/*
Mongoose schema definition
Declare each property and type needed for the schema
*/
    const mySchema = new Schema({
        email: String,
        password: String,
        username: String
    })
//


/*
Export
Create a const that use the Mongoose schema to declare an objet model
*/
    const MyModel = mongoose.model('user', mySchema);
    module.exports = MyModel;
//