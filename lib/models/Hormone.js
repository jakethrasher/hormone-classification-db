const pool = require('../utils/pool');

module.exports= class Hormone {
    id;
    hormone;
    source_organ;
    target_organ;
    physiological_action;
    structure;

    constructor(row){
        this.id = row.id;
        this.hormone = row.hormone;
        this.sourceOrgan = row.source_organ;
        this.targetOrgan = row.target_organ;
        this.physiologicalAction = row.physiological_action;
        this.structure = row.structure;
    }

    static async create(data){
        const { rows } = await pool.query(`
        INSERT INTO hormones (hormone, source_organ, target_organ, physiological_action, structure)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [data.hormone, data.sourceOrgan, data.targetOrgan, data.physiologicalAction, data.structure])

        return new Hormone(rows[0]);
    }

    static async getAllData(){
        const { rows } = await pool.query(`
        SELECT * FROM hormones`)

        return rows.map(item=> new Hormone(item))
    }
    
    static async getById(id){
        const { rows } = await pool.query(`
        SELECT * 
        FROM hormones
        WHERE id = ${id}`)
        return new Hormone(rows[0])
    }
}