var request = require("request");
var cheerio = require("cheerio");


request("https://www.indeed.com/jobs?q=&l=San+Francisco%2C+CA", (err, response, html) => {
    const $ = cheerio.load(html);
    const results = [];

    $("a.jobtitle.turnstileLink").each((i, el) => {
        const title = $(el).text();
        // const company = $("span.company").text().replace(/\s\s+/g, "");
        const location = $("span.location").text().replace(/\s\s+/g, "");
        const summary = $("span.summary").text().replace(/\s\s+/g, "");
        const link = $(el).attr("href");

        results.push({
            title: title,
            // company: company,
            link: link,
            location: location,
            summary: summary
        });
    });
    console.log(results);
})

