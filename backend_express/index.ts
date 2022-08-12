import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieSession from 'cookie-session';

dotenv.config();

const PORT: string | number = process.env.PORT || 8000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'hucuPlant-session',
    secret: 'COOKIE_SECRET',
    httpOnly: true
}))


app.get('/', (req: Request, res: Response) => {
  res.send('Simple server');
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));


