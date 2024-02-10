const mongoose=require("mongoose")

const {Schema} =mongoose

const DiscussionSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    thread:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('discussions', DiscussionSchema)