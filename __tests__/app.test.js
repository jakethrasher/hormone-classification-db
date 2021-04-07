const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Hormone = require('../lib/models/Hormone');


describe('app routes',()=>{
  
    beforeEach(()=>{
        return setup(pool)
    });

    it('creates a hormone instance', async()=>{
        const data = await request(app)
            .post('/api/v1/hormones')
            .send({
                hormone:'follicle stimulating hormone(FSH)',
                sourceOrgan:'anterior pituitary',
                targetOrgan:'ovaries/testes',
                physiologicalAction:'Ovarian follicle growth and estrogen secretion. Spermatogenesis.',
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

    it('gets all hormone data', async()=>{
        const hormones = await Promise.all([
            Hormone.create({
                hormone:'antidiuretic hormone',
                    sourceOrgan:'posterior pituitary',
                    targetOrgan:'kidney tubules/smooth muscle in arterioles',
                    physiologicalAction:'regulates blood pressure by causing water reabsorption',
                    structure:'peptide hormone'
            }),
            Hormone.create({
                hormone:'follicle stimulating hormone(FSH)',
                sourceOrgan:'anterior pituitary',
                targetOrgan:'ovaries/testes',
                physiologicalAction:'Ovarian follicle growth and estrogen secretion. Spermatogenesis.',
                structure:'glycoprotein'
            })
        ])
        const data = await request(app)
            .get('/api/v1/hormones')
            
        expect(data.body).toEqual(expect.arrayContaining(hormones))
    })

    it('gets a hormone by id', async()=>{

        const fsh = await Hormone.create({
        hormone:'follicle stimulating hormone(FSH)',
        sourceOrgan:'anterior pituitary',
        targetOrgan:'ovaries/testes',
        physiologicalAction:'Ovarian follicle growth and estrogen secretion. Spermatogenesis.',
        structure:'glycoprotein'
        })

        const data = await request(app)
            .get('/api/v1/hormones/1')
        
        expect(data.body).toEqual(fsh)
    })
    

});