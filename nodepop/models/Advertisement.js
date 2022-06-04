
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

// Tags permitidos

advertisementSchema.statics.allowedTags=function () {
    return ['work','lifestyle','motor','mobile']
}


advertisementSchema.statics.list=function (filter,pagination) {

    

    const query=Advertisement.find(filter)
    query.skip(pagination.start)
    query.limit(pagination.limit)
    query.sort(pagination.sort)


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