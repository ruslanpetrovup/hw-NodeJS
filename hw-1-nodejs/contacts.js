const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json");


const listContacts = async () =>{
    const request = await fs.readFile(contactsPath, "utf8");
    console.log(request)
}

const getContactById = async (contactId) => {
    const request = await fs.readFile(contactsPath, "utf8");
    const respons = await JSON.parse(request);
  respons.forEach(num => {
    if (num.id === Number(contactId)) {
      console.log(num)
    }
    })
}

const removeContact = async (contactId) => {
  const request = await fs.readFile(contactsPath, "utf8");
  const respons = JSON.parse(request);
  const del = respons.filter(num => (num.id !== Number(contactId)));
  const data = JSON.stringify(del);
  await fs.writeFile(contactsPath, data);
  console.log(listContacts());
}

const addContact = async (name, email, phone) => {
  const request = await fs.readFile(contactsPath, "utf8");
  const respons = JSON.parse(request);
  respons.push({ id: uuidv4(), name, email, phone });
  const data = JSON.stringify(respons);
  await fs.writeFile(contactsPath, data);
  console.log(listContacts());
}

module.exports = {listContacts,getContactById,removeContact,addContact};