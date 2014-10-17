/**
 * Created by bacho on 10/15/14.
 */
function log() {
	console.log.apply(console, arguments);
}
chrome.contextMenus.create({
	title: "Search: asasds",
	contexts: ["link", "image"],
	onclick: log
}, log);

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	log(arguments)
});

function StorageManager() {
	var me = this;
	me.data = [];

	me.getData = getData;
	me.addItem = addItem;
	me.removeItem = removeItem;

	function getData(callback) {
		chrome.storage.sync.get(function (res) {
			me.data = stringToData(objToStr(res));
			if ($.isFunction(callback)) {
				callback.call(null, me.data);
			}
		});
	}

	function addItem(item, callback) {
		me.data.push(item);
		saveData(callback);
	}

	function removeItem(item, callback) {
		me.data.splice(me.data.indexOf(item), 1);
		saveData(callback);
	}

	function saveData(callback) {
		chrome.storage.sync.clear();
		var data = strToObj(dataToString(me.data));
		chrome.storage.sync.set(data, checkError(callback));
	}

	function checkError(callback) {
		return function () {
			if (chrome.runtime.lastError) {
				log(chrome.runtime.lastError);
				return;
			}

			if ($.isFunction(callback)) {
				callback.call(null, me.data);
			}
		}
	}

	function dataToString(data) {
		var d = [];
		for (var i in data) {
			var str = data[i]['url'];
			if (data[i]['description']) {
				str += ':' + data[i]['description'];
			}
			d.push(str);
		}
		return d.join('|');
	}

	function stringToData(str) {
		var d = [];
		var arr = str.split('|');
		for (var i in arr) {
			var r = arr[i].split(':');
			d.push({
				url: r[0],
				description: r[1] || null
			});
		}
		return d;
	}

	function strToObj(str) {
		var regExp = new RegExp('.{1,' + (chrome.storage.sync.QUOTA_BYTES_PER_ITEM - 50) + '}', 'g');
		var arr = str.match(regExp);
		var obj = {};
		for (var i in arr) {
			obj[i] = arr[i];
		}
		return obj;
	}

	function objToStr(obj) {
		var str = '';
		for (var i in obj) {
			str += obj[i];
		}
		return str;
	}
}

