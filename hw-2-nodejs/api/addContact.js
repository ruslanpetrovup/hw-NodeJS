const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const contacts = require("../bd/contacts.json");
const { v4: uuidv4 } = require('uuid');
const Joi = require("joi");

const checkContact = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().min(2).max(200).required(),
    phone: Joi.string().min(2).max(200).required(),
})


router.post("/", express.json(), async ({ body }, res, next) => {
    const { error } = checkContact.validate(body);
    if (error !== undefined) {
        res.status(400).json({
            "message": "missing required name field"
        })
        return
    }
    const newContact = { id: uuidv4(), ...body }
    contacts.push(newContact);
    const respons = JSON.stringify(contacts);
    await fs.writeFile("./bd/contacts.json", respons);
    
    res.status(201).json(newContact);
})
module.exports = router