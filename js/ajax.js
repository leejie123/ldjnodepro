ajax = {
	send: function(obj) {
		var xmlhttp;
		if(window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} else {
			xmlhttp = new XMLHttpRequest();
		}

		xmlhttp.open("GET", obj.url, false);
		xmlhttp.send();
		alert(xmlhttp.responseText);
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readystate == 4) {
				alert("donw");
			}
		}
		// console.log(xmlhttp.responseXML.xml);
	},
	getHeader: function() {


		var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
		xmlhttp.open("GET", "http://localhost/sample.xml", false);
		xmlhttp.send();
		alert(xmlhttp.getAllResponseHeaders());
	}
}