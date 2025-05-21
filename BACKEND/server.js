import express from 'express'
import mongoose from 'mongoose' 
import { Pass } from './model/pass.js'
import cors from 'cors'
import bodyParser from 'body-parser'


await mongoose.connect("mongodb://localhost:27017/pass")

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


app.post('/', (req,res)=>{
    res.send(req.body)
    console.log(req.body)

    Pass.create({ siteUrl: req.body.siteUrl,
      username: req.body.username,
      password: req.body.password,
      id: req.body.id,})
})

app.post('/delete', async (req,res)=>{
  res.send("content deleted")
  const result = await Pass.deleteOne({id: req.body.id})
})

app.post('/edit', async (req,res)=>{
  res.send("content Updated")
  const result = await Pass.updateOne({id: req.body.id}, {$set:{siteUrl: req.body.siteUrl,
    username: req.body.username,
    password: req.body.password,}})
})

app.post('/all', async (req,res)=>{
    const allpass = await Pass.find()
    res.send(allpass)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})