const express=require("express")
const createHttpError = require("http-errors")
const router=express.Router()

const Advertisement=require("../../models/Advertisement.js")


//GET obtener anuncios
router.get("/",async (req,res)=>{
    const advertisements= await Advertisement.find()
    res.json(advertisements)
})


// GET obtener un anuncio

router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const advertisement=Advertisement.findOne({id:id})
    advertisement.then((data)=>{res.json(data)})
})


//POST : crear anuncios

router.post("/",async (req,res,next)=>{

    try {
        
        const advertisementData=req.body;
        advertisementData.tags=advertisementData.tags.split(",")
    
        //instancio un modelo de anuncio
        const advertisement=new Advertisement(advertisementData)
    
        const advertisementCreated=await advertisement.save()
        res.status(201).json({data:advertisementCreated})

    } catch (error) {
        next(error)
    }
    
})

//PUT : editar un anuncio

router.put("/:id",async (req,res,next)=>{

    try {
        const advertisementId=req.params.id
        const advertisementNewData=req.body;

        //buscar y comprobar si existe el documento
        const advertisementFound= await Advertisement.findOne({_id:advertisementId})

        if (!advertisementFound) {
            next(createHttpError(404))
            return;
        }

        //actualizar documento
        const updatedAdvertisement =await Advertisement.updateOne({_id:advertisementId},{advertisementFound,...advertisementNewData},{new:true})

        //obtener el doumento actualizado
        const advertisementUpdated = await Advertisement.findOne({_id:advertisementId})
        res.json(advertisementUpdated)

    } catch (error) {
        next(error)
    }

})


//DELETE : borrar documento

router.delete("/:id",async (req,res,next)=>{
    try {
        const advertisementId=req.params.id
        //buscar y comprobar si existe el documento
        const advertisementFound= await Advertisement.findOne({_id:advertisementId})

        if (!advertisementFound) {
            next(createHttpError(404))
            return;
        }

        //Eliminar documento
        const advertisementDeleted=await Advertisement.deleteOne({_id:advertisementId})

        res.json(advertisementDeleted)

    } catch (error) {
        next(error)
    }
})


module.exports = router