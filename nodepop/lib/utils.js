
const utils = {
    buildFilter (filters)  {


    let searchByPrice={};
    
    if (filters.price) {
        // rango ejemplo : 50-  de 50 a màs 
        if (filters.price.indexOf("-")===filters.price.length-1) {
            filters.price=filters.price.split("-")
            searchByPrice={ precio: { $gte:filter.price[0] } }
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

    isAPIRequest(req) {
  
        return req.originalUrl.startsWith("/api/")
      }

}

module.exports=utils