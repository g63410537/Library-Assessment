const mongoose =  require( "mongoose");

const BookCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        unique:true
    },
    books:[{
            type:mongoose.Types.ObjectId,
            ref:"Book"
        }]
},
{
    timestamps:true
})

const BookCategory = mongoose.model("BookCategory", BookCategorySchema)
module.exports = BookCategory