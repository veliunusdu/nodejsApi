import express from 'express';
import usersRoutes from './routes/users.mjs';

const app = express();
const PORT = 5000;

// support JSON and urlencoded bodies (form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Hello — server is running');
});

app.listen(PORT, () => {
    console.log('Server is running on port', `http://localhost:${PORT}`);
});