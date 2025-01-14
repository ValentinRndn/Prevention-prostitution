const express = require('express');
const http = require('http');
const cors = require('cors'); // Import du middleware cors
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Connexion à MongoDB

dotenv.config();
connectDB(); // Connexion à MongoDB

const app = express();

const allowedOrigins = [
  'https://preventionprostitutionnormandie.com',
  'https://www.preventionprostitutionnormandie.com',
  'http://preventionprostitutionnormandie.com',
  'http://www.preventionprostitutionnormandie.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}));


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}));


app.use(express.json()); 

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users', require('./routes/userRoute')); // Route des utilisateurs
app.use('/api/blogs', require('./routes/blogRoute')); // Route des articles
app.use('/api/guides', require('./routes/guideRoute')); // Route des guides
app.use('/api/statistics', require('./routes/statisticRoute')); // Route des statistiques
app.use('/api/structures', require('./routes/structureRoute')); // Route des structures
app.use('/api/form', require('./routes/formRoutes'));

app.use('/uploads', express.static('uploads'));

// Création du serveur HTTP
const server = http.createServer(app);

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
