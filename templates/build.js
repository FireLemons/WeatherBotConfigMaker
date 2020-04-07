const fs = require('fs').promises
const Mustache = require('mustache')

let indexTemplate,
    sharedScriptsPartial,
    sharedStylesPartial


function onIndexFilesLoaded(){
  if(indexTemplate && sharedScriptsPartial && sharedStylesPartial){
    fs.writeFile('./index.html', Mustache.render(indexTemplate, {}, {
      'sharedStyles': sharedStylesPartial,
      'sharedScripts': sharedScriptsPartial
    })).then(() => {
      console.log('generated index.html(config maker index)')
    }).catch((err) => {
      console.error(err)
    })
  }
}

fs.readFile('./templates/configMaker.mustache', 'utf8')
  .then((template) => {
    indexTemplate = template
    onIndexFilesLoaded()
  }).catch((err) => {
    console.error(err)
  })

fs.readFile('./templates/sharedScripts.mustache', 'utf8')
  .then((template) => {
    sharedScriptsPartial = template
    onIndexFilesLoaded()
  }).catch((err) => {
    console.error(err)
  })

fs.readFile('./templates/sharedStyles.mustache', 'utf8')
  .then((template) => {
    sharedStylesPartial = template
    onIndexFilesLoaded()
  }).catch((err) => {
    console.error(err)
  })
