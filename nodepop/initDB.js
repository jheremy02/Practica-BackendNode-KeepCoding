
// Connection to DB

const dbConnection=require("./lib/connectMongoose.js")

const {getRandomItem,random}=require('./lib/utils.js')

// Load faker
const  { faker } = require('@faker-js/faker');



dbConnection.once("open",()=>{
    console.log("db opened")
})

//cargar modelos

const Advertisement =require("./models/Advertisement.js")

// cargar datos de inicio




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
    
    let advertisementData=[]

    for (let index = 0; index < 20; index++) {
        const generatedAdvertisement={ 
            name : faker.commerce.product(), 
            type_advertisement : getRandomItem(['sell','buy']),
            price : random(1000,5000) , 
            image :'laptop.jpg' ,
            tags : [getRandomItem(['work','lifestyle']),getRandomItem(['motor','mobile'])] }

        advertisementData.push(generatedAdvertisement)
    }

    const advertisements=await Advertisement.insertMany(advertisementData)
    console.log(`Created ${advertisements.length} advertisements`)
}