import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();


app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />)
  const indexFile = path.resolve('./build/index.html')

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log("Something went wrong...")
      return res.status(500).send('error from server...')
    }

    return res.send(
      data.replace('<div id="root"></div>',`<div id="root">${app}</div>`)
    )
  })
})

app.use(express.static('./build'))

app.listen(PORT,()=>{
  console.log('Server running on port :'+ PORT)
})