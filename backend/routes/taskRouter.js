const router = require('express').Router();
const Task = require('../models/Task');

// Rotas da API

// Create - Criação de dados
router.post('/', async (req, res) => {
    // req.body
    const {description, done, createAt} = req.body;

    if(!description) {
        res.status(422).json({ error: 'A descrição é obrigatória!' })
        return
    }

    const task = {
        description,
        done,
        createAt
    }

    try {
        // Criando dados
        await Task.create(task);
        res.status(201).json({message: 'Task inserida com sucesso!'})

    } catch(error) {
        res.status(500).json({error: error})
    }
})


// Read - Leitura de dados
router.get('/', async(req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

// Obtendo dados a partir do id
router.get('/:id', async (req, res) => {
    // extraindo o dado da requisição, pela url = req.params
    const id = req.params.id;

    try {
        const task = await Task.findOne({ _id: id });

        if(!task) {
            res.status(422).json({message: 'Task não encontrada!'});
            return
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


// Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const {description, done, createAt} = req.body;

    const task = {
        description,
        done,
        createAt
    }

    try {
        const updateTask = await Task.updateOne({ _id: id}, task);

        if(updateTask.matchedCount === 0) {
            res.status(422).json({message: 'Task não encontrada!'});
            return
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})


// Delete - Deletar os dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });

    if(!task) {
        res.status(422).json({message: 'Task não encontrada!'});
        return
    }

    try {
        await Task.deleteOne({ _id: id })

        res.status(200).json({ message: 'Task removida com sucesso!' });
    } catch(error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;
