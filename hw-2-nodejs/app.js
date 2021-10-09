const express = require("express");
const fs = require("fs").promises
const contacts = require("./bd/contacts.json");
const cors = require("cors");
const app = express();
const {getContacts,getIdContact,addContacts,removeContact,updateContact } = require("./api/index")

app.use(cors());
app.use("/api/contacts", getContacts);
app.use("/api/contact", getIdContact);
app.use("/api/contacts", addContacts);
app.use("/api/contacts", removeContact);
app.use("/api/contacts", updateContact);



app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found"
    })
})
app.listen(3000, () => console.log("server run"));