import express from "express";
const app = express();
import bcrypt from 'bcrypt';
import passport from "passport";
import initializePassport from './passport-config.js'
initializePassport(passport)

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Kunal' });
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try {
        console.log('reqBody', req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPassword', hashedPassword);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    console.log('users', users);
})

app.post('/login', (req, res) => {
    console.log(req.body);
})


app.listen(3000, () => {
    console.log('Hello Server')
})