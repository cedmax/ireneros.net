const fs = require('fs-extra')
const download = require('image-downloader')

const destructureImg = image => {
  const { file: { url, fileName } } = image
  return { url, fileName }
}

async function saveImage (prefix, image, name) {
  const data = destructureImg(image)
  const filename = name ? `${name}${data.fileName.match(/\.[0-9a-z]+$/i)[0]}` : data.fileName
  const options = {
    url: `http:${data.url}`,
    dest: `./templates/images/content/${prefix}_${filename}`
  }

  const thumbOptions = {
    url: `http:${data.url}?w=500`,
    dest: `./templates/images/content/thumb_${prefix}_${filename}`
  }

  await download.image(options)
  await download.image(thumbOptions)
  return {
    url: `/images/content/${prefix}_${filename}`,
    thumb: `/images/content/thumb_${prefix}_${filename}`,
  }
}

async function creation (content, type) {
  const fileContent = JSON.parse(fs.readFileSync(`./contents/${type}.json`))
  const contentfulContent = content[type]

  fileContent.items = [];
  fileContent.menu = {};
  for (const item of contentfulContent) {
    fileContent.menu[item.slug] = {
      title: item.title,
      slug: item.slug,
      order: item.order
    }

    if (item.video) {
      const image = await saveImage(item.slug, item.videoThumbnail, item.video.replace('https://vimeo.com/', ''))
      fileContent.items.push({
        "creation": item.title,
        "group": item.slug,
        "url": item.video,
        "thumb": image.thumb,
        "title": "Video"
      })
    }
    if (item.images) {
      for (const contentFulImage of item.images) {
        const image = await saveImage(item.slug, contentFulImage)
        fileContent.items.push({
          "creation": item.title,
          "group": item.slug,
          "url": image.url,
          "thumb": image.thumb,
          "title": contentFulImage.title
        })
      }
    }
  }

  fileContent.menu = Object.keys(fileContent.menu).map(key => fileContent.menu[key]).sort((a, b)=>b.order - a.order);
  fs.outputFileSync(`./contents/${type}.json`, JSON.stringify(fileContent, null, 2), 'UTF-8')
}

module.exports = async (content) => {
  const shared = JSON.parse(fs.readFileSync('./contents/shared.json'))
  const index = JSON.parse(fs.readFileSync('./contents/index.json'))

  const metadata = content.metadata[0]
  shared['site-title'] = metadata.title
  shared['tagline'] = metadata.tagline
  shared['mainImage'] = await saveImage('main', metadata.image)

  for (const section of index.sections) {
    const sectionSlug = section.title.toLowerCase();
    const sectionImage = await saveImage('home', metadata[`${sectionSlug}Image`]);
    section.thumb = sectionImage.thumb
  }

  fs.outputFileSync('./contents/index.json', JSON.stringify(index, null, 2), 'UTF-8')
  fs.outputFileSync('./contents/shared.json', JSON.stringify(shared, null, 2), 'UTF-8')
  fs.outputFileSync('./contents/_index/quote.markdown', metadata.home)
  fs.outputFileSync('./contents/_about/me.markdown', metadata.aboutMe)
  fs.outputFileSync('./contents/_about/work.markdown', metadata.aboutWork)

  await creation(content, 'multimedia')
  await creation(content, 'performance')
}