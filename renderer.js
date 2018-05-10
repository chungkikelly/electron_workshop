// https://github.com/felixrieseberg/monaco-loader

const { ipcRenderer } = require('electron')
const loader = require('monaco-loader')
const fs = require('fs')

window.addEventListener('DOMContentLoaded', () => {
  loader().then((monaco) => {
    let editor = monaco.editor.create(document.getElementById('container'), {
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true
    })

    ipcRenderer.on('navigate', (e, url) => {
      url = url.slice(7);
      // Must slice file:/// because Chrome requires that header, but Node doesn't
      // Chrome encodes spaces in URL as %20
      fs.readFile(url, 'utf8', (error, result) => {
        console.log(error);
        if (!error) {
          console.log(result);

          editor.setModel(monaco.editor.createModel(result, 'javascript'));
        }
      });
    });

  })
})
