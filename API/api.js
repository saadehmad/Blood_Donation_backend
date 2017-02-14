
var api = function (app, modelsArr) {
	var publicApi = require("./Public-Api/publicApi")(app, modelsArr);
	var privateApi = require("./Private-Api/privateApi")(app, modelsArr);
	return {
		public: publicApi,
		private: privateApi
	}
}

module.exports = api;