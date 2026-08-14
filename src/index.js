import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Server is running!',
    timestamp: new Date().toISOString()
  });
});

app.use("/users", userRouter);

// Run server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
