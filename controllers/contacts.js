const database = require('../db/database');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const contactsController = {};

contactsController.getData = async (req, res) => {
    try{
        const contacts = await database.getDB().db('Project1').collection('users').find({});
        contacts.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
            });
    } catch(err) {
        console.error('Error getting data:', err);
    }
}

contactsController.getByID = async (req, res) => {
    const { id } = req.params
    const userId = ObjectId.createFromHexString(id);
    const contacts = await database.getDB().db('Project1').collection('users').find({ _id: userId });
    contacts.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
}

contactsController.create = async(req, res) => {
    try { 
        // Define a schema for your MongoDB collection
        const contactSchema = new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            firstName: String,
            lastName: String,
            email: String,
            favoriteColor: String,
            birthday: String
        });

        // Generate a new unique _id
        const newId = new mongoose.Types.ObjectId(); 
        
        // Define a model based on the schema
        const Contact = mongoose.model('Contact', contactSchema); 

        const newContact = new Contact({
            _id: newId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        });

        // save contact to database
        await newContact.save();

        const contacts = await database.getDB().db('Project1').collection('users').insert(newContact)
        contacts.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0], { id: newId });
        });
    } catch(err) {
        res.status(500).json(err)
        console.error('Error creating data:', err);
    }
}

contactsController.update = async(req, res) => {
    try {
        const userId = ObjectId.createFromHexString(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
        const contacts = await database.getDB().db('Project1').collection('users').replace({_id: userId}, user)
        contacts.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(err) {
        res.status(500).json(err)
        console.error('Error creating data:', err);
    }
}

contactsController.delete = async(req, res) => {
    try {
        const userId = ObjectId.createFromHexString(req.params.id);
        const contacts = await database.getDB().db('Project1').collection('users').remove({_id: userId}, true);
        if (contacts.deleteCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(contacts.err)
        }
    } catch (err) {
        res.status(500).json(err)
        console.error('Error creating data:', err);
    }
}


module.exports = contactsController;