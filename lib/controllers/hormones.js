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
            const data = await Hormone.getById(id)
            res.send(data)
        } catch (error) {
            next(error)
        }
    })
        
    .put('/:id', async(req, res, next)=>{
        const id = req.params.id
        const {physiologicalAction} = req.body
        
        try {
            const response = await Hormone.updateHormoneAction(id,physiologicalAction)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async(req, res, next)=>{
        const id = req.params.id
        try {
            const response = await Hormone.deleteHormone(id)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })