const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')

const app = express()
app.use(express.json())
app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/api/todo', async (req, res) => {
    const todos = await Todo.find({})
    res.send(todos)
})

app.post('/api/todo', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    todo.save()
    const last = await Todo.find().sort({'_id': -1}).limit(1)
    res.json({status: 'ok', id: last[0]._id})
})

app.put('/api/todo/:id', async (req, res) => {
    let task = await Todo.findOne({_id: req.params.id})
    task.updateOne({completed: !task.completed}).exec()
    res.json({status: 'ok'})
})

app.delete('/api/todo/:id', async (req, res) => {
    await Todo.find({_id: req.params.id}).deleteOne().exec()
    res.json({status: 'ok'})
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://AnJey:qwertyqwerty@cluster0.wfchm.mongodb.net/TODO', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(3003, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
