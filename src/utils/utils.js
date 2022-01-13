const knownJsSrcRE = /\.((j|t)sx?|mjs|vue|marko|svelte|astro)($|\?)/
const path = require('path');

const queryRE = /\?.*$/s
const hashRE = /#.*$/s

const cleanUrl = (url) => url.replace(hashRE, '').replace(queryRE, '')

const isJSRequest = (url) => {
  url = cleanUrl(url)
  if (knownJsSrcRE.test(url)) {
    return true
  }
  if (!path.extname(url) && !url.endsWith('/')) {
    return true
  }
  return false
}

module.exports = {
    isJSRequest
}