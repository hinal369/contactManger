const express = require('express');
const router = express.Router();
const ContactController = require('../controller/contactController');

// router.route('/').get((req, res) => {
//     try {
//         res.json({message : "Get all Contacts"});   
//     } catch (error) {
        
//     }
// })

// router.get('/', ContactController.getContacts);
// router.get('/:id', ContactController.getContact);
// router.post('/', ContactController.createContact);
// router.put('/:id', ContactController.updateContact);
// router.delete('/:id', ContactController.deleteContact);
    
router.route('/').get(ContactController.getContacts).post(ContactController.createContact);
router.route('/:id').get(ContactController.getContact).put(ContactController.updateContact).delete(ContactController.deleteContact);

module.exports = router;