const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Hormone = require('../lib/models/Hormone');


describe('app routes',()=>{
    beforeAll(()=>{
        return setup(pool).then(()=>{
            return Hormone.create({
                hormone:'antidiuretic hormone',
                sourceOrgan:'posterior pituitary',
                targetOrgan:'kidney tubules/smooth muscle in arterioles',
                physiologicalAction:'regulates blood pressure by causing water reabsorption',
                structure:'peptide hormone'
            })
        })
    })

    it('creates a hormone instance', async()=>{
        const data = await request(app)
            .post('/api/v1/hormones')
            .send({
                hormone:'follicle stimulating hormone(FSH)',
                sourceOrgan:'anterior pituitary',
                targetOrgan:'ovaries/testes',
                physiologicalAction:'In females, ovarian follicle growth, and estrogen secretion. Spermatogenesis in males',
                structure:'glycoprotein'
            })

        expect(data.body).toEqual({
            id:expect.any(String),
            hormone:expect.any(String),
            sourceOrgan:expect.any(String),
            targetOrgan:expect.any(String),
            physiologicalAction:expect.any(String),
            structure:expect.any(String),
    })
    })

});