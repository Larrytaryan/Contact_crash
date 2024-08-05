const ayncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
//@desc controllers :interacts with the database

const getContacts = ayncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//desc getContact
//@route /api/contacts/:id
//access private
const getContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contatc not found");
  }

  res.status(200).json(contact);
});

//desc createContact
//@route /api/contacts/:id
//access public
const createContact = ayncHandler(async (req, res) => {
  console.log("the request body is as :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });

  // const {name,email,phonenumber}=req.body;
  res.status(201).json(contact);
});

//desc UpdateContact
//@route /api/contacts/:id
//access public
const updateContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("Unauthorized update of credential")

  }
 
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  };

  await contact.deleteOne({_id: req.params.id});

  res.status(200).json(contact)

  
});
module.exports = {
  deleteContact,
  getContacts,
  getContact,
  createContact,
  updateContact,
};
