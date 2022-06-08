const fs = require("fs");
const utils = {

    //funcion para construir los filtros que nuestro modelo pueda aceptar
    buildFilter (filters)  {


    let searchByPrice={};
    
    if (filters.price) {
        // rango ejemplo : 50-  de 50 a màs 
        if (filters.price.indexOf("-")===filters.price.length-1) {
            filters.price=filters.price.split("-")
            searchByPrice={ precio: { $gte:filters.price[0] } }
        } else if (filters.price.indexOf("-")==0) {
            filters.price=filters.price.split("-")
            searchByPrice={ precio: { $gte:filters.price[1] } }
        } else if (filters.price.split("-").length==2) {
            filters.price=filters.price.split("-")
            searchByPrice={ price: { $gte: filters.price[0], $lte: filters.price[1] } }
            
        } else if (filters.price.indexOf("-")===-1) {
            searchByPrice={ price: filters.price }
        } else {
            searchByPrice={}
        }
    }

    let searchByName={};

    if (filters.name) {
        filters.name=new RegExp('^'+filters.name,"i")
        searchByName={ name: { $regex: filters.name } }
    }
   
   
    let searchByTags={};
    if (filters.tags) {
        searchByTags={tags:{$in:filters.tags}}
    }

    let searchByType={}

    if (filters.type_advertisement) {
        searchByType={type_advertisement:filters.type_advertisement}
    
    }

    return {...searchByName,...searchByPrice,...searchByTags,...searchByType}

    },

    // funcion que comprueba si una peticion es hacia nuestra api
    isAPIRequest(req) {
  
        return req.originalUrl.startsWith("/api/")
      } ,

    //obtener item de un array al azar
    getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
    
        // get random item
        const item = arr[randomIndex];
    
        return item;
    },
    
    //obtener un numero al azar dentro de un rango establecido
    random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },


    //funcion para crear datos de prueba
    createAdvertisementsFake () {
        let advertisementData=[]

    for (let index = 0; index < 20; index++) {
        const generatedAdvertisement={ 
            name : faker.commerce.product(), 
            type_advertisement : this.getRandomItem(['sell','buy']),
            price : this.random(1000,5000) , 
            image :'laptop.jpg' ,
            tags : [this.getRandomItem(['work','lifestyle']),this.getRandomItem(['motor','mobile'])] }

        advertisementData.push(generatedAdvertisement)
    }

    let advertisementDataJson=JSON.stringify(advertisementData)
    fs.writeFileSync('initAdvertisements.json',advertisementDataJson)
    }

}

module.exports=utils