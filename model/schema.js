const mongoose = require('mongoose')

const covidschema = new mongoose.Schema({
    state:{
        type:String,
        required:true
    },
    infected: {
        type:Number,
    },
    recovered: {
        type:Number,
    },
    death: {
        type:Number,
    },
})

const covidmodel= mongoose.model('covid',covidschema)
module.exports=covidmodel