const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username })
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought } },
          { runValidators: true, new: true })
          .then((user) => res.json(user))
      })
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
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
  // Update a single thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true })
      .then((thought) => {
      if(!thought) {
        res.status(404).json({ message: 'No thought with this id!' })
      } else {
        res.json(thought)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a single thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
      if(!thought) {
        res.status(404).json({ message: 'No thought with this id!' })
      } else {
        res.json(thought)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Create a reaction and attach it to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
      { runValidators: true, new: true })
      .then((reaction) => {
      if(!reaction) {
        res.status(404).json({ message: 'No reaction with this id!' })
      } else {
        res.json(reaction)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } }})
      .then((reaction) => {
      if(!reaction) {
        res.status(404).json({ message: 'No reaction with this id!' })
      } else {
        res.json(reaction)
      }})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};