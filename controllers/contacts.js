const database = require('../db/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const contacts = await database.getDB().db().collection('users').find({});
    contacts.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        });
}

const getSingle = async (req, res) => {
    const { id } = req.params || '6546a227671d651aa3c3b91b'
    const userId = ObjectId.createFromHexString(id);
    const contacts = await database.getDb().db().collection('users').find({ _id: userId });
    contacts.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
}

module.exports = { getAll, getSingle };