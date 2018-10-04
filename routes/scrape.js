var request = require("request");
var cheerio = require("cheerio");
var Note = require("../models/Comments");
var Article = require("../models/Article");
var Save = require("../models/Save");

module.exports = function (app) {
request("https://www.indeed.com/jobs?q=&l=San+Francisco%2C+CA", (err, res, html) => {
    const $ = cheerio.load(html);
    

    $("a.jobtitle.turnstileLink").each((i, el) => {
        var results = {};
        const title = $(el).text();
        // const company = $("span.company").text().replace(/\s\s+/g, "");
        const location = $("span.location").text().replace(/\s\s+/g, "");
        const summary = $("span.summary").text().replace(/\s\s+/g, "");
        const link = $(el).attr("href");

        if (results.title && results.link && results.location && results.summary) {
            var entry = new Article(results);
            // Now, save that entry to the db
            results.push({
                title: title,
                // company: company,
                link: link,
                location: location,
                summary: summary
            }),
                function (error, doc){
                    if (error) {
                        console.log(error);
                    }
                }
                res.json(true);
                res.json({"code" : "success"});
        }

        
        
        
    });
    // console.log(results);
});






// Get route for  all the articles
app.get("/articles", function (req, res) {
    Article.find({}, function (error, doc) {   
        if (error) {
            console.log(error);
            } else {
                res.send(doc);

                }
     });
 });
// Get route for  all the articles with the id
app.get("/articles/:id", function (req, res) {
    Article.find({
        "_id": req.params.id
    })
    .populate("comments")
    .exec(function (error, doc) {
    if (error) {
        console.log(error)
    } else {
        res.send(doc);
            }
    });
});

// get route to return all saved articles
app.get("/saved/all", function (req, res) {
Save.find({})
.populate("comments")
.exec(function (error, data) {
if (error) {
    console.log(error);
    res.json({"code" : "error"});
} else {
    res.json(data);
}
});
});

// post route to save the article
app.post("/save", function (req, res) {
var result = {};
results.id = req.body._id;
results.summary = req.body.summary;
results.location = req.body.location;
results.headline = req.body.headline;
results.link = req.body.link;
// Save these resultss in an object that we'll push into the resultss array we defined earlier
var entry = new Save(results);
// Now, save that entry to the db
entry.save(function (err, doc) {
// Log any errors
if (err) {
console.log(err);
res.json(err);
}
// Or log the doc
else {
res.json(doc);
}
});
//res.json(results);
});

// route to delete saved articles
app.delete("/delete", function (req, res) {
var results = {};
results._id = req.body._id;
Save.findOneAndRemove({
'_id': req.body._id
}, function (err, doc) {
// Log any errors
if (err) {
console.log("error:", err);
res.json(err);
}
// Or log the doc
else {
res.json(doc);
}
});
});

app.get("/notes/:id", function (req, res) {
if(req.params.id) {
Note.find({
"article_id": req.params.id
})
.exec(function (error, doc) {
if (error) {
    console.log(error)
} else {
    res.send(doc);
}
});
}
});


// Create a new note or replace an existing note
app.post("/comments", function (req, res) {
if (req.body) {
var newComment = new Note(req.body);
newComment.save(function (error, doc) {
if (error) {
    console.log(error);
} else {
    res.json(doc);
}
});
} else {
res.send("Error");
}
});
// find and update the note
app.get("/commentpopulate", function (req, res) {
Comments.find({
"_id": req.params.id
}, function (error, doc) {
if (error) {
console.log(error);
} else {
res.send(doc);
}
});
});

// delete a note

app.delete("/deletecomment", function (req, res) {
var results = {};
results._id = req.body._id;
Comments.findOneAndRemove({
'_id': req.body._id
}, function (err, doc) {
// Log any errors
if (err) {
console.log("error:", err);
res.json(err);
}
// Or log the doc
else {
res.json(doc);
}
});
});
}
