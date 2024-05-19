const database = require('../db/database');
const { ObjectId } = require('mongodb');

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

contactsController.create = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await database.getDB().db('Project1').collection('users').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error);
  }
};
  
contactsController.update = async (req, res) => {
  const { id } = req.params
  const userId = ObjectId.createFromHexString(id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await database.getDB().db('Project1').collection('users').replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
};

contactsController.delete = async (req, res) => {
  const { id } = req.params
  const userId = ObjectId.createFromHexString(id);  
  const response = await database.getDB().db('Project1').collection('users').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
};

module.exports = contactsController;