function encodeUrl(url){
    return url.split('https://cdn2.thecatapi.com/images/')[1].split(".")[0]
}

console.log(encodeUrl("https://cdn2.thecatapi.com/images/8vo.jpg"))
