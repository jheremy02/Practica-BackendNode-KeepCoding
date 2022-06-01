
const mongoose = require('mongoose');
const path = require('path');

const advertisementSchema=mongoose.Schema({
    name:String,
    type_advertisement:String,
    price:Number,
    image:String,
    tags:Array
} , { 
    collection:"advertisements" //aqui va el nombre de la collecion
})




advertisementSchema.statics.list=function () {
    
    const query=Advertisement.find()
    console.log(query)
    return query.exec().then(data=>{
        data.forEach(row=>{
            row.image=row.image ? path.join('/images/advertisements/',row.image) : null
        })

        return data
    })
}
//creo el modelo con el esquema previamente definido

const Advertisement= mongoose.model("Advertisement",advertisementSchema)


//exporto el modelo
module.exports=Advertisement