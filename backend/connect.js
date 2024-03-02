const mongoose = require("mongoose")

function connectedToMonogDB(url){
    return mongoose.connect(url)
}

module.exports = {connectedToMonogDB}