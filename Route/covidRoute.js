const covidmodel = require('../model/schema')
const express = require('express');
const data = require('../data/data')
const router = express.Router()

router.post("/postdata", (req, res) => {

    data.map(ele=>{
        const cityData = new covidmodel(ele)
        cityData.save()
        .then(result=>console.log(`data of state/ut  ${i} : ${data[i].state} is saved successfully in db`))
        .catch(err=>console.log(err))
    })

})

router.get("/totalRecovered",async(req,res)=>{
    let data = await covidmodel.find()
    let total=0
    data.map(ele=>{
     total+=ele.recovered
    })
    res.json({data: {_id: "total", recovered:total}})

    
})

router.get("/totalActive",async(req,res)=>{
    let data = await covidmodel.find()
    let totalRecovered = 0;
    let totalActive = 0;
    for(let i=0;i<data.length;i++){
        totalRecovered +=data[i].recovered
        totalActive +=data[i].infected
    }
    res.json({data: {_id: "total", active:totalActive-totalRecovered}})
})

router.get("/totalDeath",async(req,res)=>{
    let data = await covidmodel.find()
    let totalDeath = 0;
    for(let i=0;i<data.length;i++){
        totalDeath +=data[i].death
    }
    res.json({data: {_id:"total", death:totalDeath}})
    

})
router.get("/hotspotStates",async(req,res)=>{
    let hotspotVal = 0.1
    let hotSpotArr = []
    let data = await covidmodel.find()
    for(let i=0;i<data.length;i++){
        let hotspotCoefficient = ((data[i].infected - data[i].recovered)/data[i].infected).toFixed(5)
        if(hotspotCoefficient > hotspotVal){
            hotSpotArr.push({
                state:data[i].state,
                rate:hotspotCoefficient
            })
        }
    }
    res.json({data: hotSpotArr})
})
router.get("/healthyStates",async(req,res)=>{
    let safeCityArr = []
    const moralityVal=0.005
    let data = await covidmodel.find()
    for(let i=0;i<data.length;i++){
        let moralityCoeffient = (data[i].death/data[i].infected).toFixed(5)
        if(moralityCoeffient<moralityVal){
            safeCityArr.push({
                state:data[i].state,
                morality:moralityCoeffient
            })
           

        }
    }
    res.json({data:safeCityArr})
})

module.exports = router