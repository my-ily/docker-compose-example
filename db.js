import {Pool}from 'pg'

const pool = new Pool({
    host:"db",
    port:5030,
    user:'user66',
    password:"password66",
    database:"db66"
})


export default pool;