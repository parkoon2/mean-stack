// Model을 만드는 부분

const mongoose = require('mongoose');

// ** Collection 스키마 Setting ** //
const contactSchema = mongoose.Schema({
    name: String,
    phone: String
});

module.exports = mongoose.model('Contact', contactSchema); // Contact --> MongoDB에는 contacts라는 collection으로 저장된다.