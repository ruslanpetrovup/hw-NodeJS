const express = require("express");
const contacts = require("../bd/contacts.json");

const router = express.Router();


router.get("/:contactId", (req, res, next) => {
    const { contactId } = req.params;
    const contact = contacts.find(num => num.id === contactId);
    if (!contact) {
        res.status(404).json({
            "message": "Not found"
        })
        res.end
    }
    res.json(contact);
})
module.exports = router