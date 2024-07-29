const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')

const app = express()
const port = 3000

// Enable CORS for all routes
app.use(cors())

app.get('/api/m3u8', async (req, res) => {
  try {
    const { url } = req.query

    // 使用 Puppeteer 启动无头浏览器
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // 监听网络请求并捕获最终的 m3u8 URL
    let finalM3u8Url = ''
    page.on('response', async (response) => {
      const requestUrl = response.url()
      if (requestUrl.endsWith('.m3u8')) {
        finalM3u8Url = requestUrl
      }
    })

    // 访问 feisuplayer 提供的 m3u8 解析 URL
    await page.goto(`https://www.feisuplayer.com/m3u8/?url=${encodeURIComponent(url)}`, {
      waitUntil: 'networkidle0', // 等待网络空闲
      timeout: 60000 // 设置超时时间为 60 秒
    })

    // 等待一段时间以确保所有请求都已完成
    await page.waitForTimeout(10000)

    await browser.close()

    if (finalM3u8Url) {
      console.log(`Parsed m3u8 URL: ${finalM3u8Url}`) // 输出解析到的 m3u8 URL
      res.json({ url: finalM3u8Url })
    } else {
      console.error('m3u8 URL not found')
      res.status(500).send('m3u8 URL not found')
    }
  } catch (error) {
    console.error('Error fetching m3u8 URL:', error)
    res.status(500).send('Error fetching m3u8 URL')
  }
})

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`)
})
