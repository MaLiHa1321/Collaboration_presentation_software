const express = require('express');
const router = express.Router();
const Presentation = require('../models/presentation');
const { v4: uuidv4 } = require('uuid');

// ✅ Create new presentation
router.post('/', async (req, res) => {
  try {
    const { title, creator } = req.body;

    if (!creator?.id || !creator?.name) {
      return res.status(400).json({ message: 'Missing creator.id or creator.name' });
    }

    // Assign UUIDs to slide and block
   const defaultSlide = {
  id: uuidv4(),
  title: 'Welcome Slide',   // give default title
  blocks: [
    {
      id: uuidv4(),
      x: 100,
      y: 100,
      width: 300,
      height: 150,
      content: '### Welcome to your first slide!',
    },
  ],
};


    // Full user object with id
    const user = {
      id: creator.id, 
      name: creator.name,
      role: creator.role || 'Creator',
    };

    const newPresentation = new Presentation({
      title,
      slides: [defaultSlide],
      users: [user],
    });

    const newSlide = {
  id: uuidv4(),
  title: 'New Slide',
  blocks: [],
};


    const saved = await newPresentation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating presentation', error: err.message });
  }
});

// ✅ Get all presentations (id and title only)
router.get('/', async (req, res) => {
  try {
    const presentations = await Presentation.find({}, '_id title');
    res.json(presentations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching presentations', error: err.message });
  }
});

// ✅ Get one presentation by ID
router.get('/:id', async (req, res) => {
  try {
    const presentation = await Presentation.findById(req.params.id);
    if (!presentation) {
      return res.status(404).json({ message: 'Presentation not found' });
    }
    res.json(presentation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching presentation', error: err.message });
  }
});

// ✅ Update slides, users, or title
router.patch('/:id', async (req, res) => {
  try {
    const { slides, users, title } = req.body;
    const updateData = {};

    if (slides) updateData.slides = slides;
    if (users) updateData.users = users;
    if (title) updateData.title = title;

    const updated = await Presentation.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Presentation not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating presentation', error: err.message });
  }
});

module.exports = router;
