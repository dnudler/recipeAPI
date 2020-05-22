(function (data){
    var seedData = require("./recipiesData");
    var database = require("./database");
/*
    data.getNoteCategories = function (next){
        //next(null, seedData.initialNotes);
        database.getDb(function(err, db){
            if (err){
                next(err, null);
            } else {
                db.notes.find().toArray(function (err, results){
                    if (err){
                        next(err, null);
                    } else{
                        next(null, results);
                    }
                });
            }
        });
    };




    

    data.createNewCategory = function (categoryName, next){
        database.getDb(function(err, db){
            if (err){
                next(err, null);
            } else {

                db.notes.find({ name: categoryName }).count(function (err, count){
                    if (err){
                        next(err, null);
                    } else{
                        if (count != 0){
                            //already exists
                            console.log("category exists");
                            next("Category already exists");
                        } else{
                            var cat = {
                                name: categoryName,
                                notes: []
                            };
                            db.notes.insert(cat, function (err){
                                if (err){
                                    next(err, null);
                                } else{
                                    next(null);
                                }
                            });
                        }
                    }
                });
            }
        })
    };
    */

    data.addRating = function (recipieName, rating, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.recipies.updateOne({ name: recipieName }, { $push: { ratings: rating } }, next);
            }
        });
    };



    data.filterRecipies = function (valueFilter, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                console.log(valueFilter);
                db.recipies.find({
                $or: [
                    {
                        name: new RegExp(valueFilter, 'i')
                    },
                    {
                        ingredients: { 
                            $elemMatch: {
                                'name': new RegExp(valueFilter, 'i')
                            }
                        }
                    }
                ]
            }).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    data.getRecipies = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.recipies.aggregate([
                    {
                        "$addFields": {
                            "rating_average": {
                                "$divide": [
                                    { // expression returns total
                                        "$reduce": {
                                            "input": "$ratings",
                                            "initialValue": 0,
                                            "in": { "$add": ["$$value", "$$this.stars"] }
                                        }
                                    },
                                    { // expression returns ratings count
                                        "$cond": [
                                            { "$ne": [{ "$size": "$ratings" }, 0] },
                                            { "$size": "$ratings" },
                                            1
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]).toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });

            }
        });
    };

    function seedDatabase(){
        database.getDb(function (err, db){
            if (err){
                console.log("Failed to seed database:" + err);
            } else{
                db.recipies.count(function (err, count){
                    if (err){
                        console.log("Failed to retrieve database count");
                    } else{
                        if (count == 0){
                            console.log("Seeding the database");
                            seedData.initialRecipies.forEach( function (item){
                                db.recipies.insert(item, function(err){
                                    if (err){
                                        console.log("Failed to insert note into database");
                                    }
                                });

                                
                            });
                        }else{
                            console.log("Database already seeded");
                        }
                    }
                });
            }
        });
    }

    seedDatabase();

})(module.exports);