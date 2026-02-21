import express from 'express';
import loginRoute from './routes/login.ts' 
import signUpRoute from './routes/signup.ts'
import db from './db/index.js';
import auth from './middlewares/auth.ts';
import age from './routes/age.ts'
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.use('/login', loginRoute)
app.use('/signup', signUpRoute)

app.use(auth)
app.use('/age', age)

async function startServer() {
  try {
    await db.one("SELECT 1");

    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}
startServer()
