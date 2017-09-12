const client = require('cheerio-httpcli');


const string = client.fetchSync('https://vision.mediamarkt.ch/de/search/?c=282ef344-2ffd-49cb-83ae-4b25a868e628&v=l&r=searchnextpageparameters_bWVkaWFfc2hvcF80MjMxPDwydWp2NHdqb3FjNXl5b3M0dzBoeHltd2U8PCoqPDwwPDw0PDwwPDxzdWJzaG9wc18vX2FsbGNhdGVnb3J5aWQtdmlzaW9uXy9fc2hvcGxhbmd1YWdlPDx2aXNpb25fL18yODJlZjM0NC0yZmZkLTQ5Y2ItODNhZS00YjI1YTg2OGU2MjhfL19kZTw8LTIwPDwxNTA0OTc5NjIzMDIzPDwwPDxkZQ');

console.log(string.body);


