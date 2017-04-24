var xx = function() {

}

xx.prototype = {
	init: function() {
		console.error("this is a alert module");
	}
}

module.exports = {
	xx: xx
}