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