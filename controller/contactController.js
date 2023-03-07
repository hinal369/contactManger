const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

// @desc Get all Contacts
// @route GET /api/contacts
// @access public 
const getContacts = asyncHandler( async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({contacts});   
    } catch (error) {
        
    }
})

// @desc Get Contact
// @route GET /api/contacts
// @access public 
const getContact =  asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }
    res.status(200).json({contact}); 
})

// @desc Create Contact
// @route POST /api/contacts
// @access public 
const createContact = asyncHandler (async (req, res) => {
    const {name, email, phone }  = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory!");
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
    }) 
    res.json({contact});   
})

// @desc Update Contact
// @route PUT /api/contacts
// @access public 
const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById({_id : req.params.id});
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }
    const update = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.json({update});   
})

// @desc Delete Contact
// @route DELETE /api/contacts
// @access public 
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }
    await contact.remove();
    res.json(contact);   
        
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }