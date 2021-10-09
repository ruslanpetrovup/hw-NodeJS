const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const contacts = require("../bd/contacts.json");
const Joi = require("joi");

const checkContacts = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().min(2).max(200).required(),
    phone: Joi.string().min(2).max(200).required(),
})

router.put("/:contactId", express.json(), async (req, res, next) => {
    const body = req.body;
    const { error } = checkContacts.validate(body);
    if (error !== undefined) {
        res.status(400).json({
           "message": "missing fields"
        })
        return
    }
    const { contactId } = req.params;
    const checkContact = contacts.find(num => num.id === contactId);
    if (!checkContact) {
        res.status(404).json({
            "message": "Not found"
        })
        return
    }
    const newContact = contacts.map(num => {
        if (num.id === contactId) {
            return num = { "id": contactId, ...body };
        }
        return num
    });
    const getCon = newContact.find(num => num.id === contactId);
    const respons = JSON.stringify(newContact);
    await fs.writeFile("./bd/contacts.json", respons);
    
    res.status(200).json(getCon);
})
module.exports = router