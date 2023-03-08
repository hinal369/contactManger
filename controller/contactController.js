const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

// @desc Get all Contacts
// @route GET /api/contacts
// @access private 
const getContacts = asyncHandler( async (req, res) => {
    try {
        const contacts = await Contact.find({ user_id : req.user.id });
        res.status(200).json({contacts});   
    } catch (error) {
        
    }
})

// @desc Get Contact
// @route GET /api/contacts
// @access private 
const getContact =  asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to access other user contacts!");
    }
    
    res.status(200).json({contact}); 
})

// @desc Create Contact
// @route POST /api/contacts
// @access private 
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
        user_id : req.user.id,
    }) 
    res.json({contact});   
})

// @desc Update Contact
// @route PUT /api/contacts
// @access private 
const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById({_id : req.params.id});
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts!");
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
// @access private 
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found!");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts!");
    }
    
    await contact.deleteOne({ _id : req.params.id });
    res.json(contact);   
        
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }