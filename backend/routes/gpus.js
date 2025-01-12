import express from 'express';
import Gpu from '../models/Gpu.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all GPU listings
router.get('/', auth, async (req, res) => {
  try {
    const gpus = await Gpu.find().sort('-createdAt');
    res.json(gpus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new GPU listing
router.post('/', auth, async (req, res) => {
  try {
    const { model, description, startingPrice } = req.body;

    const gpu = new Gpu({
      model,
      description,
      startingPrice,
      seller: req.user.userId,
    });

    await gpu.save();
    res.status(201).json(gpu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Place a bid on a GPU
router.post('/:id/bid', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const gpu = await Gpu.findById(req.params.id);

    if (!gpu) {
      return res.status(404).json({ message: 'GPU not found' });
    }

    if (gpu.seller.toString() === req.user.userId) {
      return res.status(400).json({ message: 'Cannot bid on your own listing' });
    }

    if (gpu.currentBid && amount <= gpu.currentBid.amount) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    if (!gpu.currentBid && amount < gpu.startingPrice) {
      return res.status(400).json({ message: 'Bid must be higher than starting price' });
    }

    gpu.currentBid = {
      amount,
      userId: req.user.userId,
    };

    await gpu.save();
    res.json(gpu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;