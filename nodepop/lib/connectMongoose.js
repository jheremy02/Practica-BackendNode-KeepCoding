const mongoose=require("mongoose");

mongoose.connection.on("error",err=>{
    console.log("Error de conexion",err)
    process.exit(1);

})

mongoose.connection.once("open",()=>{
    console.log("Conectado a Mongodb en la BD",mongoose.connection.name ,mongoose.connection.port)
})

mongoose.connect("mongodb://localhost:27017/nodepop-db")

module.exports=mongoose.connection;