var request = require("request");
var cheerio = require("cheerio");


request("https://www.indeed.com/jobs?q=&l=San+Francisco%2C+CA", (err, response, html) => {
    const $ = cheerio.load(html);
    const results = [];

    $("a.turnstileLink").each((i, el) => {
        const title = $(el).text();
        const link = $(el).children().attr("href");

        results.push({
            title: title,
            link: link
        });
    });
    console.log(results);
})

