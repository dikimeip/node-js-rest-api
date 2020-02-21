const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.status(404).send({ message:"Helo" })
})

//init host
const dbCon = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node_test'
})

//konek
dbCon.connect()


//tampilkan data
app.get('/user',(req,res)=>{
    dbCon.query('SELECT * FROM user',(error,result,field)=>{
        if (error) throw error
        return res.send({data:result,message:'Success Get Data'})
    })
})


// post data 
app.post('/user',(req,res)=>{
    dbCon.query('INSERT INTO user SET ?',{nim : req.body.nim,nama : req.body.nama , kelas:req.body.kelas},(error,result,field)=>{
        if (error) throw error
        return res.status(200).send({status:"success"})
    })
})

//update data 
app.put('/user',(req,res)=>{
    const id = req.body.id
    const nim = req.body.nim
    const nama = req.body.nama
    const kelas = req.body.kelas

    if (!id) {
        res.status(404).send({message:"Id Harus Diisi"})
    } 
    dbCon.query('UPDATE user SET nim = ? , nama = ? , kelas = ? WHERE id = ?',[nim,nama,kelas,id],(error,result,field)=>{
        if (error) throw error
        return res.status(200).send({message:`Update id ${id} Success `})
    })
})

// remove data 
app.delete('/user',(req,res)=>{
    const id = req.body.id
    if(!id){
        res.status(404).send({message:"Id Null"})
    }
    dbCon.query('DELETE FROM user WHERE id = ?',[id],(error,result,field)=>{
        if (error) throw error
        return res.status(200).send({message:"Success Hapus Data"})
    })
})

// server
const listen = 3000
app.listen(listen,()=>{
    console.log(`Server Is running in ${listen}`)
})
