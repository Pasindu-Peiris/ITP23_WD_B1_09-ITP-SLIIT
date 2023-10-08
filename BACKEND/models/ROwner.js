const mongoose = require('mongoose');

const ROwnerSchema = new mongoose.Schema({
    name: String,

});

const ROwnerModel = mongoose.model('ROwner', ROwnerSchema);

module.exports = ROwnerModel
