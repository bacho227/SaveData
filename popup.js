/**
 * Created by bacho on 10/15/14.
 */
function log() {
	console.log.apply(console, arguments);
}
function start() {
	console.log('asds')
	chrome.tabs.getSelected(null, function (tab) {
		var code = "document.querySelector('#deoppcknbhdojlkeincepaocjlgihimo').querySelector('.reload-link').click()";
		chrome.tabs.executeScript(tab.id, {code: code});
	});
}
setInterval(function () {
	document.body.onclick = start;
}, 1000)
