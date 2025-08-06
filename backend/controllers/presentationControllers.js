const Presentation = require('../models/presentation');

exports.getOrCreatePresentation = async (req, res) => {
  const { id } = req.params;
  try {
    let presentation = await Presentation.findOne({ id });
    if (!presentation) {
      presentation = new Presentation({
        id,
        slides: [
          {
            id: 's1',
            blocks: [],
          },
        ],
        users: [],
      });
      await presentation.save();
    }
    res.json(presentation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching presentation', error });
  }
};

exports.updatePresentation = async (req, res) => {
  const { id } = req.params;
  const { slides, users } = req.body;

  try {
    const updated = await Presentation.findOneAndUpdate(
      { id },
      { slides, users },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating presentation', error });
  }
};
