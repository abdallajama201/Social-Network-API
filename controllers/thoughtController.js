const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if(!thought) {
          res.status(404).json({ message: 'No thought with that ID' })
        } else {
          res.json(thought)
        };
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {

  },
  deleteThought(req, res) {

  },
  createReaction(req, res) {

  },
  deleteReaction(req, res) {

  },
};