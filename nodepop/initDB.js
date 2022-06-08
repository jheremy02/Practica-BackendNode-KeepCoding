
// Connection to DB

const dbConnection=require("./lib/connectMongoose.js")

dbConnection.once("open",()=>{
    console.log("db opened")
})

//cargar modelos

const Advertisement =require("./models/Advertisement.js");
const { json } = require("express");

// cargar datos de inicio
const advertisementsData=require('./initAdvertisements.json')



dbConnection.once('open',()=>{
    main().catch(err=>console.log(err))
})


    
async function main() {
    //inicializar agentes

    await initAdvertisement()

    //desconectar la base datos

    dbConnection.close()

}


async function initAdvertisement(){

    //borrar los documentos de anuncios que haya en la db
    const deleted =await Advertisement.deleteMany()
    console.log(`Deleted ${deleted.deletedCount} advertisements`)

    //crear anuncios iniciales
    const advertisementsLoaded=await Advertisement.insertMany(advertisementsData)
    console.log(`Created ${advertisementsLoaded.length} advertisements`)
}