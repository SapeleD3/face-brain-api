const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const signin = require('./controllers/signin');
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const postgres = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    }
});

// postgres.select('*').from('users').then(data => {
//     console.log(data)
// });

const app = express();

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => { res.send('it is Working') })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, postgres, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handProfile(req, res, postgres)})

app.put('/image', (req, res) => {image.updateImage(req, res, postgres)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})