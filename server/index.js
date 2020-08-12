const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')

const app = express()
app.use(express.json())
app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/api/todo', async (req, res) => {
    const todos = await Todo.find({})
    res.send(todos)
})

app.post('/api/todo', (req, res) => {
    console.log(req.body)
    const todo = new Todo({
        title: req.body.title
    })
    todo.save()
    res.json({status: 'ok'})
})

// app.put('/api/todo')

app.delete('/api/todo', (req, res) => {

})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://AnJey:qwertyqwerty@cluster0.wfchm.mongodb.net/TODO', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(3003, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
