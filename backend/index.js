const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST','PATCH','DELETE'],
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Collaborative Presentation Server Running');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const presentationRoutes = require('./routes/PresentationRoutes');
app.use('/api/presentations', presentationRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
