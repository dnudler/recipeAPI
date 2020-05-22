(function (database){
    var mongo = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017";
    var theDb = null;
    var dbName = "cookbook";

    database.getDb = function(next){
        if (!theDb){
            //connect to the database
            mongo.MongoClient.connect(mongoUrl, function(err, client){
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                if (err){
                    next(err, null);
                } else{
                    theDb = {
                        db: client,
                        recipies: db.collection('recipies')
                    };
                    next(null, theDb);
                }
            });
        } else{
            next(null, theDb);
        }
    }
})(module.exports);