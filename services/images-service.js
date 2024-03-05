import { JSDOM } from 'jsdom'

export function getImages(string) {
  const dom = new JSDOM(string, { resources: 'usable' })
  const imagesDOM = dom.window.document.querySelectorAll('img')
  const url = Array.from(imagesDOM).map((i) => i.src)
  return url
}
