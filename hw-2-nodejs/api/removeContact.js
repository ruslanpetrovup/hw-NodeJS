const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const contacts = require("../bd/contacts.json");


router.delete("/:contactId", async(req, res, next) => {
    const { contactId } = req.params;
    const checkContact = contacts.find(num => num.id === contactId);
    if (!checkContact) {
        res.status(404).json({
            "message": "Not found"
        })
        return
    }
    const delCon = contacts.filter(num => contactId !== num.id);
    const respons = JSON.stringify(delCon);
    await fs.writeFile("./bd/contacts.json", respons);
    
    res.status(200).json({"message": "contact deleted"});
})
module.exports = router