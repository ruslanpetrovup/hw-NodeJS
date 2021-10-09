const express = require("express");
const contacts = require('../bd/contacts.json')

const router = express.Router();

router.get("/", (req, res, next) => {
    res.json(contacts)
})

module.exports = router
