const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const multer = require('multer');

// Configuration de multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route pour récupérer tous les articles
router.get('/getAllBlogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer un article par son id
router.get('/getBlog/:id', async (req, res) => { // Correction de l'URL (ajout de '/')
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer le dernier article 
router.get('/getLastBlog', async (req, res) => {
  try {
    const blog = await Blog.findOne().sort({ _id: -1 });
    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter un article
router.post('/createBlog', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, pdf, pin, author, date, content, archive } = req.body;
    const image = req.file ? req.file.path : null; // Vérification si l'image est présente

    if (!title || !author || !content || !date) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    }

    const blog = new Blog({
      title,
      content,
      image,
      pin: pin || false,
      author,
      date,
      archive: archive || false
    });
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour modifier un article
router.put('/updateBlog/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, pin, author, date, archive } = req.body;
    const image = req.file ? req.file.path : null;
    
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const updatedData = {
      title,
      image: image || blog.image, // Utiliser l'image existante si aucune nouvelle n'est fournie
      pin: pin || blog.pin,
      author,
      date,
      archive: archive || blog.archive,
    };

    blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour supprimer un article
router.delete('/deleteBlog/:id', async (req, res) => { // Correction de l'URL (ajout de '/')
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});     

// Route pour archiver un article
router.put('/archiveBlog/:id', async (req, res) => {
  try {
    const { archive } = req.body;
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    blog = await Blog.findByIdAndUpdate(req.params.id, { archive: archive }, { new: true });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
