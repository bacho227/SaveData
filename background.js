/**
 * Created by bacho on 10/15/14.
 */
console.log("Running at global scope")
chrome.browserAction.onClicked.addListener(function (tab) {
	console.log(tab)
	chrome.tabs.getSelected(null, function (tab) {
		var code = "document.querySelector('#deoppcknbhdojlkeincepaocjlgihimo').querySelector('.reload-link').click()";
		chrome.tabs.executeScript(tab.id, {code: code});
	});
});