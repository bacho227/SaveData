/**
 * Created by bacho on 10/15/14.
 */
function log() {
	console.log.apply(console, arguments);
}

//var stm = new StorageManager();

$(function () {
	$('#add-item').on({
		click: addItem
	});
	//	stm.getData(init);
});
function init(data) {
	loadData(data);
	$('#add-item').on({
		click: addItem
	});
}

function addItem() {
	log('asds')
	chrome.extension.sendMessage({type: "getUrls"}, function (response) {
		log(response)
	});
	//	stm.addItem({
	//		url: escape(unescape("http://getbootstrap.com/components/#input-groups")),
	//		description: escape($('#new-item-text').val())
	//	}, loadData);
}

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
	item.find('.remove').on({
		click: function () {
			stm.removeItem(obj, loadData);
		}
	});
	return item;
}
