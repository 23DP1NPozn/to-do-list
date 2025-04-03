const express = require('express');
const router = express.Router();
const Uzdevums = require('../models/uzdevums'); // Updated model import

// GET all uzdevumi
router.get('/', async (req, res) => {
  const uzdevumi = await Uzdevums.find().sort({ createdAt: -1 });
  res.json(uzdevumi);
});

// GET single uzdevums
router.get('/:id', async (req, res) => {
  const uzdevums = await Uzdevums.findById(req.params.id);
  res.json(uzdevums);
});

// POST new uzdevums
router.post('/', async (req, res) => {
  const uzdevums = new Uzdevums({
    title: req.body.title,
    description: req.body.description
  });
  const newUzdevums = await uzdevums.save();
  res.status(201).json(newUzdevums);
});

// PUT update uzdevums status
router.put('/:id', async (req, res) => {
  const updatedUzdevums = await Uzdevums.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
      updatedAt: Date.now()
    },
    { new: true }
  );
  res.json(updatedUzdevums);
});

// DELETE uzdevums
router.delete('/:id', async (req, res) => {
  await Uzdevums.findByIdAndDelete(req.params.id);
  res.json({ message: 'Uzdevums dzēsts' });
});

module.exports = router;