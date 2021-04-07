const { Router } = require('express');
const Hormone = require('../models/Hormone');

module.exports = Router()
    .post('/', async(req, res, next)=>{
        const body = req.body;
        try {
            const data = await Hormone.create(body)
            res.send(data)
        } catch (error) {
            next(error)
        }
    })

    .get('/', async(req, res, next)=>{

        try {
            const data = await Hormone.getAllData()
            res.send(data)
        } catch (error) {
            next(error)
        }
    })
    .get('/:id', async(req, res, next)=>{
        const id = req.params.id
        try {
            const data = await Hormone.getAllData(id)
            res.send(data)
        } catch (error) {
            next(error)
        }
    })