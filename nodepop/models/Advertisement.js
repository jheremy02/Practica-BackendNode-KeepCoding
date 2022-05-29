
const mongoose = require('mongoose');

const advertisementSchema=mongoose.Schema({
    name:String,
    type_advertisement:String,
    price:Number,
    image:String,
    tags:Array
} , { 
    collection:"advertisements" //aqui va el nombre de la collecion
})

//creo el modelo con el esquema previamente definido

const Advertisement= mongoose.model("Advertisement",advertisementSchema)

//exporto el modelo
module.exports=Advertisement