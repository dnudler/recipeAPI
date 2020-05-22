(function (controllers){

    var homeController = require("./homeController");
    var recipiesController = require("./recipiesController");

    controllers.init = function(app) {
        homeController.init(app);
        recipiesController.init(app);
    };

})(module.exports);