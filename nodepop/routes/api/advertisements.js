const express=require("express")
const createHttpError = require("http-errors")
const router=express.Router()
const  {buildFilter}= require('../../lib/utils.js')
const Advertisement=require("../../models/Advertisement.js")
const { body, validationResult } = require('express-validator');


//GET obtener anuncios
router.get("/",async (req,res,next)=>{

    const start=parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 100
    const sort = req.query.sort || '_id'
    const pagination={start,limit,sort}

    const filters=req.query
    const filterBuilt=buildFilter(filters)
    const advertisements= await Advertisement.list(filterBuilt,pagination)
    res.json(advertisements)
})

router.get('/tags',(req,res)=>{
    
    const tags=["work","lifestyle","mobile","motor"]
    res.json({result:tags})

})

// GET obtener un anuncio

router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const advertisement=Advertisement.findOne({id:id})
    advertisement.then((data)=>{res.json(data)})
})


//POST : crear anuncios

router.post("/",[body('tags').custom(tags => {
    if (!Array.isArray(tags)) {
        tags=[tags]
    }
    const allowed = Advertisement.allowedTags();
    return tags.every(tag => allowed.includes(tag)) 
  }).withMessage(`allowed tags ${Advertisement.allowedTags()}`),
  body('type_advertisement').custom(type_advertisement=>{
    type_advertisement=[type_advertisement]
    const allowed = ['sell','buy'];
    return type_advertisement.every(type=>allowed.includes(type))
  }).withMessage(`allowed type advertisements: sell , buy`),
  body('price').isNumeric().withMessage('must be numeric'),
],async (req,res,next)=>{

    
    try {
        validationResult(req).throw();
        const advertisementData=req.body;

    
        //instancio un modelo de anuncio
        const advertisement=new Advertisement(advertisementData)
    
        const advertisementCreated=await advertisement.save()
        res.status(201).json({data:advertisementCreated})

    } catch (err) {
        
        next(err)
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

// GET tags 



module.exports = router