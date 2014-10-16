/**
 * Created by bacho on 10/15/14.
 */
function log() {
	console.log.apply(console, arguments);
}
var data = [
	{
		url: 'http://www.jose-aguilar.com/blog/bootstrap-modal/',
		description: 'asasdasd'
	},
	{
		url: 'http://www.jose-aguilar.com/blog/bootstrap-modal/',
		description: 'dasasdasd'
	},
	{
		url: 'http://www.jose-aguilar.com/blog/bootstrap-modal/',
		description: 'asdasd'
	},
	{
		url: 'http://www.jose-aguilar.com/blog/bootstrap-modal/',
		description: null
	}
];

$(function () {
	var stm = new StorageManager();
	stm.getData(function (data) {
		loadData(data);
	});
});

function loadData(data) {
	$('.list-group.my-list').empty();
	for (var i in data) {
		var item = getNewItemByObj(data[i]);
		$('.list-group.my-list').append(item);
	}
}
function getNewItemByObj(obj) {
	var url = unescape(obj['url']);
	var item = $('<div class="list-group-item row">' + '<img class="col-xs-1" src="' + url + '"/>' + '<div class="col-xs-10">' + (obj['description'] || url) + '</div>' +
					 '<span class="col-xs-1 glyphicon glyphicon-remove remove" ></span></div>');
	item.obj = obj;
	return item;
}

function StorageManager() {
	var me = this;

	me.getData = getData;
	me.setData = setData;

	function getData(callback) {
		chrome.storage.sync.get(function (res) {
			var data = stringToData(objToStr(res));
			callback.call(null, data);
		});
	}

	function setData(data, callback) {
		chrome.storage.sync.clear();
		var data = strToObj(dataToString(data));
		chrome.storage.sync.set(data, checkError(callback));
	}

	function checkError(callbackFn) {
		return function () {
			if (chrome.runtime.lastError) {
				log(chrome.runtime.lastError);
				return;
			}
			callbackFn.apply(null, arguments);
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

