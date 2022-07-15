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
    User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true })
      .then((user) => {
      if(!user) {
        res.status(404).json({ message: 'No user with this id!' })
      } else {
        res.json(user)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
      if(!user) {
        res.status(404).json({ message: 'No user with this id!' })
      } else {
        res.json(user)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true })
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: 'No user with this id!' })
        } else {
          res.json(user)
        }})
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId }})
      .then((user) => {
      if(!user) {
        res.status(404).json({ message: 'No user with this id!' })
      } else {
        res.json(user)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
