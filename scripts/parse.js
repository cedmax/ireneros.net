const fs = require('fs')

const contentType = (content, type) => content
.filter(item => item.sys.contentType.sys.id === type)
.map(item => {
  return Object.keys(item.fields).reduce((acc, fieldKey) => {
    let field = item.fields[fieldKey];
    if (field.fields && field.fields.file) {
      field = field.fields
    }

    if (fieldKey === 'images') {
      field = item.fields[fieldKey].map(image => image.fields)
    }

    acc[fieldKey] = field;
    return acc;
  }, {})
}).sort((a, b) => b.order - a.order)

module.exports = (content) => {
  const metadata = contentType(content, 'contents')
  const multimedia = contentType(content, 'multimedia')
  const performance = contentType(content, 'performance')

  return { metadata, multimedia, performance }
}