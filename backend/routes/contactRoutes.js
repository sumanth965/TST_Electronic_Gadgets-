const express = require('express')
const submitMessage = require('../Controllers/contactCtrl')


const router = express.Router()

router.post('/contact', submitMessage)

module.exports = router;
