const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  content: { type: String, default: '' },
});

const slideSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: 'Untitled Slide' }, 
  blocks: { type: [blockSchema], default: [] },
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['Creator', 'Editor', 'Viewer'],
    default: 'Viewer',
  },
});

const presentationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slides: { type: [slideSchema], default: [] },
    users: { type: [userSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Presentation', presentationSchema);
