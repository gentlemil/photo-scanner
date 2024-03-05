import axios from 'axios'
import express from 'express'
import path from 'path'
import { getImages } from './services/images-service.js'

const port = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const __dirname = path.resolve()
  res.sendFile(__dirname + '/views/home.html')
})

app.post('/scan', async (req, res) => {
  const { url } = req.body

  const response = await axios.get(url)
  const images = getImages(response.data)

  let html =
    '<p style="padding: 20px; font-size: 30px">List of images on the page</p>'

  images.forEach(
    (img) => (html += `<img src="${img}" style="max-width: 100px" >`)
  )

  res.type('html')
  res.send(html)
})

app.listen(port, () => console.log(`Server works on port: ${port}`))
