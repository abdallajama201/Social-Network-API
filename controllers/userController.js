const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: 'No user with that ID' })
        } else {
          res.json(user)
        };
      })
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {

  },
  deleteUser(req, res) {

  },
  addFriend(req, res) {

  },
  deleteFriend(req, res) {

  },
};