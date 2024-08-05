const express = require("express");
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../Controllers/contactController");
const ValidateToken = require("../Middleware/ValidateTokenHandler");
const router=express.Router();

router.use(ValidateToken);

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports= router;