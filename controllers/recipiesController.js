(function (recipiesController){
    var data = require("../data");

    recipiesController.init = function (app){
        app.get("/api/recipies", function (req, res){
            //var categoryName = req.params.categoryName;
            data.getRecipies(function (err, recipies){
                if (err){
                    res.send(400, err);
                } else{
                    res.set("Content-Type", "application/json");
                    
                    res.send({ recipies });
                }
            });
        });

        app.get("/api/recipies/:filter", function (req, res) {
            var filter = req.params.filter;
            data.filterRecipies(filter, function (err, recipies) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");

                    res.send({ recipies });
                }
            });
        });


        app.post("/api/recipies/:recipieName", function (req, res) {
            var recipieName = req.params.recipieName;
            if (req.body.rating > 0 && req.body.rating < 6){
                var ratingToInsert = {
                    stars: req.body.rating
                };
                data.addRating(recipieName, ratingToInsert, function (err) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.set("Content-Type", "application/json");
                        res.send(201, ratingToInsert);
                    }
                });
            } else{
                res.send(400, 'Rating out of range');
            }
        });

/*
        app.post("/api/notes/:categoryName", function (req, res){
            var categoryName = req.params.categoryName;
            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: "Diego Nudler"
            };

            data.addNote(categoryName, noteToInsert, function (err){
                if (err){
                    res.send(400, err);
                } else{
                    res.set("Content-Type", "application/json");
                    res.send(201, noteToInsert);
                }
            });
        });
        */
    };


})(module.exports);