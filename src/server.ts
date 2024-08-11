import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
