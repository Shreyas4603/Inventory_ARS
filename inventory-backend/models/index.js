const mongoose = require("mongoose");
const uri = "mongodb+srv://altshreyas7:shreyas04@cluster0.jqprqnd.mongodb.net/ARS_Enterprices?retryWrites=true&w=majority";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };