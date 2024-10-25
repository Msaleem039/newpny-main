// controllers/eflyerController.js

import fs from 'fs';
import EFlyer from '../models/EFlyer.js';

export const createEFlyer = async (req, res) => {
  try {
    const detail = req.body;
    const data = await EFlyer.create(detail);
    res.status(200).json({
        message: 'E-Flyer created successfully',
        data,
      });

  } catch (error) {
    res.status(500).json({ error: 'Error creating E-Flyer' });
  }
};

export const getAllEFlyers = async (req, res) => {
    try {
      const eFlyers = await EFlyer.find().populate('category').populate('course');
      res.json(eFlyers);
    } catch (error) {
      console.error("Error fetching E-Flyers:", error);
      res.status(500).json({ error: 'Error fetching E-Flyers' });
    }
  };

  export const getEFlyerById = async (req, res) => {
    try {
      const { id } = req.params;
     console.log(id)
      const eFlyer = await EFlyer.findById(id).populate('category').populate('course');
  
      if (!eFlyer) {
        return res.status(404).json({ error: 'E-Flyer not found' });
      }
  
      res.json(eFlyer);
    } catch (error) {
      console.error("Error fetching E-Flyer by ID:", error); // Logs the actual error
      res.status(500).json({ error: 'Error fetching E-Flyer' });
    }
  };

export const updateEFlyer = async (req, res) => {
  try {
    const { category, course, status } = req.body;
    const flyerFile = req.file?.path;

    const eFlyer = await EFlyer.findById(req.params.id);
    if (!eFlyer) return res.status(404).json({ error: 'E-Flyer not found' });

    eFlyer.category = category || eFlyer.category;
    eFlyer.course = course || eFlyer.course;
    eFlyer.status = status ?? eFlyer.status;

    if (flyerFile) {
      fs.unlinkSync(eFlyer.flyerFile);
      eFlyer.flyerFile = flyerFile;
    }

    await eFlyer.save();
    res.json(eFlyer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating E-Flyer' });
  }
};

export const deleteEFlyer = async (req, res) => {
  try {
    const eFlyer = await EFlyer.findById(req.params.id);
    if (!eFlyer) return res.status(404).json({ error: 'E-Flyer not found' });

    fs.unlinkSync(eFlyer.flyerFile);
    await eFlyer.remove();
    res.json({ message: 'E-Flyer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting E-Flyer' });
  }
};
