
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




advertisementSchema.statics.list=function (filter) {

    let searchByPrice={};
    
    if (filter.price) {
        // rango ejemplo : 50-  de 50 a màs 
        if (filter.price.indexOf("-")===filter.price.length-1) {
            filter.price=filter.price.split("-")
            searchByPrice={ precio: { $gte:filter.price[0] } }
        } else if (filter.price.indexOf("-")==0) {
            filter.price=filter.price.split("-")
            searchByPrice={ precio: { $gte:filter.price[1] } }
        } else if (filter.price.split("-").length==2) {
            filter.price=filter.price.split("-")
            searchByPrice={ price: { $gte: filter.price[0], $lte: filter.price[1] } }
            
        } else if (filter.price.indexOf("-")===-1) {
            searchByPrice={ price: filter.price }
        } else {
            searchByPrice={}
        }
    }

   
   
    let searchByTags={};
    if (filter.tags) {
        searchByTags={tags:{$in:filter.tags}}
    }

    let searchByType={}

    if (filter.type_advertisement) {
        searchByType={type_advertisement:filter.type_advertisement}
    }
    
    const query=Advertisement.find({...searchByTags,...searchByType,...searchByPrice})
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