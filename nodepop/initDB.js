
// Connection to DB

const dbConnection=require("./lib/connectMongoose.js")

dbConnection.once("open",()=>{
    console.log("db opened")
})

//cargar modelos

const Advertisement =require("./models/Advertisement.js")

// cargar datos de inicio
const advertisementData=require("./initAnnoucement.json")



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

    const advertisements=await Advertisement.insertMany(advertisementData)
    console.log(`Created ${advertisements.length} advertisements`)
}