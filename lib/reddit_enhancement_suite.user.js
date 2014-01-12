// ==UserScript==
// @name          Reddit Enhancement Suite
// @namespace     http://reddit.honestbleeps.com/
// @description   A suite of tools to enhance reddit...
// @copyright     2010-2013, Steve Sobel (http://redditenhancementsuite.com/)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author        honestbleeps
// @include       http://redditenhancementsuite.com/*
// @include       http://reddit.honestbleeps.com/*
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @version       4.3.1.2
// @updateURL     http://redditenhancementsuite.com/latest/reddit_enhancement_suite.meta.js
// @downloadURL   http://redditenhancementsuite.com/latest/reddit_enhancement_suite.user.js
// ==/UserScript==

/*jshint undef: true, unused: true, strict: false, laxbreak: true, multistr: true, smarttabs: true, sub: true, browser: true */

var RESVersion = "4.3.1.2";

var jQuery, $, guiders, Tinycon, SnuOwnd;

/*
	Reddit Enhancement Suite - a suite of tools to enhance Reddit
	Copyright (C) 2010-2012 - honestbleeps (steve@honestbleeps.com)

	RES is released under the GPL. However, I do ask a favor (obviously I don't/can't require it, I ask out of courtesy):
	
	Because RES auto updates and is hosted from a central server, I humbly request that if you intend to distribute your own
	modified Reddit Enhancement Suite, you name it something else and make it very clear to your users that it's your own
	branch and isn't related to mine.
	
	RES is updated very frequently, and I get lots of tech support questions/requests from people on outdated versions. If 
	you're distributing RES via your own means, those recipients won't always be on the latest and greatest, which makes 
	it harder for me to debug things and understand (at least with browsers that auto-update) whether or not people are on 
	a current version of RES.
	
	I can't legally hold you to any of this - I'm just asking out of courtesy.
	
	Thanks, I appreciate your consideration.  Without further ado, the all-important GPL Statement:

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var tokenizeCSS = 'ul.token-input-list-facebook { overflow: hidden; height: auto !important; height: 1%; width: 400px; border: 1px solid #96bfe8; cursor: text; font-size: 12px; font-family: Verdana; min-height: 1px; z-index: 1010; margin: 0; padding: 0; background-color: #fff; list-style-type: none; float: left; margin-right: 12px; }';
tokenizeCSS += '.optionsTable ul.token-input-list-facebook  {clear: left; float: none; margin-right: 0; }';
tokenizeCSS += 'ul.token-input-list-facebook li input { border: 0; width: 100px; padding: 3px 8px; background-color: white; margin: 2px 0; -webkit-appearance: caret; }';
tokenizeCSS += 'li.token-input-token-facebook { overflow: hidden;  height: auto !important;  height: 15px; margin: 3px; padding: 1px 3px; background-color: #eff2f7; color: #000; cursor: default; border: 1px solid #ccd5e4; font-size: 11px; border-radius: 5px; float: left; white-space: nowrap; }';
tokenizeCSS += 'li.token-input-token-facebook p { display: inline; padding: 0; margin: 0;}';
tokenizeCSS += 'li.token-input-token-facebook span { color: #a6b3cf; margin-left: 5px; font-weight: bold; cursor: pointer;}';
tokenizeCSS += 'li.token-input-selected-token-facebook { background-color: #5670a6; border: 1px solid #3b5998; color: #fff;}';
tokenizeCSS += 'li.token-input-input-token-facebook { float: left; margin: 0; padding: 0; list-style-type: none;}';
tokenizeCSS += 'div.token-input-dropdown-facebook { position: absolute; width: 400px; background-color: #fff; overflow: hidden; border-left: 1px solid #ccc; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; cursor: default; font-size: 11px; font-family: Verdana; z-index: 100000100; }';
tokenizeCSS += 'div.token-input-dropdown-facebook p { margin: 0; padding: 5px; font-weight: bold; color: #777;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul { margin: 0; padding: 0;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul li { background-color: #fff; padding: 3px; margin: 0; list-style-type: none;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul li.token-input-dropdown-item-facebook { background-color: #fff;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul li.token-input-dropdown-item2-facebook { background-color: #fff;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul li em { font-weight: bold; font-style: normal;}';
tokenizeCSS += 'div.token-input-dropdown-facebook ul li.token-input-selected-dropdown-item-facebook { background-color: #3b5998; color: #fff;}';


var guidersCSS = '.guider { background: #FFF; border: 1px solid #666; font-family: arial; position: absolute; outline: none; z-index: 100000005 !important; padding: 4px 12px; width: 500px; z-index: 100; -moz-box-shadow: 0 0 8px #111; -webkit-box-shadow: 0 0 8px #111; box-shadow: 0 0 8px #111; border-radius: 4px;}';
guidersCSS += '.guider_buttons { height: 36px; position: relative; width: 100%; }';
guidersCSS += '.guider_content { position: relative; }';
guidersCSS += '.guider_description { margin-bottom: 10px; }';
guidersCSS += '.guider_content h1 { color: #1054AA; float: left; font-size: 21px; }';
guidersCSS += '.guider_close { float: right; padding: 10px 0 0; }';
// guidersCSS += '.x_button { background-image: url(\'x_close_button.jpg\'); cursor: pointer; height: 13px; width: 13px; }';
guidersCSS += '.x_button { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAABe0lEQVQoFT2RT0/CQBDFd7tbqIULiAaMgK1ngSqFCyHwyaFANS1+BEDigRgIFORAQv/5lhI32eR1duY3b6Z0vvg+Ho+M0TAMGWPx5VBKCSH/OpPJ8OVyqaqKqqqcsSgKophKkpTUIBX6dDptNhuON13X7wq3F4RgkEQJnpCr1c9sNgOFhUHgebvpdNrpdNAiiiIwt1vPdd1er8c5D4IAvAjm8vl8LpebTCZ4SKXSu91+Mh7XajX1Jv17OMCs4PlBBCutVgvIwcBqGIZt269GvVqtwAalMUD8OiYhKGo2Tfv9w7Isw3jTNA3FOGiIHA6FLcByTIjn7dfrdaFwv1gsKuWSoigXntgAxxXGKYHx8WjUqL9gfMdxhta43+/LMpeYHITxled5h5FIquv6Exjw6rifw+Gw2+2ez2eMLOZF62w2a5pm+fEhaYRIu23O51+Kkkpyrn1lmRWLxcQrKmEG+vlZAwQaxRwXa0NUHHzE4i/7vh8TCSTEoEul0h9jNtRZlgw9UAAAAABJRU5ErkJggg==); cursor: pointer; height: 13px; width: 13px; }';
guidersCSS += '.guider_content p { clear: both; color: #333; font-size: 13px; }';
guidersCSS += '.guider_button { background: -moz-linear-gradient(top, #5CA9FF 0%, #3D79C3 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #5CA9FF), color-stop(100%, #3D79C3)); background-color: #4A95E0; border: solid 1px #4B5D7E; color: #FFF; cursor: pointer; display: inline-block; float: right; font-size: 75%; font-weight: bold; margin-left: 6px; min-width: 40px; padding: 3px 5px; text-align: center; text-decoration: none;border-radius: 2px; }';
guidersCSS += '#guider_overlay { background-color: #000; width: 100%; height: 100%; position: fixed; top: 0; left: 0; opacity: 0.5; filter: alpha(opacity=50); z-index: 1000; }';
/**
 * For optimization, the arrows image is inlined in the css below.
 *
 * To use your own arrows image, replace this background-image with your own arrows.
 * It should have four arrows, top, right, left, and down.
 */
guidersCSS += '.guider_arrow { width: 42px; height: 42px; position: absolute; display: none; background-repeat: no-repeat; z-index: 100000006 !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAACoCAMAAAChZYy6AAABelBMVEX///8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN+fn4zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPe3t4zMzMzMzN2dnYzMzMzMzPV1dUzMzMzMzMzMzMzMzMzMzN8fHwzMzOEhIQzMzPa2tozMzMzMzNtbW0zMzNzc3MzMzMzMzPR0dFtbW1xcXHS0tIzMzMzMzNxcXHh4eEzMzMzMzPi4uIzMzMzMzMzMzMzMzMzMzMzMzOEhITPz8+MjIwzMzMzMzMzMzOHh4czMzMzMzPZ2dkzMzMzMzPPz88zMzPW1tYzMzMzMzPV1dVvb28zMzMzMzMzMzOBgYEzMzPY2NiBgYHh4eHd3d3Nzc3o6OikpKQzMzPe3t7R0dEzMzPZ2dna2tqHh4czMzMzMzP///+41NW+AAAAfXRSTlMAAAECBA0HCBUfDhYsYy4gPU07CyF4PFCLjnVhA3ZMYC1PuxSMOmJ0jSscivBOGbY+eepVDDZ3Hrk/vgbuKn+yNLUJKOmxs+pZU7TwMgXcEhcmHRNun+SzNw+HvnJe6Eok50vsZArrpHFSNbyJ137v7ufmkyXv6F/s6qFWWFA9DhkAAAWkSURBVHhe7djpU+LKHsfh3ARiQBE0ioIIKoSwCKiAiAguuG+Ay7jv+z4uozNq/vebDub8OImdpOq8O3W+L62nPkVZZTc24aEokiQMjWUnaBNlCEcicb+5zhAeSy/mLYwhPDebPHY2iJjWxcvrBb4jZggLwn4i0NnRZAAL4k4S7SJu1sOCtHNtDBRtYByLgepjoIDn290+PEYENoPFQAFPR90+b3PY4kcYQ+VNSpgLZ/wp2kPhqIxHFRioeq+jUf7Ny+VXVtkcRcoUs6OpW37vIF0pm3MUUMwep7bXks4Kc2YCit2Pi8ur64x1iQSK39199rCUM0SfnrMvJdoAfdjgk5uWLf0PsLAT2P3MFsusSYcuDLv6bTGuGLfS2r+sXhGetvU12pkU7SFlioE2EbbUW2tPiG/gjatVDYEC7EHQARBHfykhjv7sCSkgho4g2I2BQAHaZYijI0OhwWC3owsghv4eCmhBoH+0IWz5veAOxpwiNAPEHcUfXoB6B3zYzmCg/rXxzy8juOL0KRsZm1sWNLc8NxZhPQTFRtKz79p0fTYdYSmCmogvfhT+aMn9QnIxPkERJO0Pe91DWjTBH+f9NEmQJrPdGQz8xsuTQIfTYkZ/4VQd0xUb1MgmOmMNTB1FEHJ2BCfP2+UoytZ3dUNWHW2qRr+yjmAIkx34KwrZnu/pOIrSKIrNQrT5KwrZ1h79KMpa7Q5b6KdWVDc7L0eV2V9KOQPR2mwjZCHqlqPKrKtXGfXJUUW2TZmdlqPKbIsyOxmFqDp7ox+FrF4UssNAR91eiGpmX3FROds/XBMNQ1Sd7bO5FqryKOrjIKqZneK9YT+K4rOn1ezj7RuXgSgmu6MXhU8beBCEH9t7XCaFolrZ2O6GIFysHeQhisnauU/+6e4ymV5JeRDQyDLFbPL5/spZWYUoJpuKFzez2etKmYUoJktby5aXwwwDX9qwWQ/NbpVK1jOQeEuZlujckrGbhBSncP+NJCnKYwhSJnqCZQ3BOrM/HokYgow9vJgeMwDr7V1O78fsnCEYC7oL78va0CpCR3dwMDAkXu3GoHRZ68PQ0NeFpgEbHd221lAPgtJwsAWgPCxsQ/Bvlx4eunoU1xge9gqKqWEfgjcAgaphv2sYoJqSHjrF2EV4ClA5OFTiRS6GigsI4ClpYsvF7OduYAcgji5tWTaT/MYDACylSy/Z5ycAGjRXOsze3xmiS9bM9dXlxQ99SpjOmIozubY99ahLqZy5XEkf7PG3U0c6lKRy7OpKnvO+8dHRVxyVux465c+EOa/PHR2dxFI1np7EURmbaLPfEm6W8IwmJUiEGUtDc5PP3T4PGCgWDygoFnd0to8DBorHQHVx4hyoPj4BqoWdIg4k9oFq4lgHX1hfBqCJj5Ozc8YOeEseDniD14bxy8j4Ffcv3f/UI9HUP1ZR9OUpR6MvT7qUyp1ZS6UtlvaQGArSzGQOXyxlK03pUA9brlxns5vFeMpEfkfhJKBXK86r++dktoj+IZX3HfWkVtLJy7sn/pOzW00klqKoP3+wdiEIG7uxxnrIqilpSmW4vW3xQH4I2PpaUFZFIRr28lOCuJ3+NsgqKYqaM9zb7SOiC65TyKooRNGGIauiKGrhfNEjBFEWPq2KUjQT9rpHJQhZJZWjzb7oq0x7XTYHyqopijZAFGVbpayCQnQSKGQVFEWb3NNCzW6qWSWFqDqroBCtWY+craXVaPuMjCBrR9laWo3Oyway3ShbS6VohxyF/QpVszVUinaiqDrbJWa/KEQH1PRnTZaA6DgCGlkCE5U3Ego67GYpS2CikB2Us0Q16oQoLosoVYeiCQGzITlLyNFzHB0JBJ1SlpCiMRTFZ2NdjJglqtHACZ7+/sqix7/8MY+i+KwbPQCQ0pNisrCvRf8UPtCTYvWhcl3Q3Hv1odL48+f/AZYqoYKwlk9uAAAAAElFTkSuQmCC); }  ';
guidersCSS += '.guider_arrow_right { display: block; background-position: 0 0; right: -42px; }';
guidersCSS += '.guider_arrowdown { display: block; background-position: 0 -42px; bottom: -42px; }';
guidersCSS += '.guider_arrow_up { display: block; background-position: 0 -126px; top: -42px; }';
guidersCSS += '.guider_arrow_left { display: block; background-position: 0 -84px; left: -42px;}';
guidersCSS += '.guider_content h2 { margin-top: 1em; }';
guidersCSS += '.guider_content td  { vertical-align: top; }';
guidersCSS += '.guider_content td + td { padding-left: 1em; }';
guidersCSS += '.guider_content td code { white-space: nowrap; }';



// DOM utility functions
var escapeLookups = {
	"&": "&amp;",
	'"': "&quot;",
	"<": "&lt;",
	">": "&gt;"
};

function escapeHTML(str) {
	return (typeof str === 'undefined' || str === null) ?
		null :
		str.toString().replace(/[&"<>]/g, function(m) {
			return escapeLookups[m];
		});
}

function insertAfter(referenceNode, newNode) {
	if ((typeof referenceNode === 'undefined') || (referenceNode === null)) {
		console.log(arguments.callee.caller);
	} else if ((typeof referenceNode.parentNode !== 'undefined') && (typeof referenceNode.nextSibling !== 'undefined')) {
		if (referenceNode.parentNode === null) {
			console.log(arguments.callee.caller);
		} else {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}
}

function createElementWithID(elementType, id, classname) {
	var obj = document.createElement(elementType);
	if (id !== null) {
		obj.setAttribute('id', id);
	}
	if ((typeof classname !== 'undefined') && (classname !== '')) {
		obj.setAttribute('class', classname);
	}
	return obj;
}

// this alias is to account for opera having different behavior...
if (typeof navigator === 'undefined') {
	navigator = window.navigator;
}

//Because Safari 5.1 doesn't have Function.bind
if (typeof Function.prototype.bind === 'undefined') {
	Function.prototype.bind = function(context) {
		var oldRef = this;
		return function() {
			return oldRef.apply(context || null, Array.prototype.slice.call(arguments));
		};
	};
}

var BrowserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) ||
			this.searchVersion(navigator.appVersion) ||
			"an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";

		// set up MutationObserver variable to take whichever is supported / existing...
		// unfortunately, this doesn't (currently) exist in Opera.
		// this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;
		// At the time of writing WebKit's mutation observer leaks entire pages on refresh so it needs to be disabled.
		this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;

		// null out MutationObserver to test legacy DOMNodeInserted
		// this.MutationObserver = null;
	},
	searchString: function(data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) !== -1) {
					return data[i].identity;
				}
			} else if (dataProp) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	},
	isChrome: function() {
		return typeof chrome !== 'undefined';
	},
	isFirefox: function() {
		return typeof self.on === 'function';
	},
	isOperaBlink: function() {
		return typeof chrome !== 'undefined' && BrowserDetect.browser === "Opera";
	},
	isOpera: function() {
		return typeof opera !== 'undefined';
	},
	isSafari: function() {
		return typeof safari !== 'undefined';
	},
	dataBrowser: [{
		string: navigator.userAgent,
		subString: "OPR/",
		identity: "Opera"
	}, {
		string: navigator.userAgent,
		subString: "Chrome",
		identity: "Chrome"
	}, {
		string: navigator.userAgent,
		subString: "OmniWeb",
		versionSearch: "OmniWeb/",
		identity: "OmniWeb"
	}, {
		string: navigator.vendor,
		subString: "Apple",
		identity: "Safari",
		versionSearch: "Version"
	}, {
		prop: window.opera,
		identity: "Opera",
		versionSearch: "Version"
	}, {
		string: navigator.vendor,
		subString: "iCab",
		identity: "iCab"
	}, {
		string: navigator.vendor,
		subString: "KDE",
		identity: "Konqueror"
	}, {
		string: navigator.userAgent,
		subString: "Firefox",
		identity: "Firefox"
	}, {
		string: navigator.vendor,
		subString: "Camino",
		identity: "Camino"
	}, { // for newer Netscapes (6+)
		string: navigator.userAgent,
		subString: "Netscape",
		identity: "Netscape"
	}, {
		string: navigator.userAgent,
		subString: "MSIE",
		identity: "Explorer",
		versionSearch: "MSIE"
	}, {
		string: navigator.userAgent,
		subString: "Gecko",
		identity: "Mozilla",
		versionSearch: "rv"
	}, {
		// for older Netscapes (4-)
		string: navigator.userAgent,
		subString: "Mozilla",
		identity: "Netscape",
		versionSearch: "Mozilla"
	}],
	dataOS: [{
		string: navigator.platform,
		subString: "Win",
		identity: "Windows"
	}, {
		string: navigator.platform,
		subString: "Mac",
		identity: "Mac"
	}, {
		string: navigator.userAgent,
		subString: "iPhone",
		identity: "iPhone/iPod"
	}, {
		string: navigator.platform,
		subString: "Linux",
		identity: "Linux"
	}]

};
BrowserDetect.init();

var safeJSON = {
	// safely parses JSON and won't kill the whole script if JSON.parse fails
	// if localStorageSource is specified, will offer the user the ability to delete that localStorageSource to stop further errors.
	// if silent is specified, it will fail silently...
	parse: function(data, localStorageSource, silent) {
		try {
			if (BrowserDetect.isSafari()) {
				if (data.substring(0, 2) === 's{') {
					data = data.substring(1, data.length);
				}
			}
			return JSON.parse(data);
		} catch (error) {
			if (silent) {
				return {};
			}
			if (localStorageSource) {
				var msg = 'Error caught: JSON parse failure on the following data from "' + localStorageSource + '": <textarea rows="5" cols="50">' + data + '</textarea><br>RES can delete this data to stop errors from happening, but you might want to copy/paste it to a text file so you can more easily re-enter any lost information.';
				alert(msg, function() {
					// back up a copy of the corrupt data
					localStorage.setItem(localStorageSource + '.error', data);
					// delete the corrupt data
					RESStorage.removeItem(localStorageSource);
				});
			} else {
				alert('Error caught: JSON parse failure on the following data: ' + data);
			}
			return {};
		}
	}
};

// array compare utility function for keyCode arrays

function keyArrayCompare(fromArr, toArr) {
	// if we've passed in a number, fix that and make it an array with alt, shift and ctrl set to false.
	if (typeof toArr === 'number') {
		toArr = [toArr, false, false, false];
	} else if (toArr.length === 4) {
		toArr.push(false);
	}
	if (fromArr.length !== toArr.length) {
		return false;
	}
	for (var i = 0; i < toArr.length; i++) {
		if (fromArr[i].compare) {
			if (!fromArr[i].compare(toArr[i])) {
				return false;
			}
		}
		if (fromArr[i] !== toArr[i]) {
			return false;
		}
	}
	return true;
}

// utility function for checking events against keyCode arrays

function checkKeysForEvent(event, keyArray) {
	//[keycode, alt, ctrl, shift, meta]
	// if we've passed in a number, fix that and make it an array with alt, shift and ctrl set to false.
	if (typeof keyArray === 'number') {
		keyArray = [keyArray, false, false, false, false];
	} else if (keyArray.length === 4) {
		keyArray.push(false);
	}
	if (event.keyCode != keyArray[0]) {
		return false;
	} else if (event.altKey != keyArray[1]) {
		return false;
	} else if (event.ctrlKey != keyArray[2]) {
		return false;
	} else if (event.shiftKey != keyArray[3]) {
		return false;
	} else if (event.metaKey != keyArray[4]) {
		return false;
	} else {
		return true;
	}
}

function operaUpdateCallback(obj) {
	RESUtils.compareVersion(obj);
}

function operaForcedUpdateCallback(obj) {
	RESUtils.compareVersion(obj, true);
}

// This object will store xmlHTTPRequest callbacks for Safari because Safari's extension architecture seems stupid.
// This really shouldn't be necessary, but I can't seem to hold on to an onload function that I pass to the background page...
xhrQueue = {
	count: 0,
	onloads: []
};


// if this is a jetpack addon, add an event listener like Safari's message handler...
if (BrowserDetect.isFirefox()) {
	self.on('message', function(msgEvent) {
		switch (msgEvent.name) {
			case 'GM_xmlhttpRequest':
				// Fire the appropriate onload function for this xmlhttprequest.
				xhrQueue.onloads[msgEvent.XHRID](msgEvent.response);
				break;
			case 'compareVersion':
				var forceUpdate = false;
				if (typeof msgEvent.message.forceUpdate !== 'undefined') forceUpdate = true;
				RESUtils.compareVersion(msgEvent.message, forceUpdate);
				break;
			case 'loadTweet':
				var tweet = msgEvent.response;
				var thisExpando = modules['styleTweaks'].tweetExpando;
				$(thisExpando).html(tweet.html);
				thisExpando.style.display = 'block';
				thisExpando.classList.add('twitterLoaded');
				break;
				// for now, commenting out the old way of handling tweets as AMO will not approve.
				/*				
				var tweet = msgEvent.response;
				var thisExpando = modules['styleTweaks'].tweetExpando;
				thisExpando.innerHTML = '';
				// the iframe is to sandbox this remote javascript from accessing reddit's javascript, etc.
				// this is done this way as requested by the AMO review team.
				var sandboxFrame = document.createElement('iframe');
				var seamless = document.createAttribute('seamless');
				sandboxFrame.setAttribute('sandbox','allow-scripts allow-same-origin');
				sandboxFrame.setAttributeNode(seamless);
				sandboxFrame.setAttribute('style','border: none;');
				sandboxFrame.setAttribute('width','480');
				sandboxFrame.setAttribute('height','260');
				sandboxFrame.setAttribute('src','data:text/html,<html><head><base href="https://platform.twitter.com"></head><body>'+encodeURIComponent(tweet.html)+"</body></html>");
				$(thisExpando).append(sandboxFrame);
				// $(thisExpando).html(tweet.html);
				thisExpando.style.display = 'block';
				thisExpando.classList.add('twitterLoaded');
				*/
			case 'getLocalStorage':
				// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
				// old school localStorage from the foreground page to the background page to keep their settings...
				if (typeof msgEvent.message.importedFromForeground === 'undefined') {
					// it doesn't exist.. copy it over...
					var thisJSON = {
						requestType: 'saveLocalStorage',
						data: localStorage
					};
					self.postMessage(thisJSON);
				} else {
					setUpRESStorage(msgEvent.message);
					//RESInit();
				}
				break;
			case 'saveLocalStorage':
				// Okay, we just copied localStorage from foreground to background, let's set it up...
				setUpRESStorage(msgEvent.message);
				break;
			case 'localStorage':
				RESStorage.setItem(msgEvent.itemName, msgEvent.itemValue, true);
				break;
			default:
				// console.log('unknown event type in self.on');
				// console.log(msgEvent.toSource());
				break;
		}
	});
}

// This is the message handler for Safari - the background page calls this function with return data...

function safariMessageHandler(msgEvent) {
	switch (msgEvent.name) {
		case 'GM_xmlhttpRequest':
			// Fire the appropriate onload function for this xmlhttprequest.
			xhrQueue.onloads[msgEvent.message.XHRID](msgEvent.message);
			break;
		case 'compareVersion':
			var forceUpdate = false;
			if (typeof msgEvent.message.forceUpdate !== 'undefined') forceUpdate = true;
			RESUtils.compareVersion(msgEvent.message, forceUpdate);
			break;
		case 'loadTweet':
			var tweet = msgEvent.message;
			var thisExpando = modules['styleTweaks'].tweetExpando;
			$(thisExpando).html(tweet.html);
			thisExpando.style.display = 'block';
			thisExpando.classList.add('twitterLoaded');
			break;
		case 'getLocalStorage':
			// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
			// old schol localStorage from the foreground page to the background page to keep their settings...
			if (typeof msgEvent.message.importedFromForeground === 'undefined') {
				// it doesn't exist.. copy it over...
				var ls = {};
				for (var i = 0, len = localStorage.length; i < len; i++) {
					if (localStorage.key(i)) {
						ls[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
					}
				}
				var thisJSON = {
					requestType: 'saveLocalStorage',
					data: ls
				};
				safari.self.tab.dispatchMessage('saveLocalStorage', thisJSON);
			} else {
				setUpRESStorage(msgEvent.message);
				//RESInit();
			}
			break;
		case 'saveLocalStorage':
			// Okay, we just copied localStorage from foreground to background, let's set it up...
			setUpRESStorage(msgEvent.message);
			//RESInit();
			break;
		case 'addURLToHistory':
			var url = msgEvent.message.url;
			modules['showImages'].imageTrackFrame.contentWindow.location.replace(url);
			break;
		case 'localStorage':
			RESStorage.setItem(msgEvent.message.itemName, msgEvent.message.itemValue, true);
			break;
		default:
			// console.log('unknown event type in safariMessageHandler');
			break;
	}
}

// This is the message handler for Opera - the background page calls this function with return data...

function operaMessageHandler(msgEvent) {
	var eventData = msgEvent.data;
	switch (eventData.msgType) {
		case 'GM_xmlhttpRequest':
			// Fire the appropriate onload function for this xmlhttprequest.
			xhrQueue.onloads[eventData.XHRID](eventData.data);
			break;
		case 'compareVersion':
			var forceUpdate = false;
			if (typeof eventData.data.forceUpdate !== 'undefined') forceUpdate = true;
			RESUtils.compareVersion(eventData.data, forceUpdate);
			break;
		case 'loadTweet':
			var tweet = eventData.data;
			var thisExpando = modules['styleTweaks'].tweetExpando;
			$(thisExpando).html(tweet.html);
			thisExpando.style.display = 'block';
			thisExpando.classList.add('twitterLoaded');
			break;
		case 'getLocalStorage':
			// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
			// old schol localStorage from the foreground page to the background page to keep their settings...
			if (typeof eventData.data.importedFromForeground === 'undefined') {
				// it doesn't exist.. copy it over...
				var thisJSON = {
					requestType: 'saveLocalStorage',
					data: localStorage
				};
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				if (location.hostname.indexOf('reddit') !== -1) {
					setUpRESStorage(eventData.data);
					//RESInit();
				}
			}
			break;
		case 'saveLocalStorage':
			// Okay, we just copied localStorage from foreground to background, let's set it up...
			setUpRESStorage(eventData.data);
			if (location.hostname.indexOf('reddit') !== -1) {
				//RESInit();
			}
			break;
		case 'localStorage':
			if ((typeof RESStorage !== 'undefined') && (typeof RESStorage.setItem === 'function')) {
				RESStorage.setItem(eventData.itemName, eventData.itemValue, true);
			} else {
				// a change in opera requires this wait/timeout for the RESStorage grab to work...
				var waitForRESStorage = function(eData) {
					if ((typeof RESStorage !== 'undefined') && (typeof RESStorage.setItem === 'function')) {
						RESStorage.setItem(eData.itemName, eData.itemValue, true);
					} else {
						setTimeout(function() {
							waitForRESStorage(eData);
						}, 200);
					}
				};
				var savedEventData = {
					itemName: eventData.itemName,
					itemValue: eventData.itemValue
				};
				waitForRESStorage(savedEventData);
			}
			break;
		case 'addURLToHistory':
			var url = eventData.url;
			if (!eventData.isPrivate) {
				modules['showImages'].imageTrackFrame.contentWindow.location.replace(url);
			}
			break;
		default:
			// console.log('unknown event type in operaMessageHandler');
			break;
	}
}

// listen for messages from chrome background page
if (BrowserDetect.isChrome()) {
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			switch (request.requestType) {
				case 'localStorage':
					RESStorage.setItem(request.itemName, request.itemValue, true);
					break;
				default:
					// sendResponse({status: "unrecognized request type"});
					break;
			}
		}
	);
}

if (BrowserDetect.isSafari()) {
	// Safari has a ridiculous bug that causes it to lose access to safari.self.tab if you click the back button.
	// this stupid one liner fixes that.
	window.onunload = function() {};
	safari.self.addEventListener("message", safariMessageHandler, false);
}
// we can't do this check for opera here because we need to wait until DOMContentLoaded is triggered, I think.  Putting this in RESinit();

// opera compatibility
if (BrowserDetect.isOpera()) {
	// removing this line for new localStorage methodology (store in extension localstorage)
	sessionStorage = window.sessionStorage;
	localStorage = window.localStorage;
	location = window.location;
	XMLHttpRequest = window.XMLHttpRequest;
}

// Firebug stopped showing console.log for some reason. Need to use unsafeWindow if available. Not sure if this was due to a Firebug version update or what.
if (typeof unsafeWindow !== 'undefined') {
	if ((typeof unsafeWindow.console !== 'undefined') && (!BrowserDetect.isFirefox())) {
		console = unsafeWindow.console;
	} else if (typeof console === 'undefined') {
		console = {
			log: function(str) {
				return false;
			}
		};
	}
}



// GreaseMonkey API compatibility for non-GM browsers (Chrome, Safari, Firefox)
// @copyright      2009, 2010 James Campos
// @modified		2010 Steve Sobel - added some missing gm_* functions
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_deleteValue === 'undefined') || (typeof GM_addStyle === 'undefined')) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		var head = document.getElementsByTagName('head')[0];
		if (head) {
			head.appendChild(style);
		}
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value === 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};

	GM_log = function(message) {
		console.log(message);
	};

	GM_registerMenuCommand = function(name, funk) {
		//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};

	if (BrowserDetect.browser === "Explorer") {
		GM_xmlhttpRequest = function(obj) {
			var request,
				crossDomain = (obj.url.indexOf(location.hostname) === -1);
			if ((typeof obj.onload !== 'undefined') && (crossDomain)) {
				obj.requestType = 'GM_xmlhttpRequest';
				request = new XDomainRequest();
				request.onload = function() {
					obj.onload(request);
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				request.open(obj.method, obj.url);
				request.send(obj.data);
				return request;
			} else {
				request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (obj.onreadystatechange) {
						obj.onreadystatechange(request);
					}
					if (request.readyState === 4 && obj.onload) {
						obj.onload(request);
					}
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				try {
					request.open(obj.method, obj.url, true);
				} catch (e) {
					if (obj.onerror) {
						obj.onerror({
							readyState: 4,
							responseHeaders: '',
							responseText: '',
							responseXML: '',
							status: 403,
							statusText: 'Forbidden'
						});
					}
					return;
				}
				if (obj.headers) {
					for (var name in obj.headers) {
						request.setRequestHeader(name, obj.headers[name]);
					}
				}
				request.send(obj.data);
				return request;
			}
		};
	}
	if (BrowserDetect.isChrome()) {
		GM_xmlhttpRequest = function(obj) {
			var crossDomain = (obj.url.indexOf(location.hostname) === -1);

			if ((typeof obj.onload !== 'undefined') && (crossDomain)) {
				obj.requestType = 'GM_xmlhttpRequest';
				if (typeof obj.onload !== 'undefined') {
					chrome.runtime.sendMessage(obj, function(response) {
						obj.onload(response);
					});
				}
			} else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (obj.onreadystatechange) {
						obj.onreadystatechange(request);
					}
					if (request.readyState === 4 && obj.onload) {
						obj.onload(request);
					}
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				try {
					request.open(obj.method, obj.url, true);
				} catch (e) {
					if (obj.onerror) {
						obj.onerror({
							readyState: 4,
							responseHeaders: '',
							responseText: '',
							responseXML: '',
							status: 403,
							statusText: 'Forbidden'
						});
					}
					return;
				}
				if (obj.headers) {
					for (var name in obj.headers) {
						request.setRequestHeader(name, obj.headers[name]);
					}
				}
				request.send(obj.data);
				return request;
			}
		};
	} else if (BrowserDetect.isSafari()) {
		GM_xmlhttpRequest = function(obj) {
			obj.requestType = 'GM_xmlhttpRequest';
			// Since Safari doesn't provide legitimate callbacks, I have to store the onload function here in the main
			// userscript in a queue (see xhrQueue), wait for data to come back from the background page, then call the onload.

			// oy vey... another problem. When Safari sends xmlhttpRequests from the background page, it loses the cookies etc that it'd have 
			// had from the foreground page... so we need to write a bit of a hack here, and call different functions based on whether or 
			// not the request is cross domain... For same-domain requests, we'll call from the foreground...
			var crossDomain = (obj.url.indexOf(location.hostname) === -1);

			if ((typeof obj.onload !== 'undefined') && (crossDomain)) {
				obj.XHRID = xhrQueue.count;
				xhrQueue.onloads[xhrQueue.count] = obj.onload;

				// are you ready for a disgusting Safari hack due to stupid behavior added in 6.1 and 7?
				obj = JSON.parse(JSON.stringify(obj));
				// I hope you put on a bib for that. Safari won't let you pass a javascript object to the background page anymore.

				safari.self.tab.dispatchMessage("GM_xmlhttpRequest", obj);
				xhrQueue.count++;
			} else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (obj.onreadystatechange) {
						obj.onreadystatechange(request);
					}
					if (request.readyState === 4 && obj.onload) {
						obj.onload(request);
					}
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				try {
					request.open(obj.method, obj.url, true);
				} catch (e) {
					if (obj.onerror) {
						obj.onerror({
							readyState: 4,
							responseHeaders: '',
							responseText: '',
							responseXML: '',
							status: 403,
							statusText: 'Forbidden'
						});
					}
					return;
				}
				if (obj.headers) {
					for (var name in obj.headers) {
						request.setRequestHeader(name, obj.headers[name]);
					}
				}
				request.send(obj.data);
				return request;
			}
		};
	} else if (BrowserDetect.isOpera()) {
		GM_xmlhttpRequest = function(obj) {
			obj.requestType = 'GM_xmlhttpRequest';
			// Turns out, Opera works this way too, but I'll forgive them since their extensions are so young and they're awesome people...

			// oy vey... cross domain same issue with Opera.
			var crossDomain = (obj.url.indexOf(location.hostname) === -1);

			if ((typeof obj.onload !== 'undefined') && (crossDomain)) {
				obj.XHRID = xhrQueue.count;
				xhrQueue.onloads[xhrQueue.count] = obj.onload;
				opera.extension.postMessage(JSON.stringify(obj));
				xhrQueue.count++;
			} else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (obj.onreadystatechange) {
						obj.onreadystatechange(request);
					}
					if (request.readyState === 4 && obj.onload) {
						obj.onload(request);
					}
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				try {
					request.open(obj.method, obj.url, true);
				} catch (e) {
					if (obj.onerror) {
						obj.onerror({
							readyState: 4,
							responseHeaders: '',
							responseText: '',
							responseXML: '',
							status: 403,
							statusText: 'Forbidden'
						});
					}
					return;
				}
				if (obj.headers) {
					for (var name in obj.headers) {
						request.setRequestHeader(name, obj.headers[name]);
					}
				}
				request.send(obj.data);
				return request;
			}
		};
	} else if (BrowserDetect.isFirefox()) {
		// we must be in a Firefox / jetpack addon...
		GM_xmlhttpRequest = function(obj) {
			var crossDomain = (obj.url.indexOf(location.hostname) === -1);

			if ((typeof obj.onload !== 'undefined') && (crossDomain)) {
				obj.requestType = 'GM_xmlhttpRequest';
				// okay, firefox's jetpack addon does this same stuff... le sigh..
				if (typeof obj.onload !== 'undefined') {
					obj.XHRID = xhrQueue.count;
					xhrQueue.onloads[xhrQueue.count] = obj.onload;
					self.postMessage(obj);
					xhrQueue.count++;
				}
			} else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (obj.onreadystatechange) {
						obj.onreadystatechange(request);
					}
					if (request.readyState === 4 && obj.onload) {
						obj.onload(request);
					}
				};
				request.onerror = function() {
					if (obj.onerror) {
						obj.onerror(request);
					}
				};
				try {
					request.open(obj.method, obj.url, true);
				} catch (e) {
					if (obj.onerror) {
						obj.onerror({
							readyState: 4,
							responseHeaders: '',
							responseText: '',
							responseXML: '',
							status: 403,
							statusText: 'Forbidden'
						});
					}
					return;
				}
				if (obj.headers) {
					for (var name in obj.headers) {
						request.setRequestHeader(name, obj.headers[name]);
					}
				}
				request.send(obj.data);
				return request;
			}
		};
	}
} else {
	// this hack is to avoid an unsafeWindow error message if a gm_xhr is ever called as a result of a jQuery-induced ajax call.
	// yes, it's ugly, but it's necessary if we're using Greasemonkey together with jQuery this way.
	var oldgmx = GM_xmlhttpRequest;
	GM_xmlhttpRequest = function(params) {
		setTimeout(function() {
			oldgmx(params);
		}, 0);
	};
}


var modules = {};
function addModule(moduleID, defineModule) {
	var base = {
		moduleID: moduleID,
		moduleName: moduleID,
		category: 'General',
		options: {},
		description: '',
		isEnabled: function() {
			return RESConsole.getModulePrefs(this.moduleID);
		},
		isMatchURL: function() {
			return RESUtils.isMatchURL(this.moduleID);
		},
		include: [
			/^https?:\/\/([a-z]+)\.reddit\.com\/[\?]*/i
		],
		exclude: [],
		beforeLoad: function() { },
		go: function() { }
	};

	var module = defineModule.call(base, base, moduleID) || base;
	modules[moduleID] = module;
}

// define common RESUtils - reddit related functions and data that may need to be accessed...
var RESUtils = {
	preInit: function() {
		// we store a localStorage key because the async call is too slow to add classes to
		// the document prior to page load, thus the flash of unstyled content.
		RESUtils.getDocHTML();
	},
	// to avoid the flash of unstyled content, the very first thing we should do is get a hold
	// of the document object and add necessary classes...
	getDocHTML: function() {
		if (document) {
			document.html = document.documentElement;
			if (localStorage.getItem('RES_nightMode')) {
				// no need to check the background - we're in night mode for sure.
				modules['styleTweaks'].enableNightMode();
			}
		} else {
			setTimeout(RESUtils.getDocHTML, 1);
		}
	},
	// A cache variable to store CSS that will be applied at the end of execution...
	randomHash: function(len) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var numChars = len || 5;
		var randomString = '';
		for (var i = 0; i < numChars; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomString += chars.substring(rnum, rnum + 1);
		}
		return randomString;
	},
	hashCode: function(str) {
		var hash = 0,
			i, char;
		if (str.length === 0) return hash;
		for (i = 0, l = str.length; i < l; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	},
	postLoad: false,
	css: '',
	addCSS: function(css) {
		if (RESUtils.postLoad) {
			var style = $('<style />').html(css).appendTo('head');
			return {
				remove: function() {
					style.remove();
				}
			};
		} else {
			this.css += css;
		}
	},
	insertParam: function(href, key, value) {
		var pre = '&';
		if (href.indexOf('?') === -1) pre = '?';
		return href + pre + key + '=' + value;
	},
	// checks if script should run on current URL using exclude / include.
	isMatchURL: function(moduleID) {
		var i = 0;
		var currURL = location.href;
		var pageType = RESUtils.pageType();
		// get includes and excludes...
		var excludes = modules[moduleID].exclude;
		var includes = modules[moduleID].include;
		// first check excludes...
		if (typeof excludes !== 'undefined') {
			for (i = 0, len = excludes.length; i < len; i++) {
				var exclude = excludes[i];
				// console.log(moduleID + ' -- ' + excludes[i] + ' - excl test - ' + currURL + ' - result: ' + excludes[i].test(currURL));
				if (exclude.test && exclude.test(currURL) || exclude === pageType) {
					return false;
				}
			}
		}
		// then check includes...
		for (i = 0, len = includes.length; i < len; i++) {
			var include = includes[i];
			// console.log(moduleID + ' -- ' + includes[i] + ' - incl test - ' + currURL + ' - result: ' + includes[i].test(currURL));
			if (include.test && include.test(currURL) || include === pageType) {
				return true;
			}
		}
		return false;
	},
	// gets options for a module...
	getOptionsFirstRun: [],
	getOptions: function(moduleID) {
		if (this.getOptionsFirstRun[moduleID]) {
			// we've already grabbed these out of localstorage, so modifications should be done in memory. just return that object.
			return modules[moduleID].options;
		}
		var thisOptions = RESStorage.getItem('RESoptions.' + moduleID);
		if ((thisOptions) && (thisOptions !== 'undefined') && (thisOptions !== null)) {
			// merge options (in case new ones were added via code) and if anything has changed, update to localStorage
			var storedOptions = safeJSON.parse(thisOptions, 'RESoptions.' + moduleID);
			var codeOptions = modules[moduleID].options;
			var newOption = false;
			for (var attrname in codeOptions) {
				codeOptions[attrname].default = codeOptions[attrname].value;
				if (typeof storedOptions[attrname] === 'undefined') {
					newOption = true;
					storedOptions[attrname] = codeOptions[attrname];
				} else {
					codeOptions[attrname].value = storedOptions[attrname].value;
				}
			}
			modules[moduleID].options = codeOptions;
			if (newOption) {
				RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
			}
		} else {
			// nothing in localStorage, let's set the defaults...
			RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		}
		this.getOptionsFirstRun[moduleID] = true;
		return modules[moduleID].options;
	},
	getUrlParams: function() {
		var result = {}, queryString = location.search.substring(1),
			re = /([^&=]+)=([^&]*)/g,
			m;
		while ((m = re.exec(queryString))) {
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		return result;
	},
	setOption: function(moduleID, optionName, optionValue) {
		if (/_[\d]+$/.test(optionName)) {
			optionName = optionName.replace(/_[\d]+$/, '');
		}
		var thisOptions = this.getOptions(moduleID);
		var saveOptionValue;
		if (optionValue === '') {
			saveOptionValue = '';
		} else if ((isNaN(optionValue)) || (typeof optionValue === 'boolean') || (typeof optionValue === 'object')) {
			saveOptionValue = optionValue;
		} else if (optionValue.indexOf('.') !== -1) {
			saveOptionValue = parseFloat(optionValue);
		} else {
			saveOptionValue = parseInt(optionValue, 10);
		}
		thisOptions[optionName].value = saveOptionValue;
		// save it to the object...
		modules[moduleID].options = thisOptions;
		// save it to RESStorage...
		RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		return true;
	},
	click: function(obj, button) {
		var evt = document.createEvent('MouseEvents');
		button = button || 0;
		evt.initMouseEvent('click', true, true, window.wrappedJSObject, 0, 1, 1, 1, 1, false, false, false, false, button, null);
		obj.dispatchEvent(evt);
	},
	mousedown: function(obj, button) {
		var evt = document.createEvent('MouseEvents');
		button = button || 0;
		evt.initMouseEvent('mousedown', true, true, window.wrappedJSObject, 0, 1, 1, 1, 1, false, false, false, false, button, null);
		obj.dispatchEvent(evt);
	},
	loggedInUser: function(tryingEarly) {
		if (typeof this.loggedInUserCached === 'undefined') {
			var userLink = document.querySelector('#header-bottom-right > span.user > a');
			if ((userLink !== null) && (!userLink.classList.contains('login-required'))) {
				this.loggedInUserCached = userLink.textContent;
				// HERE BE DRAGONS
				// this.verifyHash(this.loggedInUserCached);
				this.loggedInUserHashCached = document.querySelector('[name=uh]').value;
			} else {
				if (tryingEarly) {
					// trying early means we're trying before DOM load may be complete, so if we fail here
					// we don't want to null this, we want to allow another try.
					// currently the only place this is really used is username hider, which tries (if possible)
					// to hide the username as early/fast as possible.
					delete this.loggedInUserCached;
					delete this.loggedInUserHashCached;
				} else {
					this.loggedInUserCached = null;
				}
			}
		}
		return this.loggedInUserCached;
	},
	loggedInUserHash: function() {
		this.loggedInUser();
		return this.loggedInUserHashCached;
	},
	problemHashes: [991658920,3385400],
	getUserInfo: function(callback, username, live) {
		// Default to currently logged-in user, for backwards compatibility
		username = (typeof username !== "undefined" ? username : RESUtils.loggedInUser());
		if (username === null) return false;

		// Default to getting live data (i.e. from reddit's server)
		live = (typeof live === "boolean" ? live : true);

		if (!(username in RESUtils.userInfoCallbacks)) {
			RESUtils.userInfoCallbacks[username] = [];
		}
		RESUtils.userInfoCallbacks[username].push(callback);
		var cacheData = RESStorage.getItem('RESUtils.userInfoCache.' + username) || '{}';
		var userInfoCache = safeJSON.parse(cacheData);
		var lastCheck = (userInfoCache !== null) ? parseInt(userInfoCache.lastCheck, 10) || 0 : 0;
		var now = Date.now();
		// 300000 = 5 minutes
		if (live && (now - lastCheck) > 300000) {
			if (!RESUtils.userInfoRunning) {
				RESUtils.userInfoRunning = true;
				GM_xmlhttpRequest({
					method: "GET",
					url: location.protocol + "//" + location.hostname + "/user/" + encodeURIComponent(username) + "/about.json?app=res",
					onload: function(response) {
						try {
							var thisResponse = JSON.parse(response.responseText);
						} catch (e) {
							console.log('Error parsing response from reddit');
							console.log(response.responseText);
							return false;
						}
						var userInfoCache = {
							lastCheck: now,
							userInfo: thisResponse
						};
						RESStorage.setItem('RESUtils.userInfoCache.' + username, JSON.stringify(userInfoCache));
						while (RESUtils.userInfoCallbacks[username].length > 0) {
							var thisCallback = RESUtils.userInfoCallbacks[username].pop();
							thisCallback(userInfoCache.userInfo);
						}
						RESUtils.userInfoRunning = false;
					}
				});
			}
		} else {
			while (RESUtils.userInfoCallbacks[username].length > 0) {
				var thisCallback = RESUtils.userInfoCallbacks[username].pop();
				thisCallback(userInfoCache.userInfo);
			}
		}
	},
	userInfoCallbacks: {},
	commentsRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/[-\w\.\/]*comments\/?[-\w\.\/]*/i,
	friendsCommentsRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/r\/friends\/*comments\/?/i,
	inboxRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/message\/[-\w\.\/]*/i,
	profileRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/user\/[-\w\.#=]*\/?(comments)?\/?(\?([a-z]+=[a-zA-Z0-9_%]*&?)*)?$/i, // fix to regex contributed by s_quark
	submitRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/([-\w\.\/]*\/)?submit\/?(\?.*)?$/i,
	prefsRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/prefs\/?/i,
	wikiRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/r\/[-\w\.]+\/wiki?/i,
	verifyHash: function(hash) {
		if ($.inArray(RESUtils.hashCode(hash), RESUtils.problemHashes) !== -1) {
			throw "Error";
		}
	},
	pageType: function() {
		if (typeof this.pageTypeSaved === 'undefined') {
			var pageType = '';
			var currURL = location.href.split('#')[0];
			if (RESUtils.profileRegex.test(currURL)) {
				pageType = 'profile';
			} else if ((RESUtils.commentsRegex.test(currURL)) || (RESUtils.friendsCommentsRegex.test(currURL))) {
				pageType = 'comments';
			} else if (RESUtils.inboxRegex.test(currURL)) {
				pageType = 'inbox';
			} else if (RESUtils.submitRegex.test(currURL)) {
				pageType = 'submit';
			} else if (RESUtils.prefsRegex.test(currURL)) {
				pageType = 'prefs';
			} else if (RESUtils.wikiRegex.test(currURL)) {
				pageType = 'wiki';
			} else {
				pageType = 'linklist';
			}
			this.pageTypeSaved = pageType;
		}
		return this.pageTypeSaved;
	},
	commentPermalinkRegex: /^https?:\/\/([a-z]+)\.reddit\.com\/[-\w\.\/]*comments\/[a-z0-9]+\/[^\/]+\/[a-z0-9]+\/?$/i,
	isCommentPermalinkPage: function() {
		if (typeof this.isCommentPermalinkSaved === 'undefined') {
			var currURL = location.href.split('#')[0];
			if (RESUtils.commentPermalinkRegex.test(currURL)) {
				this.isCommentPermalinkSaved = true;
			} else {
				this.isCommentPermalinkSaved = false;
			}
		}

		return this.isCommentPermalinkSaved;
	},
	matchRE: /^https?:\/\/(?:[a-z]+)\.reddit\.com\/r\/([\w\.\+]+).*/i,
	matchDOM: /^https?:\/\/(?:[a-z]+)\.reddit\.com\/domain\/([\w\.\+]+).*/i,
	currentSubreddit: function(check) {
		if (typeof this.curSub === 'undefined') {
			var match = location.href.match(RESUtils.matchRE);
			if (match !== null) {
				this.curSub = match[1];
				if (check) return (match[1].toLowerCase() === check.toLowerCase());
				return match[1];
			} else {
				if (check) return false;
				return null;
			}
		} else {
			if (check) return (this.curSub.toLowerCase() === check.toLowerCase());
			return this.curSub;
		}
	},
	currentDomain: function(check) {
		if (typeof this.curDom === 'undefined') {
			var match = location.href.match(RESUtils.matchDOM);
			if (match !== null) {
				this.curDom = match[1];
				if (check) return (match[1].toLowerCase() === check.toLowerCase());
				return match[1];
			} else {
				if (check) return false;
				return null;
			}
		} else {
			if (check) return (this.curDom.toLowerCase() === check.toLowerCase());
			return this.curDom;
		}
	},
	currentUserProfile: function() {
		if (typeof this.curUserProfile === 'undefined') {
			var match = location.href.match(/^https?:\/\/(?:[a-z]+)\.reddit\.com\/user\/([\w\.]+).*/i);
			if (match !== null) {
				this.curUserProfile = match[1];
				return match[1];
			} else {
				return null;
			}
		} else {
			return this.curUserProfile;
		}
	},
	getXYpos: function(obj) {
		var topValue = 0,
			leftValue = 0;
		while (obj) {
			leftValue += obj.offsetLeft;
			topValue += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {
			'x': leftValue,
			'y': topValue
		};
	},
	elementInViewport: function(obj) {
		// check the headerOffset - if we've pinned the subreddit bar, we need to add some pixels so the "visible" stuff is lower down the page.
		var headerOffset = this.getHeaderOffset();
		var top = obj.offsetTop - headerOffset;
		var left = obj.offsetLeft;
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		while (obj.offsetParent) {
			obj = obj.offsetParent;
			top += obj.offsetTop;
			left += obj.offsetLeft;
		}
		return (
			top >= window.pageYOffset &&
			left >= window.pageXOffset &&
			(top + height) <= (window.pageYOffset + window.innerHeight - headerOffset) &&
			(left + width) <= (window.pageXOffset + window.innerWidth)
		);
	},
	setMouseXY: function(e) {
		e = e || window.event;
		var cursor = {
			x: 0,
			y: 0
		};
		if (e.pageX || e.pageY) {
			cursor.x = e.pageX;
			cursor.y = e.pageY;
		} else {
			cursor.x = e.clientX +
				(document.documentElement.scrollLeft ||
				document.body.scrollLeft) -
				document.documentElement.clientLeft;
			cursor.y = e.clientY +
				(document.documentElement.scrollTop ||
				document.body.scrollTop) -
				document.documentElement.clientTop;
		}
		RESUtils.mouseX = cursor.x;
		RESUtils.mouseY = cursor.y;
	},
	elementUnderMouse: function(obj) {
		var $obj = $(obj),
			top = $obj.offset().top,
			left = $obj.offset().left,
			width = $obj.outerWidth(),
			height = $obj.outerHeight(),
			right = left + width,
			bottom = top + height;
		if ((RESUtils.mouseX >= left) && (RESUtils.mouseX <= right) && (RESUtils.mouseY >= top) && (RESUtils.mouseY <= bottom)) {
			return true;
		} else {
			return false;
		}
	},
	doElementsCollide: function(ele1, ele2, margin) {
		margin = margin || 0;
		ele1 = $(ele1);
		ele2 = $(ele2);

		var dims1 = ele1.offset();
		dims1.right = dims1.left + ele1.width();
		dims1.bottom = dims1.top + ele1.height();

		dims1.left -= margin;
		dims1.top -= margin;
		dims1.right += margin;
		dims1.bottom += margin;


		var dims2 = ele2.offset();
		dims2.right = dims2.left + ele2.width();
		dims2.bottom = dims2.top + ele2.height();

		if (
			(
				(dims1.left < dims2.left && dims2.left < dims1.right) ||
				(dims1.left < dims2.right && dims2.right < dims1.right) ||
				(dims2.left < dims1.left && dims1.left < dims2.right) ||
				(dims2.left < dims1.right && dims1.right < dims2.right)
			) &&
			(
				(dims1.top < dims2.top && dims2.top < dims1.bottom) ||
				(dims1.top < dims2.bottom && dims2.bottom < dims1.bottom) ||
				(dims2.top < dims1.top && dims1.top < dims2.bottom) ||
				(dims2.top < dims1.bottom && dims1.bottom < dims2.bottom))
		) {
			// In layman's terms:
			// If one of the box's left/right borders is between the other box's left/right
			// and same with top/bottom,
			// then they collide.  
			// This could probably be logicked into a more compact form.

			return true;
		}

		return false;
	},
	scrollTo: function(x, y) {
		var headerOffset = this.getHeaderOffset();
		window.scrollTo(x, y - headerOffset);
	},
	getHeaderOffset: function() {
		if (typeof this.headerOffset === 'undefined') {
			this.headerOffset = 0;
			switch (modules['betteReddit'].options.pinHeader.value) {
				case 'none':
					break;
				case 'sub':
					this.theHeader = document.querySelector('#sr-header-area');
					break;
				case 'subanduser':
					this.theHeader = document.querySelector('#sr-header-area');
					break;
				case 'header':
					this.theHeader = document.querySelector('#header');
					break;
			}
			if (this.theHeader) {
				this.headerOffset = this.theHeader.offsetHeight + 6;
			}
		}
		return this.headerOffset;
	},
	setSelectValue: function(obj, value) {
		for (var i = 0, len = obj.length; i < len; i++) {
			// for some reason in firefox, obj[0] is undefined... weird. adding a test for existence of obj[i]...
			// okay, now as of ff8, it's even barfing here unless we console.log out a check - nonsensical.
			// a bug has been filed to bugzilla at:
			// https://bugzilla.mozilla.org/show_bug.cgi?id=702847
			if ((obj[i]) && (obj[i].value == value)) {
				obj[i].selected = true;
			}
		}
	},
	stripHTML: function(str) {
		var regExp = /<\/?[^>]+>/gi;
		str = str.replace(regExp, "");
		return str;
	},
	sanitizeHTML: function(htmlStr) {
		if (!this.sanitizer) {
			var SnuOwnd = window.SnuOwnd;
			var redditCallbacks = SnuOwnd.getRedditCallbacks();
			var callbacks = SnuOwnd.createCustomCallbacks({
				paragraph: function(out, text, options) {
					if (text) out.s += text.s;
				},
				autolink: redditCallbacks.autolink,
				raw_html_tag: redditCallbacks.raw_html_tag
			});
			var rendererConfig = SnuOwnd.defaultRenderState();
			rendererConfig.flags = SnuOwnd.DEFAULT_WIKI_FLAGS;
			rendererConfig.html_element_whitelist = [
				'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'code',
				'br', 'hr', 'p', 'a', 'img', 'pre', 'blockquote', 'table',
				'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'strong', 'em',
				'i', 'b', 'u', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
				'font', 'center', 'small', 's', 'q', 'sub', 'sup', 'del'
			];
			rendererConfig.html_attr_whitelist = [
				'href', 'title', 'src', 'alt', 'colspan',
				'rowspan', 'cellspacing', 'cellpadding', 'scope',
				'face', 'color', 'size', 'bgcolor', 'align'
			];
			this.sanitizer = SnuOwnd.getParser({
				callbacks: callbacks,
				context: rendererConfig
			});
		}
		return this.sanitizer.render(htmlStr);
	},
	firstValid: function() {
		for (var i = 0, len = arguments.length; i < len; i++) {
			var argument = arguments[i];
			
			if (argument === void 0) continue;
			if (argument == null) continue;
			if (typeof argument == "number" && isNaN(argument)) continue;

			return arguments[i];
		}
	},
	fadeElementOut: function(obj, speed, callback) {
		if (obj.getAttribute('isfading') === 'in') {
			return false;
		}
		obj.setAttribute('isfading', 'out');
		speed = speed || 0.1;
		if (obj.style.opacity === '') obj.style.opacity = '1';
		if (obj.style.opacity <= 0) {
			obj.style.display = 'none';
			obj.setAttribute('isfading', false);
			if (callback) callback();
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) - speed;
			if (newOpacity < speed) newOpacity = 0;
			obj.style.opacity = newOpacity;
			setTimeout(function() {
				RESUtils.fadeElementOut(obj, speed, callback);
			}, 100);
		}
	},
	fadeElementIn: function(obj, speed, finalOpacity) {
		finalOpacity = finalOpacity || 1;
		if (obj.getAttribute('isfading') === 'out') {
			return false;
		}
		obj.setAttribute('isfading', 'in');
		speed = speed || 0.1;
		if ((obj.style.display === 'none') || (obj.style.display === '')) {
			obj.style.opacity = 0;
			obj.style.display = 'block';
		}
		if (obj.style.opacity >= finalOpacity) {
			obj.setAttribute('isfading', false);
			obj.style.opacity = finalOpacity;
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) + parseFloat(speed);
			if (newOpacity > finalOpacity) newOpacity = finalOpacity;
			obj.style.opacity = newOpacity;
			setTimeout(function() {
				RESUtils.fadeElementIn(obj, speed, finalOpacity);
			}, 100);
		}
	},
	setCursorPosition: function(form, pos) {
		elem = $(form)[0];
		if (!elem) return;

		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}

		return form;
	},
	setNewNotification: function() {
		$('#RESSettingsButton, #RESMainGearOverlay .gearIcon').addClass('newNotification').click(function() {
			location.href = '/r/RESAnnouncements';
		});
	},
	createMultiLock: function() {
		var locks = {};
		var count = 0;

		return {
			lock: function(lockname, value) {
				if (typeof lockname === "undefined") return;
				if (locks[lockname]) return;

				locks[lockname] = value || true;
				count++;
				return true;
			},
			unlock: function(lockname) {
				if (typeof lockname === "undefined") return;
				if (!locks[lockname]) return;

				locks[lockname] = false;
				count--;
				return true;
			},
			locked: function(lockname) {
				if (typeof lockname !== "undefined") {
					// Is this lock set?
					return locks[lockname];
				} else {
					// Is any lock set?
					return count > 0;
				}
			}
		};
	},
	indexOptionTable: function(moduleID, optionKey, keyFieldIndex) {
		var source = modules[moduleID].options[optionKey].value;
		var keyIsList =
			modules[moduleID].options[optionKey].fields[keyFieldIndex].type === 'list' ?
			',' :
			false;
		return RESUtils.indexArrayByProperty(source, keyFieldIndex, keyIsList);
	},
	indexArrayByProperty: function(source, keyIndex, keyValueSeparator) {
		if (!source || !source.length) {
			return function() {};
		}

		var index = createIndex();
		return getItem;

		function createIndex() {
			var index = {};

			for (var i = 0, length = source.length; i < length; i++) {
				var item = source[i];
				var key = item && item[keyIndex];
				if (!key) continue;

				if (keyValueSeparator) {
					var keys = key.toLowerCase().split(keyValueSeparator);
					for (var ki = 0, klength = keys.length; ki < klength; ki++) {
						key = keys[ki];
						index[key] = item;
					}
				} else {
					index[key] = item;
				}
			}

			return index;
		}

		function getItem(key) {
			key = key && key.toLowerCase();
			var item = index[key];
			return item;
		}
	},
	mapTableOptionValueToObject: function (option, optionValue, backupObject) {
		optionValue = optionValue || [];
		backupObject = backupObject || {};

		var mapped = {};
		for (var i = 0, length = option.fields.length; i < length; i++) {
			var field = option.fields[i];
			mapped[field.name] = RESUtils.firstValid(optionValue[i], backupObject[field.name], field.value);
		}

		return mapped;
	},
	mapObjectToTableOptionValue: function (option, object, backupOptionValue) {
		object = object || {};
		backupOptionValue = backupOptionValue || [];

		var mapped = [];
		for (var i = 0, length = option.fields.length; i < length; i++) {
			var field = option.fields[i];
			mapped[i] = RESUtils.firstValid(object[field.name], backupOptionValue[i], field.value);
		}

		return mapped;
	},
	inList: function(needle, haystack, separator, isCaseSensitive) {
		if (!needle || !haystack) return false;

		separator = separator || ',';

		if (haystack.indexOf(separator) !== -1) {
			var haystacks = haystack.split(separator);
			if (RESUtils.inArray(needle, haystacks, isCaseSensitive)) {
				return true;
			}
		} else {
			if (caseSensitive) {
				return (needle == haystack);
			} else {
				return (needle.toLowerCase() == haystack.toLowerCase());
			}
		}
	},
	inArray: function(needle, haystacks, isCaseSensitive) {
		if (!isCaseSensitive) needle = needle.toLowerCase();

		for (var i = 0, length = haystacks.length; i < length; i++) {
			if (isCaseSensitive) {
				if (needle == haystacks[i]) {
					return true;
				}
			} else {
				if (needle == haystacks[i].toLowerCase()) {
					return true;
				}
			}
		}
	},
	firstRun: function() {
		// if this is the first time this version has been run, pop open the what's new tab, background focused.
		if (RESStorage.getItem('RES.firstRun.' + RESVersion) === null) {
			RESStorage.setItem('RES.firstRun.' + RESVersion, 'true');
			RESUtils.openLinkInNewTab('http://redditenhancementsuite.com/whatsnew.html?v=' + RESVersion, false);
		}
	},
	// checkForUpdate: function(forceUpdate) {
	checkForUpdate: function() {
		if (RESUtils.currentSubreddit('RESAnnouncements')) {
			RESStorage.removeItem('RES.newAnnouncement', 'true');
		}
		var now = Date.now();
		var lastCheck = parseInt(RESStorage.getItem('RESLastUpdateCheck'), 10) || 0;
		// if we haven't checked for an update in 24 hours, check for one now!
		// if (((now - lastCheck) > 86400000) || (RESVersion > RESStorage.getItem('RESlatestVersion')) || ((RESStorage.getItem('RESoutdated') === 'true') && (RESVersion == RESStorage.getItem('RESlatestVersion'))) || forceUpdate) {
		if ((now - lastCheck) > 86400000) {
			// now we're just going to check /r/RESAnnouncements for new posts, we're not checking version numbers...
			var lastID = RESStorage.getItem('RES.lastAnnouncementID');
			$.getJSON('/r/RESAnnouncements/.json?limit=1&app=res', function(data) {
				RESStorage.setItem('RESLastUpdateCheck', now);
				var thisID = data.data.children[0].data.id;
				if (thisID != lastID) {
					RESStorage.setItem('RES.newAnnouncement', 'true');
					RESUtils.setNewNotification();
				}
				RESStorage.setItem('RES.lastAnnouncementID', thisID);
			});
			/*
			var jsonURL = 'http://reddit.honestbleeps.com/update.json?v=' + RESVersion;
			// mark off that we've checked for an update...
			RESStorage.setItem('RESLastUpdateCheck', now);
			var outdated = false;
			if (BrowserDetect.isChrome()) {
				// we've got chrome, so we need to hit up the background page to do cross domain XHR
				var thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL
				};
				chrome.runtime.sendMessage(thisJSON, function(response) {
					// send message to background.html to open new tabs...
					outdated = RESUtils.compareVersion(response, forceUpdate);
				});
			} else if (BrowserDetect.isSafari()) {
				// we've got safari, so we need to hit up the background page to do cross domain XHR
				thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL,
					forceUpdate: forceUpdate
				}
				safari.self.tab.dispatchMessage("compareVersion", thisJSON);
			} else if (BrowserDetect.isOpera()) {
				// we've got opera, so we need to hit up the background page to do cross domain XHR
				thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL,
					forceUpdate: forceUpdate
				}
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				// we've got greasemonkey, so we can do cross domain XHR.
				GM_xmlhttpRequest({
					method:	"GET",
					url:	jsonURL,
					onload:	function(response) {
						outdated = RESUtils.compareVersion(JSON.parse(response.responseText), forceUpdate);
					}
				});
			}
			*/
		}
	},
	/*
	compareVersion: function(response, forceUpdate) {
		if (RESVersion < response.latestVersion) {
			RESStorage.setItem('RESoutdated','true');
			RESStorage.setItem('RESlatestVersion',response.latestVersion);
			RESStorage.setItem('RESmessage',response.message);
			if (forceUpdate) {
				$(RESConsole.RESCheckUpdateButton).html('You are out of date! <a target="_blank" href="http://reddit.honestbleeps.com/download">[click to update]</a>');
			}
			return true;
		} else {
			RESStorage.setItem('RESlatestVersion',response.latestVersion);
			RESStorage.setItem('RESoutdated','false');
			if (forceUpdate) {
				$(RESConsole.RESCheckUpdateButton).html('You are up to date!');
			}
			return false;
		}
	},
	*/
	proEnabled: function() {
		return ((typeof modules['RESPro'] !== 'undefined') && (modules['RESPro'].isEnabled()));
	},
	niceKeyCode: function(charCode) {
		var keyComboString = '';
		var testCode, niceString;
		if (typeof charCode === 'string') {
			var tempArray = charCode.split(',');
			if (tempArray.length) {
				if (tempArray[1] === 'true') keyComboString += 'alt-';
				if (tempArray[2] === 'true') keyComboString += 'ctrl-';
				if (tempArray[3] === 'true') keyComboString += 'shift-';
				if (tempArray[4] === 'true') keyComboString += 'command-';
			}
			testCode = parseInt(charCode, 10);
		} else if (typeof charCode === 'object') {
			testCode = parseInt(charCode[0], 10);
			if (charCode[1]) keyComboString += 'alt-';
			if (charCode[2]) keyComboString += 'ctrl-';
			if (charCode[3]) keyComboString += 'shift-';
			if (charCode[4]) keyComboString += 'command-';
		}
		switch (testCode) {
			case 8:
				niceString = "backspace"; //  backspace
				break;
			case 9:
				niceString = "tab"; //  tab
				break;
			case 13:
				niceString = "enter"; //  enter
				break;
			case 16:
				niceString = "shift"; //  shift
				break;
			case 17:
				niceString = "ctrl"; //  ctrl
				break;
			case 18:
				niceString = "alt"; //  alt
				break;
			case 19:
				niceString = "pause/break"; //  pause/break
				break;
			case 20:
				niceString = "caps lock"; //  caps lock
				break;
			case 27:
				niceString = "escape"; //  escape
				break;
			case 33:
				niceString = "page up"; // page up, to avoid displaying alternate character and confusing people
				break;
			case 34:
				niceString = "page down"; // page down
				break;
			case 35:
				niceString = "end"; // end
				break;
			case 36:
				niceString = "home"; // home
				break;
			case 37:
				niceString = "left arrow"; // left arrow
				break;
			case 38:
				niceString = "up arrow"; // up arrow
				break;
			case 39:
				niceString = "right arrow"; // right arrow
				break;
			case 40:
				niceString = "down arrow"; // down arrow
				break;
			case 45:
				niceString = "insert"; // insert
				break;
			case 46:
				niceString = "delete"; // delete
				break;
			case 91:
				niceString = "left window"; // left window
				break;
			case 92:
				niceString = "right window"; // right window
				break;
			case 93:
				niceString = "select key"; // select key
				break;
			case 96:
				niceString = "numpad 0"; // numpad 0
				break;
			case 97:
				niceString = "numpad 1"; // numpad 1
				break;
			case 98:
				niceString = "numpad 2"; // numpad 2
				break;
			case 99:
				niceString = "numpad 3"; // numpad 3
				break;
			case 100:
				niceString = "numpad 4"; // numpad 4
				break;
			case 101:
				niceString = "numpad 5"; // numpad 5
				break;
			case 102:
				niceString = "numpad 6"; // numpad 6
				break;
			case 103:
				niceString = "numpad 7"; // numpad 7
				break;
			case 104:
				niceString = "numpad 8"; // numpad 8
				break;
			case 105:
				niceString = "numpad 9"; // numpad 9
				break;
			case 106:
				niceString = "multiply"; // multiply
				break;
			case 107:
				niceString = "add"; // add
				break;
			case 109:
				niceString = "subtract"; // subtract
				break;
			case 110:
				niceString = "decimal point"; // decimal point
				break;
			case 111:
				niceString = "divide"; // divide
				break;
			case 112:
				niceString = "F1"; // F1
				break;
			case 113:
				niceString = "F2"; // F2
				break;
			case 114:
				niceString = "F3"; // F3
				break;
			case 115:
				niceString = "F4"; // F4
				break;
			case 116:
				niceString = "F5"; // F5
				break;
			case 117:
				niceString = "F6"; // F6
				break;
			case 118:
				niceString = "F7"; // F7
				break;
			case 119:
				niceString = "F8"; // F8
				break;
			case 120:
				niceString = "F9"; // F9
				break;
			case 121:
				niceString = "F10"; // F10
				break;
			case 122:
				niceString = "F11"; // F11
				break;
			case 123:
				niceString = "F12"; // F12
				break;
			case 144:
				niceString = "num lock"; // num lock
				break;
			case 145:
				niceString = "scroll lock"; // scroll lock
				break;
			case 186:
				niceString = ";"; // semi-colon
				break;
			case 187:
				niceString = "="; // equal-sign
				break;
			case 188:
				niceString = ","; // comma
				break;
			case 189:
				niceString = "-"; // dash
				break;
			case 190:
				niceString = "."; // period
				break;
			case 191:
				niceString = "/"; // forward slash
				break;
			case 192:
				niceString = "`"; // grave accent
				break;
			case 219:
				niceString = "["; // open bracket
				break;
			case 220:
				niceString = "\\"; // back slash
				break;
			case 221:
				niceString = "]"; // close bracket
				break;
			case 222:
				niceString = "'"; // single quote
				break;
			default:
				niceString = String.fromCharCode(testCode);
				break;
		}
		return keyComboString + niceString;
	},
	niceDate: function(d, usformat) {
		d = d || new Date();
		var year = d.getFullYear();
		var month = (d.getMonth() + 1);
		month = (month < 10) ? '0' + month : month;
		var day = d.getDate();
		day = (day < 10) ? '0' + day : day;
		var fullString = year + '-' + month + '-' + day;
		if (usformat) {
			fullString = month + '-' + day + '-' + year;
		}
		return fullString;
	},
	niceDateTime: function(d, usformat) {
		d = d || new Date();
		var dateString = RESUtils.niceDate(d);
		var hours = d.getHours();
		hours = (hours < 10) ? '0' + hours : hours;
		var minutes = d.getMinutes();
		minutes = (minutes < 10) ? '0' + minutes : minutes;
		var seconds = d.getSeconds();
		seconds = (seconds < 10) ? '0' + seconds : seconds;
		var fullString = dateString + ' ' + hours + ':' + minutes + ':' + seconds;
		return fullString;
	},
	niceDateDiff: function(origdate, newdate) {
		// Enter the month, day, and year below you want to use as
		// the starting point for the date calculation
		if (!newdate) {
			newdate = new Date();
		}

		var amonth = origdate.getUTCMonth() + 1;
		var aday = origdate.getUTCDate();
		var ayear = origdate.getUTCFullYear();

		var tyear = newdate.getUTCFullYear();
		var tmonth = newdate.getUTCMonth() + 1;
		var tday = newdate.getUTCDate();

		var y = 1;
		var mm = 1;
		var d = 1;
		var a2 = 0;
		var a1 = 0;
		var f = 28;

		if (((tyear % 4 === 0) && (tyear % 100 !== 0)) || (tyear % 400 === 0)) {
			f = 29;
		}

		var m = [31, f, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var dyear = tyear - ayear;

		var dmonth = tmonth - amonth;
		if (dmonth < 0 && dyear > 0) {
			dmonth = dmonth + 12;
			dyear--;
		}

		var dday = tday - aday;
		if (dday < 0) {
			if (dmonth > 0) {
				var ma = amonth + tmonth;

				if (ma >= 12) {
					ma = ma - 12;
				}
				if (ma < 0) {
					ma = ma + 12;
				}
				dday = dday + m[ma];
				dmonth--;
				if (dmonth < 0) {
					dyear--;
					dmonth = dmonth + 12;
				}
			} else {
				dday = 0;
			}
		}

		var returnString = '';

		if (dyear === 0) {
			y = 0;
		}
		if (dmonth === 0) {
			mm = 0;
		}
		if (dday === 0) {
			d = 0;
		}
		if ((y === 1) && (mm === 1)) {
			a1 = 1;
		}
		if ((y === 1) && (d === 1)) {
			a1 = 1;
		}
		if ((mm === 1) && (d === 1)) {
			a2 = 1;
		}
		if (y === 1) {
			if (dyear === 1) {
				returnString += dyear + " year";
			} else {
				returnString += dyear + " years";
			}
		}
		if ((a1 === 1) && (a2 === 0)) {
			returnString += " and ";
		}
		if ((a1 === 1) && (a2 === 1)) {
			returnString += ", ";
		}
		if (mm === 1) {
			if (dmonth === 1) {
				returnString += dmonth + " month";
			} else {
				returnString += dmonth + " months";
			}
		}
		if (a2 === 1) {
			returnString += " and ";
		}
		if (d === 1) {
			if (dday === 1) {
				returnString += dday + " day";
			} else {
				returnString += dday + " days";
			}
		}
		if (returnString === '') {
			returnString = '0 days';
		}
		return returnString;
	},
	checkIfSubmitting: function() {
		this.checkedIfSubmitting = true;
		if ((/\/r\/[\w]+\/submit\/?/i.test(location.href)) || (/reddit\.com\/submit\/?/i.test(location.href))) {
			var thisSubRedditInput = document.getElementById('sr-autocomplete');
			if (thisSubRedditInput) {
				var thisSubReddit = thisSubRedditInput.value,
					title = document.querySelector('textarea[name=title]');
				if (typeof this.thisSubRedditInputListener === 'undefined') {
					this.thisSubRedditInputListener = true;
					thisSubRedditInput.addEventListener('change', function(e) {
						RESUtils.checkIfSubmitting();
					}, false);
				}
				if ((thisSubReddit.toLowerCase() === 'enhancement') || (thisSubReddit.toLowerCase() === 'resissues')) {
					RESUtils.addCSS('#submittingToEnhancement { display: none; min-height: 300px; font-size: 14px; line-height: 15px; margin-top: 10px; width: 518px; position: absolute; z-index: 999; } #submittingToEnhancement ol { margin-left: 10px; margin-top: 15px; list-style-type: decimal; } #submittingToEnhancement li { margin-left: 25px; }');
					RESUtils.addCSS('.submittingToEnhancementButton { border: 1px solid #444; border-radius: 2px; padding: 3px 6px; cursor: pointer; display: inline-block; margin-top: 12px; }');
					RESUtils.addCSS('#RESBugReport, #RESFeatureRequest { display: none; }');
					RESUtils.addCSS('#RESSubmitOptions .submittingToEnhancementButton { margin-top: 30px; }');
					var textDesc = document.getElementById('text-desc');
					this.submittingToEnhancement = createElementWithID('div', 'submittingToEnhancement', 'RESDialogSmall');

					var submittingHTML = " \
					<h3>Submitting to r/Enhancement</h3> \
					<div class=\"RESDialogContents\"> \
						<div id=\"RESSubmitOptions\"> \
							What kind of a post do you want to submit to r/Enhancement? So that we can better support you, please choose from the options below, and please take care to read the instructions, thanks!<br> \
							<div id=\"RESSubmitBug\" class=\"submittingToEnhancementButton\">I want to submit a bug report</div><br> \
							<div id=\"RESSubmitFeatureRequest\" class=\"submittingToEnhancementButton\">I want to submit a feature request</div><br> \
							<div id=\"RESSubmitOther\" class=\"submittingToEnhancementButton\">I want to submit a general question or other item</div> \
						</div> \
						<div id=\"RESBugReport\"> \
							Are you sure you want to submit a bug report? We get a lot of duplicates and it would really help if you took a moment to read the following: <br> \
							<ol> \
								<li>Have you searched /r/RESIssues to see if someone else has reported it?</li> \
								<li>Have you checked the <a target=\"_blank\" href=\"http://www.reddit.com/r/Enhancement/wiki/faq\">RES FAQ?</a></li> \
								<li>Are you sure it's a bug with RES specifically? Do you have any other userscripts/extensions running?  How about addons like BetterPrivacy, Ghostery, CCleaner, etc?</li> \
							</ol> \
							<br> \
							Please also check out the latest known / popular bugs first:<br> \
							<ul id=\"RESKnownBugs\"><li style=\"color: red;\">Loading...</li></ul> \
							<span id=\"submittingBug\" class=\"submittingToEnhancementButton\">I still want to submit a bug!</span> \
						</div> \
						<div id=\"RESFeatureRequest\"> \
							So you want to request a feature, great!  Please just consider the following, first:<br> \
							<ol> \
								<li>Have you searched /r/Enhancement to see if someone else has requested it?</li> \
								<li>Is it something that would appeal to Reddit as a whole?  Personal or subreddit specific requests usually aren't added to RES.</li> \
							</ol> \
							<br> \
							Please also check out the latest known popular feature requests first:<br> \
							<ul id=\"RESKnownFeatureRequests\"><li style=\"color: red;\">Loading...</li></ul> \
							<span id=\"submittingFeature\" class=\"submittingToEnhancementButton\">I still want to submit a feature request!<span> \
						</div> \
					</div>";
					$(this.submittingToEnhancement).html(submittingHTML);
					insertAfter(textDesc, this.submittingToEnhancement);
					setTimeout(function() {
						$('#RESSubmitBug').click(
							function() {
								$('#RESSubmitOptions').fadeOut(
									function() {
										$('#RESBugReport').fadeIn();
										GM_xmlhttpRequest({
											method: "GET",
											url: 'http://www.reddit.com/r/Enhancement/wiki/knownbugs.json',
											onload: function(response) {
												var data = safeJSON.parse(response.responseText),
													bugs = [],
													bugsText;

												if (data.data) {
													bugsText = data.data['content_md'];
												}
												if (bugsText) {
													var bugs = bugsText.split('---'),
														bugLines, bugData, line,
														i, bugObj, bugLI, bugHTML;
													
													$('#RESKnownBugs').html('');
													if (bugs && bugs[0].length === 0) {
														bugs.shift();
													}
													$.each(bugs, function(idx, bugText) {
														bugObj = {};
														bugHTML = '';
														bugData = bugText.replace(/\r/g,'').split('\n');
														for (i in bugData) {
															line = $.trim(bugData[i]).split(':');
															if (line.length > 0) {
																key = line.shift();
																if (key) {
																	bugObj[key] = line.join(':');
																}
															}
														}
														if (bugObj.title) {
															bugLI = $('<li>');
															if (bugObj.url) {
																bugHTML = $('<a target="_blank">');
																$(bugHTML).attr('href', bugObj.url).text(bugObj.title);
																$(bugLI).append(bugHTML);
															} else {
																$(bugLI).text(bugObj.title);
															}
															$('#RESKnownBugs').append(bugLI);
														}
													});
												}
											}
										});
									}
								);
							}
						);
						$('#RESSubmitFeatureRequest').click(
							function() {
								$('#RESSubmitOptions').fadeOut(
									function() {
										$('#RESFeatureRequest').fadeIn();
										$.getJSON('http://redditenhancementsuite.com/knownfeaturerequests.json', function(data) {
											$('#RESKnownFeatureRequests').html('');
											$.each(data, function(key, val) {
												$('#RESKnownFeatureRequests').append('<li><a target="_blank" href="' + val.url + '">' + val.description + '</a></li>');
											});
										});
									}
								);
							}
						);
						$('#submittingBug').click(
							function() {
								$('#sr-autocomplete').val('RESIssues');
								$('li a.text-button').click();
								$('#submittingToEnhancement').fadeOut();

								var txt = "- RES Version: " + RESVersion + "\n";
								txt += "- Browser: " + BrowserDetect.browser + "\n";
								if (typeof navigator === 'undefined') navigator = window.navigator;
								txt += "- Browser Version: " + BrowserDetect.version + "\n";
								txt += "- Cookies Enabled: " + navigator.cookieEnabled + "\n";
								txt += "- Platform: " + BrowserDetect.OS + "\n";
								txt += "- Did you search /r/RESIssues before submitting this: No. That, or I didn't notice this text here and edit it!\n\n";
								$('.usertext-edit textarea').val(txt);
								title.value = '[bug] Please describe your bug here. If you have screenshots, please link them in the selftext.';
							}
						);
						$('#submittingFeature').click(
							function() {
								$('#sr-autocomplete').val('Enhancement');
								$('#submittingToEnhancement').fadeOut();
								title.value = '[feature request] Please summarize your feature request here, and elaborate in the selftext.';
							}
						);
						$('#RESSubmitOther').click(
							function() {
								$('#sr-autocomplete').val('Enhancement');
								$('#submittingToEnhancement').fadeOut();
								title.value = '';
							}
						);
						$('#submittingToEnhancement').fadeIn();
					}, 1000);
				} else if (typeof this.submittingToEnhancement !== 'undefined') {
					this.submittingToEnhancement.parentNode.removeChild(this.submittingToEnhancement);
					if (title.value === 'Submitting a bug? Please read the box above...') {
						title.value = '';
					}
				}
			}
		}
	},
	isEmpty: function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop))
				return false;
		}
		return true;
	},
	deleteCookie: function(cookieName) {
		var requestJSON = {
			requestType: 'deleteCookie',
			cname: cookieName
		};

		if (BrowserDetect.isChrome()) {
			chrome.runtime.sendMessage(requestJSON);
		} else if (BrowserDetect.isSafari()) {
			document.cookie = cookieName + '=null;expires=' + Date.now() + '; path=/;domain=reddit.com';
		} else if (BrowserDetect.isOpera()) {
			document.cookie = cookieName + '=null;expires=' + Date.now() + '; path=/;domain=reddit.com';
		} else if (BrowserDetect.isFirefox()) {
			self.postMessage(requestJSON);
		}
	},
	openLinkInNewTab: function(url, focus) {
		var thisJSON;
		if (BrowserDetect.isChrome()) {
			thisJSON = {
				requestType: 'openLinkInNewTab',
				linkURL: url,
				button: focus
			};
			// send message to background.html to open new tabs...
			chrome.runtime.sendMessage(thisJSON);
		} else if (BrowserDetect.isSafari()) {
			thisJSON = {
				requestType: 'openLinkInNewTab',
				linkURL: url,
				button: focus
			};
			safari.self.tab.dispatchMessage("openLinkInNewTab", thisJSON);
		} else if (BrowserDetect.isOpera()) {
			thisJSON = {
				requestType: 'openLinkInNewTab',
				linkURL: url,
				button: focus
			};
			opera.extension.postMessage(JSON.stringify(thisJSON));
		} else if (BrowserDetect.isFirefox()) {
			thisJSON = {
				requestType: 'openLinkInNewTab',
				linkURL: url,
				button: focus
			};
			self.postMessage(thisJSON);
		} else {
			window.open(url);
		}
	},
	toggleButton: function(fieldID, enabled, onText, offText, isTable) {
		enabled = enabled || false;
		var checked = (enabled) ? 'CHECKED' : '';
		onText = onText || 'on';
		offText = offText || 'off';
		var thisToggle = document.createElement('div');
		thisToggle.setAttribute('class', 'toggleButton');
		thisToggle.setAttribute('id', fieldID + 'Container');
		var tableAttr = '';
		if (isTable) {
			tableAttr = ' tableOption="true"';
		}
		$(thisToggle).html('<span class="toggleOn">' + onText + '</span><span class="toggleOff">' + offText + '</span><input id="' + fieldID + '" type="checkbox" ' + tableAttr + checked + '>');
		thisToggle.addEventListener('click', function(e) {
			var thisCheckbox = this.querySelector('input[type=checkbox]');
			var enabled = thisCheckbox.checked;
			thisCheckbox.checked = !enabled;
			if (enabled) {
				this.classList.remove('enabled');
			} else {
				this.classList.add('enabled');
			}
		}, false);
		if (enabled) thisToggle.classList.add('enabled');
		return thisToggle;
	},
	addCommas: function(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	generateTable: function(items, call, context) {
		if (!items || !call) return;
		// Sanitize single item into items array
		if (!(items.length && typeof items !== "string")) items = [items];

		var description = [];
		description.push('<table>');

		for (var i = 0; i < items.length; i++) {
			var item = call(items[i], i, items, context);
			if (typeof item === "string") {
				description.push(item);
			} else if (item.length) {
				description = description.concat(item);
			}
		}
		description.push('</table>');
		description = description.join('\n');

		return description;
	},
	xhrCache: function(operation) {
		var thisJSON = {
			requestType: 'XHRCache',
			operation: operation
		};
		if (BrowserDetect.isChrome()) {
			chrome.runtime.sendMessage(thisJSON);
		} else if (BrowserDetect.isSafari()) {
			safari.self.tab.dispatchMessage('XHRCache', thisJSON);
		} else if (BrowserDetect.isOpera()) {
			opera.extension.postMessage(JSON.stringify(thisJSON));
		} else if (BrowserDetect.isFirefox()) {
			self.postMessage(thisJSON);
		}
	},
	initObservers: function() {
		var siteTable, observer;
		if (RESUtils.pageType() !== 'comments') {
			// initialize sitetable observer...
			siteTable = document.querySelector('#siteTable');
			var stMultiCheck = document.querySelectorAll('#siteTable');
			if (stMultiCheck.length === 2) {
				siteTable = stMultiCheck[1];
			}

			if (BrowserDetect.MutationObserver && siteTable) {
				observer = new BrowserDetect.MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.addedNodes[0].id.indexOf('siteTable') !== -1) {
							// when a new sitetable is loaded, we need to add new observers for selftexts within that sitetable...
							$(mutation.addedNodes[0]).find('.entry div.expando').each(function() {
								RESUtils.addSelfTextObserver(this);
							});
							RESUtils.watchers.siteTable.forEach(function(callback) {
								if (callback) callback(mutation.addedNodes[0]);
							});
						}
					});
				});

				observer.observe(siteTable, {
					attributes: false,
					childList: true,
					characterData: false
				});
			} else {
				// Opera doesn't support MutationObserver - so we need this for Opera support.
				if (siteTable) {
					siteTable.addEventListener('DOMNodeInserted', function(event) {
						if ((event.target.tagName === 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') !== -1)) {
							RESUtils.watchers.siteTable.forEach(function(callback) {
								if (callback) callback(event.target);
							});
						}
					}, true);
				}
			}
		} else {
			// initialize sitetable observer...
			siteTable = document.querySelector('.commentarea > .sitetable');

			if (BrowserDetect.MutationObserver && siteTable) {
				observer = new BrowserDetect.MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.contains('thing')) {
							var thing = mutation.addedNodes[0];
							var newCommentEntry = thing.querySelector('.entry');
							if (!$(newCommentEntry).data('alreadyDetected')) {
								$(newCommentEntry).data('alreadyDetected', true);
								$(thing).find('.child').each(function() {
									RESUtils.addNewCommentFormObserver(this);
								});
								RESUtils.watchers.newComments.forEach(function(callback) {
									if (callback) callback(newCommentEntry);
								});
							}
						}
					});
				});

				observer.observe(siteTable, {
					attributes: false,
					childList: true,
					characterData: false
				});
			} else {
				// Opera doesn't support MutationObserver - so we need this for Opera support.
				if (siteTable) {
					siteTable.addEventListener('DOMNodeInserted', RESUtils.mutationEventCommentHandler, false);
				}
			}
		}

		$('.entry div.expando').each(function() {
			RESUtils.addSelfTextObserver(this);
		});

		// initialize new comments observers on demand, by first wiring up click listeners to "load more comments" buttons.
		// on click, we'll add a mutation observer...
		$('.morecomments a').on('click', RESUtils.addNewCommentObserverToTarget);

		// initialize new comments forms observers on demand, by first wiring up click listeners to reply buttons.
		// on click, we'll add a mutation observer...
		// $('body').on('click', 'ul.flat-list li a[onclick*=reply]', RESUtils.addNewCommentFormObserver);
		$('.thing .child').each(function() {
			RESUtils.addNewCommentFormObserver(this);
		});

	},
	// Opera doesn't support MutationObserver - so we need this for Opera support.
	mutationEventCommentHandler: function(event) {
		if ((event.target.tagName === 'DIV') && (event.target.classList.contains('thing'))) {
			// we've found a matching element - stop propagation.
			event.stopPropagation();
			// because nested DOMNodeInserted events are an absolute CLUSTER to manage,
			// only send individual comments through to the callback.
			// Otherwise, we end up calling functions on a parent, then its child (which
			// already got scanned when we passed in the parent), etc.
			var thisComment = event.target.querySelector('.entry');
			if (!$(thisComment).data('alreadyDetected')) {
				$(thisComment).data('alreadyDetected', true);
				// wire up listeners for new "more comments" links...
				$(event.target).find('.morecomments a').click(RESUtils.addNewCommentObserverToTarget);
				RESUtils.watchers.newComments.forEach(function(callback) {
					RESUtils.addNewCommentFormObserver(event.target);
					if (callback) callback(thisComment);
				});
			}
		}
	},
	addNewCommentObserverToTarget: function(e) {
		var ele = $(e.currentTarget).closest('.sitetable')[0];
		// mark this as having an observer so we don't add multiples...
		if (!$(ele).hasClass('hasObserver')) {
			$(ele).addClass('hasObserver');
			RESUtils.addNewCommentObserver(ele);
		}
	},
	addNewCommentObserver: function(ele) {
		var mutationNodeToObserve = ele;
		if (BrowserDetect.MutationObserver) {
			var observer = new BrowserDetect.MutationObserver(function(mutations) {
				// we need to get ONLY the nodes that are new...
				// get the nodeList from each mutation, find comments within it,
				// then call our callback on it.
				for (var i = 0, len = mutations.length; i < len; i++) {
					var thisMutation = mutations[i];
					var nodeList = thisMutation.addedNodes;
					// look at the added nodes, and find comment containers.
					for (var j = 0, jLen = nodeList.length; j < jLen; j++) {
						if (nodeList[j].classList.contains('thing')) {
							$(nodeList[j]).find('.child').each(function() {
								RESUtils.addNewCommentFormObserver(this);
							});

							// check for "load new comments" links within this group as well...
							$(nodeList[j]).find('.morecomments a').click(RESUtils.addNewCommentObserverToTarget);

							var subComments = nodeList[j].querySelectorAll('.entry');
							// look at the comment containers and find actual comments...
							for (var k = 0, kLen = subComments.length; k < kLen; k++) {
								var thisComment = subComments[k];
								if (!$(thisComment).data('alreadyDetected')) {
									$(thisComment).data('alreadyDetected', true);
									RESUtils.watchers.newComments.forEach(function(callback) {
										if (callback) callback(thisComment);
									});
								}
							}
						}
					}
				}

				// RESUtils.watchers.newComments.forEach(function(callback) {
				// // add form observers to these new comments we've found...
				//	$(mutations[0].target).find('.thing .child').each(function() {
				//		RESUtils.addNewCommentFormObserver(this);
				//	});					
				//	// check for "load new comments" links within this group as well...
				//	$(mutations[0].target).find('.morecomments a').click(RESUtils.addNewCommentObserverToTarget);
				//	callback(mutations[0].target);
				// });

				// disconnect this observer once all callbacks have been run.
				// unless we have the nestedlisting class, in which case don't disconnect because that's a
				// bottom level load more comments where even more can be loaded after, so they all drop into this
				// same .sitetable div.
				if (!$(ele).hasClass('nestedlisting')) {
					observer.disconnect();
				}
			});

			observer.observe(mutationNodeToObserve, {
				attributes: false,
				childList: true,
				characterData: false
			});
		} else {
			mutationNodeToObserve.addEventListener('DOMNodeInserted', RESUtils.mutationEventCommentHandler, false);
		}
	},
	addNewCommentFormObserver: function(ele) {
		var commentsFormParent = ele;
		if (BrowserDetect.MutationObserver) {
			// var mutationNodeToObserve = moreCommentsParent.parentNode.parentNode.parentNode.parentNode;
			var observer = new BrowserDetect.MutationObserver(function(mutations) {
				var form = $(mutations[0].target).children('form');
				if ((form) && (form.length === 1)) {
					RESUtils.watchers.newCommentsForms.forEach(function(callback) {
						callback(form[0]);
					});
				} else {
					var newOwnComment = $(mutations[0].target).find(' > div.sitetable > .thing:first-child'); // assumes new comment will be prepended to sitetable's children
					if ((newOwnComment) && (newOwnComment.length === 1)) {
						// new comment detected from the current user...
						RESUtils.watchers.newComments.forEach(function(callback) {
							callback(newOwnComment[0]);
						});
					}
				}
			});

			observer.observe(commentsFormParent, {
				attributes: false,
				childList: true,
				characterData: false
			});
		} else {
			// Opera doesn't support MutationObserver - so we need this for Opera support.
			commentsFormParent.addEventListener('DOMNodeInserted', function(event) {
				// TODO: proper tag filtering here, it's currently all wrong.
				if (event.target.tagName === 'FORM') {
					RESUtils.watchers.newCommentsForms.forEach(function(callback) {
						if (callback) callback(event.target);
					});
				} else {
					var newOwnComment = $(event.target).find(' > div.sitetable > .thing:first-child'); // assumes new comment will be prepended to sitetable's children
					if ((newOwnComment) && (newOwnComment.length === 1)) {
						// new comment detected from the current user...
						RESUtils.watchers.newComments.forEach(function(callback) {
							callback(newOwnComment[0]);
						});
					}
				}
			}, true);
		}
	},
	addSelfTextObserver: function(ele) {
		var selfTextParent = ele;
		if (BrowserDetect.MutationObserver) {
			// var mutationNodeToObserve = moreCommentsParent.parentNode.parentNode.parentNode.parentNode;
			var observer = new BrowserDetect.MutationObserver(function(mutations) {
				var form = $(mutations[0].target).find('form');
				if ((form) && (form.length > 0)) {
					RESUtils.watchers.selfText.forEach(function(callback) {
						callback(form[0]);
					});
				}
			});

			observer.observe(selfTextParent, {
				attributes: false,
				childList: true,
				characterData: false
			});
		} else {
			// Opera doesn't support MutationObserver - so we need this for Opera support.
			selfTextParent.addEventListener('DOMNodeInserted', function(event) {
				// TODO: proper tag filtering here, it's currently all wrong.
				if (event.target.tagName === 'FORM') {
					RESUtils.watchers.selfText.forEach(function(callback) {
						if (callback) callback(event.target);
					});
				}
			}, true);
		}
	},
	watchForElement: function(type, callback) {
		switch (type) {
			case 'siteTable':
				RESUtils.watchers.siteTable.push(callback);
				break;
			case 'newComments':
				RESUtils.watchers.newComments.push(callback);
				break;
			case 'selfText':
				RESUtils.watchers.selfText.push(callback);
				break;
			case 'newCommentsForms':
				RESUtils.watchers.newCommentsForms.push(callback);
				break;
		}
	},
	watchers: {
		siteTable: [],
		newComments: [],
		selfText: [],
		newCommentsForms: []
	},
	// A link is a comment code if all these conditions are true:
	// * It has no content (i.e. content.length === 0)
	// * Its href is of the form "/code"
	//
	// In case it's not clear, here is a list of some common comment
	// codes on a specific subreddit:
	// http://www.reddit.com/r/metarage/comments/p3eqe/full_updated_list_of_comment_faces_wcodes/
	COMMENT_CODE_REGEX: /^\/\w+$/,
	isCommentCode: function(link) {
		var content = link.innerHTML;

		// Note that link.href will return the full href (which includes the
		// reddit.com domain). We don't want that.
		var href = link.getAttribute("href");

		return !content && this.COMMENT_CODE_REGEX.test(href);
	},
	/*
	Starts a unique named timeout.
	If there is a running timeout with the same name cancel the old one in favor of the new.
	Call with no time/call parameter (null/undefined/missing) to and existing one with the given name.
	Used to derfer an action until a series of events has stopped.
	e.g. wait until a user a stopped typing to update a comment preview.
	(name based on similar function in underscore.js)
	*/
	debounceTimeouts: {},
	debounce: function(name, time, call, data) {
		if (name == null) return;
		if (RESUtils.debounceTimeouts[name] !== undefined) {
			window.clearTimeout(RESUtils.debounceTimeouts[name]);
			delete RESUtils.debounceTimeouts[name];
		}
		if (time !== null && call !== null) {
			RESUtils.debounceTimeouts[name] = window.setTimeout(function() {
				delete RESUtils.debounceTimeouts[name];
				call(data);
			}, time);
		}
	},
	toolTipTimers: {},
	/*
	Iterate through an array in chunks, executing a callback on each element.
	Each chunk is handled asynchronously from the others with a delay betwen each batch.
	If the provided callback returns false iteration will be halted.
	*/
	forEachChunked: function(array, chunkSize, delay, call) {
		if (typeof array === 'undefined' || array === null) return;
		if (typeof chunkSize === 'undefined' || chunkSize === null || chunkSize < 1) return;
		if (typeof delay === 'undefined' || delay === null || delay < 0) return;
		if (typeof call === 'undefined' || call === null) return;
		var counter = 0;
		var length = array.length;

		function doChunk() {
			for (var end = Math.min(array.length, counter + chunkSize); counter < end; counter++) {
				var ret = call(array[counter], counter, array);
				if (ret === false) return;
			}
			if (counter < array.length) {
				window.setTimeout(doChunk, delay);
			}
		}
		window.setTimeout(doChunk, delay);
	},
	getComputedStyle: function(elem, property) {
		if (elem.constructor === String) {
			elem = document.querySelector(elem);
		} else if (!(elem instanceof Node)) {
			return undefined;
		}
		var strValue;
		if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(elem, "").getPropertyValue(property);
		} else if (elem.currentStyle) {
			property = property.replace(/\-(\w)/g, function(strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[property];
		}
		return strValue;
	},
	hover: {
		defaults: {
			openDelay: 500,
			fadeDelay: 500,
			fadeSpeed: 0.3,
			width: 512,
			closeOnMouseOut: true
		},
		container: null,
		/*
		The contents of state are as follows:
		state: {
			//The DOM element that triggered the hover popup.
			element: null,
			//Resolved values for timing, etc.
			options: null,
			//Usecase specific object
			context: null,
			callback: null,
		}*/
		state: null,
		showTimer: null,
		hideTimer: null,
		begin: function(onElement, conf, callback, context) {
			var hover = RESUtils.hover;
			if (hover.container === null) hover.create();
			if (hover.state !== null) {
				hover.close(false);
			}
			var state = hover.state = {
				element: onElement,
				options: $.extend({}, hover.defaults, conf),
				context: context,
				callback: callback,
			};
			hover.showTimer = setTimeout(function() {
				hover.cancelShowTimer();
				hover.clearShowListeners();
				hover.open();

				$(hover.state.element).on('mouseleave', hover.startHideTimer);
			}, state.options.openDelay);

			$(state.element).on('click', hover.cancelShow);
			$(state.element).on('mouseleave', hover.cancelShow);
		},

		create: function() {
			var $container = $('<div id="RESHoverContainer" class="RESDialogSmall"> \
				<h3 id="RESHoverTitle"></h3> \
				<div class="RESCloseButton">x</div> \
				<div id="RESHoverBody" class="RESDialogContents"> \
				</div>'),
				container = $container[0];

			$container
				.appendTo(document.body)
				.on('mouseenter', function() {
					if (RESUtils.hover.state !== null) {
						RESUtils.hover.cancelHideTimer();
					}
				})
				.on('mouseleave', function() {
					if (RESUtils.hover.state !== null) {
						RESUtils.hover.cancelHideTimer();
						if (RESUtils.hover.state.options.closeOnMouseOut === true) {
							RESUtils.hover.startHideTimer();
						}
					}
				})
				.on('click', '.RESCloseButton', function() {
					RESUtils.hover.close(true);
				});

			RESUtils.hover.container = container;

			var css = '';

			css += '#RESHoverContainer { display: none; position: absolute; z-index: 10001; }';
			css += '#RESHoverContainer:before { content: ""; position: absolute; top: 10px; left: -26px; border-style: solid; border-width: 10px 29px 10px 0; border-color: transparent #c7c7c7; display: block; width: 0; z-index: 1; }';
			css += '#RESHoverContainer:after { content: ""; position: absolute; top: 10px; left: -24px; border-style: solid; border-width: 10px 29px 10px 0; border-color: transparent #f0f3fc; display: block; width: 0; z-index: 1; }';
			css += '#RESHoverContainer.right:before { content: ""; position: absolute; top: 10px; right: -26px; left: auto; border-style: solid; border-width: 10px 0 10px 29px; border-color: transparent #c7c7c7; display: block; width: 0; z-index: 1; }';
			css += '#RESHoverContainer.right:after { content: ""; position: absolute; top: 10px; right: -24px; left: auto; border-style: solid; border-width: 10px 0 10px 29px; border-color: transparent #f0f3fc; display: block; width: 0; z-index: 1; }';

			RESUtils.addCSS(css);
		},
		open: function() {
			var hover = RESUtils.hover;
			var def = $.Deferred();
			def.promise()
				.progress(hover.set)
				.done(hover.set)
				.fail(hover.close);
			hover.state.callback(def, hover.state.element, hover.state.context);
		},
		set: function(header, body) {
			var hover = RESUtils.hover;
			var container = hover.container;
			if (header != null) $('#RESHoverTitle').empty().append(header);
			if (body != null) $('#RESHoverBody').empty().append(body);

			var XY = RESUtils.getXYpos(hover.state.element);

			var width = $(hover.state.element).width();
			var tooltipWidth = $(container).width();
			tooltipWidth = hover.state.options.width;

			RESUtils.fadeElementIn(hover.container, hover.state.options.fadeSpeed);
			if ((window.innerWidth - XY.x - width) <= tooltipWidth) {
				// tooltip would go off right edge - reverse it.
				container.classList.add('right');
				$(container).css({
					top: XY.y - 14,
					left: XY.x - tooltipWidth - 30,
					width: tooltipWidth
				});
			} else {
				container.classList.remove('right');
				$(container).css({
					top: XY.y - 14,
					left: XY.x + width + 25,
					width: tooltipWidth
				});
			}
		},
		cancelShow: function() {
			RESUtils.hover.close(true);
		},
		clearShowListeners: function() {
			if (RESUtils.hover.state === null) return;
			var element = RESUtils.hover.state.element;
			var func = RESUtils.hover.cancelShow;

			$(element).off('click', func).off('mouseleave', func);
		},
		cancelShowTimer: function() {
			if (RESUtils.hover.showTimer === null) return;
			clearTimeout(RESUtils.hover.showTimer);
			RESUtils.hover.showTimer = null;
		},
		startHideTimer: function() {
			if (RESUtils.hover.state !== null) {
				RESUtils.hover.hideTimer = setTimeout(function() {
					RESUtils.hover.cancelHideTimer();
					RESUtils.hover.close(true);
				}, RESUtils.hover.state.options.fadeDelay);
			}
		},
		cancelHideTimer: function() {
			var hover = RESUtils.hover;
			if (RESUtils.hover.state !== null) {
				$(hover.state.element).off('mouseleave', hover.startHideTimer);
			}
			if (hover.hideTimer === null) return;
			clearTimeout(hover.hideTimer);
			hover.hideTimer = null;
		},
		close: function(fade) {
			var hover = RESUtils.hover;

			function afterHide() {
				$('#RESHoverTitle, #RESHoverBody').empty();
				hover.clearShowListeners();
				hover.cancelShowTimer();
				hover.cancelHideTimer();
				hover.state = null;
			}
			if (fade && hover.state !== null) {
				RESUtils.fadeElementOut(hover.container, hover.state.options.fadeSpeed, afterHide);
			} else {
				$(hover.container).hide(afterHide);
			}
		}
	}
};
// end RESUtils;

// Create a nice alert function...
var gdAlert = {
	container: false,
	overlay: "",

	init: function(callback) {
		//init
		var alertCSS = '#alert_message { ' +
			'display: none;' +
			'opacity: 0.0;' +
			'background-color: #EFEFEF;' +
			'border: 1px solid black;' +
			'color: black;' +
			'font-size: 10px;' +
			'padding: 20px;' +
			'padding-left: 60px;' +
			'padding-right: 60px;' +
			'position: fixed!important;' +
			'position: absolute;' +
			'width: 400px;' +
			'float: left;' +
			'z-index: 1000000201;' +
			'text-align: left;' +
			'left: auto;' +
			'top: auto;' +
			'}' +
			'#alert_message .button {' +
			'border: 1px solid black;' +
			'font-weight: bold;' +
			'font-size: 10px;' +
			'padding: 4px;' +
			'padding-left: 7px;' +
			'padding-right: 7px;' +
			'float: left;' +
			'background-color: #DFDFDF;' +
			'cursor: pointer;' +
			'}' +
			'#alert_message span {' +
			'display: block;' +
			'margin-bottom: 15px;	' +
			'}' +
			'#alert_message_background {' +
			'position: fixed; top: 0; left: 0; bottom: 0; right: 0;' +
			'background-color: #333333; z-index: 100000200;' +
			'}';

		GM_addStyle(alertCSS);

		gdAlert.populateContainer(callback);

	},

	populateContainer: function(callback) {
		gdAlert.container = createElementWithID('div', 'alert_message');
		gdAlert.container.appendChild(document.createElement('span'));

		var closeButton;
		if (typeof callback === 'function') {
			this.okButton = document.createElement('input');
			this.okButton.setAttribute('type', 'button');
			this.okButton.setAttribute('value', 'confirm');
			this.okButton.addEventListener('click', callback, false);
			this.okButton.addEventListener('click', gdAlert.close, false);

			closeButton = document.createElement('input');
			closeButton.setAttribute('type', 'button');
			closeButton.setAttribute('value', 'cancel');
			closeButton.addEventListener('click', gdAlert.close, false);

			gdAlert.container.appendChild(this.okButton);
			gdAlert.container.appendChild(closeButton);
		} else {
			/* if (this.okButton) {
				gdAlert.container.removeChild(this.okButton);
				delete this.okButton;
			} */
			closeButton = document.createElement('input');
			closeButton.setAttribute('type', 'button');
			closeButton.setAttribute('value', 'ok');
			closeButton.addEventListener('click', gdAlert.close, false);

			gdAlert.container.appendChild(closeButton);
		}
		var br = document.createElement('br');
		br.setAttribute('style', 'clear: both');
		gdAlert.container.appendChild(br);
		document.body.appendChild(gdAlert.container);
	},
	open: function(text, callback) {
		if (gdAlert.isOpen) {
			return;
		}
		gdAlert.isOpen = true;
		gdAlert.populateContainer(callback);

		//set message
		// gdAlert.container.getElementsByTagName("SPAN")[0].innerHTML = text;
		$(gdAlert.container.getElementsByTagName("SPAN")[0]).html(text);
		gdAlert.container.getElementsByTagName("INPUT")[0].focus();
		gdAlert.container.getElementsByTagName("INPUT")[0].focus();

		//create site overlay
		gdAlert.overlay = createElementWithID("div", "alert_message_background");
		document.body.appendChild(gdAlert.overlay);

		// center messagebox (requires prototype functions we don't have, so we'll redefine...)
		// var arrayPageScroll = document.viewport.getScrollOffsets();
		// var winH = arrayPageScroll[1] + (document.viewport.getHeight());
		// var lightboxLeft = arrayPageScroll[0];
		var arrayPageScroll = [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		var winH = arrayPageScroll[1] + (window.innerHeight);
		var lightboxLeft = arrayPageScroll[0];

		gdAlert.container.style.top = ((winH / 2) - 90) + "px";
		gdAlert.container.style.left = ((gdAlert.getPageSize()[0] / 2) - 155) + "px";

		/*
		new Effect.Appear(gdAlert.container, {duration: 0.2});
		new Effect.Opacity(gdAlert.overlay, {duration: 0.2, to: 0.8});
		*/
		RESUtils.fadeElementIn(gdAlert.container, 0.3);
		RESUtils.fadeElementIn(gdAlert.overlay, 0.3);
		modules['styleTweaks'].setSRStyleToggleVisibility(false, 'gdAlert');
	},

	close: function() {
		gdAlert.isOpen = false;
		/*
		new Effect.Fade(gdAlert.container, {duration: 0.3});
		new Effect.Fade(gdAlert.overlay, {duration: 0.3, afterFinish: function() {
			document.body.removeChild(gdAlert.overlay);
		}});	
		*/
		RESUtils.fadeElementOut(gdAlert.container, 0.3);
		RESUtils.fadeElementOut(gdAlert.overlay, 0.3);
		modules['styleTweaks'].setSRStyleToggleVisibility(true, 'gdAlert');
	},

	getPageSize: function() {
		var xScroll, yScroll;
		if (window.innerHeight && window.scrollMaxY) {
			xScroll = window.innerWidth + window.scrollMaxX;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}

		var windowWidth, windowHeight;

		if (self.innerHeight) { // all except Explorer
			if (document.documentElement.clientWidth) {
				windowWidth = document.documentElement.clientWidth;
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}

		// for small pages with total height less then height of the viewport
		if (yScroll < windowHeight) {
			pageHeight = windowHeight;
		} else {
			pageHeight = yScroll;
		}

		// for small pages with total width less then width of the viewport
		if (xScroll < windowWidth) {
			pageWidth = xScroll;
		} else {
			pageWidth = windowWidth;
		}
		return [pageWidth, pageHeight];
	}
};

//overwrite the alert function
var alert = function(text, callback) {
	if (gdAlert.container === false) {
		gdAlert.init(callback);
	}
	gdAlert.open(text, callback);
};

// this function copies localStorage (from the GM import script) to FF addon simplestorage...

function GMSVtoFFSS() {
	var console = unsafeWindow.console;
	for (var key in localStorage) {
		RESStorage.setItem(key, localStorage[key]);
	}
	localStorage.setItem('copyComplete', 'true');
	localStorage.removeItem('RES.lsTest');
	modules['notifications'].showNotification('Data transfer complete. You may now uninstall the Greasemonkey script');
}

// jquery plugin CSS
RESUtils.addCSS(tokenizeCSS);
RESUtils.addCSS(guidersCSS);

// define the RESConsole class
var RESConsole = {
	modalOverlay: '',
	RESConsoleContainer: '',
	RESMenuItems: [],
	RESConfigPanelOptions: null,
	// make the modules panel accessible to this class for updating (i.e. when preferences change, so we can redraw it)
	RESConsoleConfigPanel: createElementWithID('div', 'RESConsoleConfigPanel', 'RESPanel'),
	RESConsoleAboutPanel: createElementWithID('div', 'RESConsoleAboutPanel', 'RESPanel'),
	RESConsoleProPanel: createElementWithID('div', 'RESConsoleProPanel', 'RESPanel'),
	addConsoleLink: function() {
		this.userMenu = document.querySelector('#header-bottom-right');
		if (this.userMenu) {
			var RESPrefsLink = $("<span id='openRESPrefs'><span id='RESSettingsButton' title='RES Settings' class='gearIcon'></span>")
				.mouseenter(RESConsole.showPrefsDropdown);
			$(this.userMenu).find("ul").after(RESPrefsLink).after("<span class='separator'>|</span>");
			this.RESPrefsLink = RESPrefsLink[0];
		}
	},
	addConsoleDropdown: function() {
		this.gearOverlay = createElementWithID('div', 'RESMainGearOverlay');
		this.gearOverlay.setAttribute('class', 'RESGearOverlay');
		$(this.gearOverlay).html('<div class="gearIcon"></div>');

		this.prefsDropdown = createElementWithID('div', 'RESPrefsDropdown', 'RESDropdownList');
		$(this.prefsDropdown).html('<ul id="RESDropdownOptions"><li id="SettingsConsole">settings console</li><li id="RES-donate">donate to RES</li></ul>');
		var thisSettingsButton = this.prefsDropdown.querySelector('#SettingsConsole');
		this.settingsButton = thisSettingsButton;
		thisSettingsButton.addEventListener('click', function() {
			RESConsole.hidePrefsDropdown();
			RESConsole.open();
		}, true);
		var thisDonateButton = this.prefsDropdown.querySelector('#RES-donate');
		thisDonateButton.addEventListener('click', function() {
			RESUtils.openLinkInNewTab('http://redditenhancementsuite.com/contribute.html', true);
		}, true);
		$(this.prefsDropdown).mouseleave(function() {
			RESConsole.hidePrefsDropdown();
		});
		$(this.prefsDropdown).mouseenter(function() {
			clearTimeout(RESConsole.prefsTimer);
		});
		$(this.gearOverlay).mouseleave(function() {
			RESConsole.prefsTimer = setTimeout(function() {
				RESConsole.hidePrefsDropdown();
			}, 1000);
		});
		document.body.appendChild(this.gearOverlay);
		document.body.appendChild(this.prefsDropdown);
		if (RESStorage.getItem('RES.newAnnouncement', 'true')) {
			RESUtils.setNewNotification();
		}
	},
	showPrefsDropdown: function(e) {
		var thisTop = parseInt($(RESConsole.userMenu).offset().top + 1, 10);
		// var thisRight = parseInt($(window).width() - $(RESConsole.RESPrefsLink).offset().left, 10);
		// thisRight = 175-thisRight;
		var thisLeft = parseInt($(RESConsole.RESPrefsLink).offset().left - 6, 10);
		// $('#RESMainGearOverlay').css('left',thisRight+'px');
		$('#RESMainGearOverlay').css('height', $('#header-bottom-right').outerHeight() + 'px');
		$('#RESMainGearOverlay').css('left', thisLeft + 'px');
		$('#RESMainGearOverlay').css('top', thisTop + 'px');
		RESConsole.prefsDropdown.style.top = parseInt(thisTop + $(RESConsole.userMenu).outerHeight(), 10) + 'px';
		RESConsole.prefsDropdown.style.right = '0px';
		RESConsole.prefsDropdown.style.display = 'block';
		$('#RESMainGearOverlay').show();
		modules['styleTweaks'].setSRStyleToggleVisibility(false, 'prefsDropdown');
	},
	hidePrefsDropdown: function(e) {
		RESConsole.RESPrefsLink.classList.remove('open');
		$('#RESMainGearOverlay').hide();
		RESConsole.prefsDropdown.style.display = 'none';
		modules['styleTweaks'].setSRStyleToggleVisibility(true, 'prefsDropdown');
	},
	resetModulePrefs: function() {
		prefs = {
			'userTagger': true,
			'betteReddit': true,
			'singleClick': true,
			'subRedditTagger': true,
			'uppersAndDowners': true,
			'keyboardNav': true,
			'commentPreview': true,
			'showImages': true,
			'showKarma': true,
			'usernameHider': false,
			'accountSwitcher': true,
			'styleTweaks': true,
			'filteReddit': true,
			'spamButton': false,
			'bitcointip': false,
			'RESPro': false
		};
		this.setModulePrefs(prefs);
		return prefs;
	},
	getAllModulePrefs: function(force) {
		var storedPrefs;
		// if we've done this before, just return the cached version
		if ((!force) && (typeof this.getAllModulePrefsCached !== 'undefined')) return this.getAllModulePrefsCached;
		// get the stored preferences out first.
		if (RESStorage.getItem('RES.modulePrefs') !== null) {
			storedPrefs = safeJSON.parse(RESStorage.getItem('RES.modulePrefs'), 'RES.modulePrefs');
		} else if (RESStorage.getItem('modulePrefs') !== null) {
			// Clean up old moduleprefs.
			storedPrefs = safeJSON.parse(RESStorage.getItem('modulePrefs'), 'modulePrefs');
			RESStorage.removeItem('modulePrefs');
			this.setModulePrefs(storedPrefs);
		} else {
			// looks like this is the first time RES has been run - set prefs to defaults...
			storedPrefs = this.resetModulePrefs();
		}
		if (storedPrefs === null) {
			storedPrefs = {};
		}
		// create a new JSON object that we'll use to return all preferences. This is just in case we add a module, and there's no pref stored for it.
		var prefs = {};
		// for any stored prefs, drop them in our prefs JSON object.
		for (var module in modules) {
			if (storedPrefs[module]) {
				prefs[module] = storedPrefs[module];
			} else if ((!modules[module].disabledByDefault) && ((storedPrefs[module] == null) || (module === 'dashboard'))) {
				// looks like a new module, or no preferences. We'll default it to on.
				// we also default dashboard to on. It's not really supposed to be disabled.
				prefs[module] = true;
			} else {
				prefs[module] = false;
			}
		}
		if ((typeof prefs !== 'undefined') && (prefs !== 'undefined') && (prefs)) {
			this.getAllModulePrefsCached = prefs;
			return prefs;
		}
	},
	getModulePrefs: function(moduleID) {
		if (moduleID) {
			var prefs = this.getAllModulePrefs();
			return prefs[moduleID];
		} else {
			alert('no module name specified for getModulePrefs');
		}
	},
	setModulePrefs: function(prefs) {
		if (prefs !== null) {
			RESStorage.setItem('RES.modulePrefs', JSON.stringify(prefs));
			return prefs;
		} else {
			alert('error - no prefs specified');
		}
	},
	create: function() {
		// create the console container
		this.RESConsoleContainer = createElementWithID('div', 'RESConsole');
		// hide it by default...
		// this.RESConsoleContainer.style.display = 'none';
		// create a modal overlay
		this.modalOverlay = createElementWithID('div', 'modalOverlay');
		this.modalOverlay.addEventListener('click', function(e) {
			e.preventDefault();
			return false;
		}, true);
		document.body.appendChild(this.modalOverlay);
		// create the header
		var RESConsoleHeader = createElementWithID('div', 'RESConsoleHeader');
		// create the top bar and place it in the header
		var RESConsoleTopBar = createElementWithID('div', 'RESConsoleTopBar');
		this.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAeCAMAAABHRo19AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACxFBMVEXw8/wAAAD+//8EBAQSEhIPDw/w8/v+/v4JCQkHBwcCAgKSk5W8vLz9SADz8/MtLS0iIiIcHBz/VAAYGBmRkZFkZGUkJCQVFhZiYmOZmp2QkpfQ09r9/f3n6vA5OTkvLy//TAAxMTEUFRTl5eVqa2zu8fnt7/fV19ydnqCen6Lt8Pj/TwDk5ORaWlrg4ug1NTUpKSrX19cgICDp6/J6enrFxcW1trpDQ0M7OzwnJyenp6f6TQAXFxj/WACFhojr6+uNjpBHR0cfHx+vr7GSkpJMTEwYGBg+Pj5cXF3CwsJISEj29vYQEBDe3t7+SwBmZmixsbH19fXo6OhQUFAgICJgYWXHyM3q7PTs7vW3uLvb3eKqq650dXbS09js7/aTlJY5OjmUlJeenp7r7vWWl5n8/Px4eHihoqWEhYfO0NTj5euDg4Pa3OGRkpTJy8/g4ODe4Obc3Nzv8vqjo6O1tbW3uLyrq6t1dXX5ya5/f3/5xqxZWVqKiopra2v4uJb99vLCw8fFxsouLS6Oj5Hs7OzY2t+jpKZ4eXv2tY8NDQ35WQny8vJkZGT2lWGQkJB8fHzi5OrLzNFAQUPm6O/3f0W7u7v3oXP4dTb2nXH62MX3pHb87+bn5+dWV1dvb3E0NDT4lWP3jFP4vJn2cS79+vaJioxNTU376d72f0H4Wwf2fT7759z9+fX1lmH4XAv2bSb40bheX2A6Ojr9+vj76t/9+vf76+H5XxVGRkZxcnPQ0te+vr52dnaztLfExMT2tZFYWFhSUlLV1dVwcXL52MS4uLiysrKam5rW1tZPT1CVlZWYmJiUlJRHR0ipqq0qKiqzs7P39/fq6urj4+P89fH09PT6+vo4ODjq7PNsbW4oKCh0dHTv7++3t7fk5u2IiYtFRUU3NzdPT0/Kysru7u6NjY1tbW1gYGBfX19sbGyHh4fh4eEzPXfuAAACPElEQVR4Xq3SQ9fkQBTH4bpVSdru17Zt28bYtm3btm3btm37S8yk0oteTKc7c+a3uf/Nc3JyEvT/48KF69Uhu7dk3AfaZ48PRiHgUwLdpGLdtFbecrkPOxvjuSRcmp2vaIsQt6gdLME4UtlGGs6NFW7+GIw7Qidp2BAq3KaQWg650mwC9LSs6JpRfZG03PTo32reMrmzIW3IlGaSZY/W+aCcoY/xq1SCKXAC5xAaGObkFoSmZoK3uaxqlgzL6vol3UohjIpDLWq6J4jaaNZUnsb4syMCsHU5o10q4015sZAshp2LuuCu4DSZFzJrrh0GURj3Ai8BNHrQ08TdyvZXDsDzYBD+W4OJK5bFh9nGIaRuKKTTxw5fOtJTUCtWjh3H31NQiCdOso2DiVlXSsXGDN+M6XRdnlmtmUNXYrGaLPhD3IFvoQfQrH4KkMdRsjgiK2IZXcurs4zHVvFrdSasQTaeTFu7DtPWa4yaDXSd0xh9N22mMyUVieItWwW8bfuOnbvo2r1n7779mOZ6QByHHsRChw4fsXwsz6OPsdDxE0i0kyQA20rLFIhjzuW0TVxIgpB4Z+AsBRXn1RZTdeEivXFyFbLXJTaJvmkDNJgLrly95iR3juTt9eIbyH6ucJPq2hJGQQiru63lbbriDocc6C7cu1/BgwcPH9U/4cdT9TNQIcd6/oK8fFWbg4Vev0n0I6VvkcO9A38Fq495X5T3wZkhLvAROZ6KYT59Lvvy9VvU9x8/1fW/DEygHfEbNdeCkgdk4HMAAAAASUVORK5CYII=';
		// this string is split because a specific sequence of characters screws up some git clients into thinking this file is binary.
		this.loader = 'data:image/gif;base64,R0lGODlhHQAWANUAAESatESetEyetEyitEyivFSivFSmvFymvFyqvGSqvGSqxGSuxGyuxGyyxHSyxHS2xHS2zHy2zHy6zIS6zIS+zIy+zIzCzIzC1JTG1JzK1JzK3JzO3KTO3KTS3KzS3KzW3LTW3LTW5LTa5Lza5Lze5MTe5MTi5MTi7Mzi7Mzm7NTm7NTq7Nzq7Nzq9Nzu9OTu9OTy9Ozy9Oz29Oz2/PT2/PT6/Pz6/Pz+/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH';
		this.loader += '/C05FVFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh+QQIBgAAACwAAAAAHQAWAAAG/sCbcEgs3myyEIzjQr2MUGjrgpFMrJIMhxTtei4SbPhKwXCeXaLren00GIuHlSLxzNJDD4NOWST8CwsUgxEjeEIcDYN0ICkjFA4UFYMcRXckIS8XKysTCJKSGCMkHBUXpwwXRC8UGheLpgsMDBKmF6YWF7kODYY3LmawoKcXCxIKFMSnkBIELDczIxODk2SmpoMFbg8XDg4SAAoTNTUY1BcTDQsKCw2nGGAMBAUJDQcCDZ8yNzESya8NFDCAEFAChoO6GGSowEDDggsq0HhIZisVixkwQFDBkIHCARQ1XICosSIGEYe5MFjAsE8IigwcYWa402VEyoNmRozgkEFDbs8MBRS0jJJCwAOcMn1u4MBTA4UHNdLIgIAOg08NGphqZWAggohDHBIEqMCRqZYMEjZMMPBgaJcYcDAcQMBhwgMOGOg9AOHrUIkQ8hJQQKDgQaQFEQ4ZuRABxSwREtqWcKHYiIwaWm6UGBG18o0gACH5BAgGAAAALAAAAAAdABYAAAb';
		this.loader += '+wJtwSCwKXabWBjaS2YxQowqDkUysEg4GFe1+LtgrVkKddYsvCRbSYCwcEgpl4jGfhR3GnLJILP4JchQQJXdCHhCCEiApIxUNFZESGkUzNCsaMBwjMRQFE3IVGCMkHBYXFBcQGEM1NhRUexWqCRAQsxcWuBcXEQgkQjEXGYIUFanIDxENEry5F48SByo3MCWCx1fGzlcHCxKQEggUAgYWrqjGcg0LCguQuVUNBwUJbgIKDBFmMKi4DfnYKCBDhUqDCRgWYFDmAoYQDs2cMcCwYkaMEBYKUjiAAsaMDzFgxCDiocEpDBcwjBSSIkMGDRkwWHDYJUSqghg2jBjB4eVzSwwKINA4Y0JAhIIuYcLkoKFnAwc1zsyYYCFC0pccsmZNcNCDoQ4FCmAQ1TPr2A4JClCIeufFggcUAkDg8ECCBwkF4F4YYYhlCAQFHEwwwECCAwcINDzpK2QGBQ4gFEwAsSDDDA4vGBOxUaMfFw5cNN8IAgAh+QQIBgAAACwAAAAAHQAWAAAG/sCbcEgsClcqlAc2qtWMUCOKc5FYrZyK6xmFhizWiURMxmBm3SIMMp48GoyFQ0Kpc9BpIcchpiz+';
		this.loader += 'gHUUESd5Qh4QghIhKCMUDhQVFBIYRTMvMxgtIxw1GAJ0khkiJRwUF6gRGUNOGRUYghQYEQgSEBcWFBa7uGAEIUI1p7GSFRUXg3MRqKgWFwoRCSs3LiPIkhRkyKgSDggFj3UHEwcEFk8ZoXUNCn8OqBjIDQj0Cg0CCA8PMTctsMcX4jBwwI6SGQsZAnJYcKrBCn43ODxgFvBCixkwvpjJQIGBChU3RqioAVFIiAjOMFjAIGNICgwZNGTA4ABGmhATzZjhMIJTacyYNClwiVLCgKyNP2VyWIqhgIOhUGQkwyBT6VIOGRSA4WCIg4AGHDNgZYrBawEMUKO0aCCBAYALGRiUZVCLwoMRhoS80IDgQIQGBuY0SJDgRMm8MCiguJAgZgIUL23mlcLyBQbJk28EAQAh+QQIBgAAACwAAAAAHQAWAAAG/sCbcEgsClWwEElFstWMUGPpM5FUJxTMBUaLRkcUq2QsplwwXS8R5hBDGoxFm0LXyNRDj4OCXSQWgAl0FBEpeEIce3QSISlgDhUUFRAXRTQqNRwlKhgzGgUQgxkjJRxmFxcTHEMzLyRmgxQaFIIQFReRqBcWFxIDH0MYsZKSu2MMhLoWtwzNKjctHsJ0FWPFqBMLCAIXDxEXBw4MARhPHhKSkXCADbdnFA4KfggNBaASMDecxBcN8g7+JGAYiArEggwOHHRogOLODQ8NdF1YgKHFjCRnBlqQ0MKEjRRN8g0JcWoghhhDUmTIoCEDBQUio3hQYMEkhg0jRnBgyTMLcEovJhbUHLiypQYNOzlIABDhiZcYLx/wbMmh6k4IGbAe0jBgQi+kGapi4FABAAIOP9WsiCDBnksHHDAceEABAgMTh4TMqIBggYQDCCREWHBgAYxneYW0wPCiwQIQEh686FAusREQHmyE4FDDhuUbQQAAIfkECAYAAAAsAAAAAB0AFgAABv7Am3BILN5sqhlHVUrVaMaosSSSUCTYygUTm0mlKKxkIiZTKJrat/hqkCcPhrxhpVQw3rXwA6FMKAoLgoJnVyl6QhwMhRIfKCQUDhV2EBdFNSc0IhwvGiocCH12GSMlHBQXqRIcQzMoKhMWhRQZFwwSERd2uhcWvRQFHkMef4UVkxcVVgtXqRYYWg4HDSs3LRgYs2apvRMGCgJjDxcKoQIYNjcjEWe6DQyBDVpbFg8JDAsGDAcCDxQuN1DwSgVvwYMGCiRgyyYBxQILExR8iBBCzY0QDXz5YoChxQwYIZ5hyAANRokYLkQ8IfJhHoZnMYagyEBTA4QDMNZwMCAS23aGESM6ZNAwlGaFPGByLaRZMwMHDRwaBKCQ7osMCQUk1NQAlYPXlxoUaECE4QCGCKuccqDpwUEABh5eIFoRKUCCqBKIJbgg4V4LREJmPFAQ4UGBRQ0QIJjgggTgISpGmFDwwAODCy0mbHhshIaHQxdG3KhRFXAQACH5BAgGAAAALAAAAAAdABYAAAb+wJtwSCzeaiwYxwVyxWrGqBEVklAkksmFspxJpalHdoydZDu0b7HlME8ejAVDTKFULlC1MAShTCgLCguDC3V+J182QxmFdRIeKSMUDnYUEBhGJy4rGDAeJRwMlHYZI6B3FxcPHUM0ISwVlXUYGA0QWhRbFhe7FhUIHkI1JVaGsbEXERILf6mpuxEDDCs3LncWdRVYuc4WBgsCDxUNFA8CEAUXNzYnVrEUDXEKDXcYFxURB3IICgoCDRhY3EDRLFUDQRAOSqCFAV4KZRgQcMDAYQiJB7xSMcCwggaMEBVoZaAlA0XHEDBqKBLSAZU9DDGGoNCAIYMGBwdiftFQwAJ1Q4ojRnDIYLOoBC9fVORiOFKDTQ0coi44oE7NjAYCKBB1CnVD1JoVDlTUcwEgAy4Zog7lcMDAQhd6qmFIAEBCBgUWODhokKHBgQY648Jg0CCCvwgUEhxIwCFoXCIqXGRIUFOBBxINSDyO4mnGCgoubMDYLCQIACH5BAgGAAAALAAAAAAdABYAAAb+wJtwSCzeaq+W59WZuWrGqFHFkVAkkolFMkrRpFIUZJLFlsmiGLi4gmApjwaD0ZhQ7hfbejhyUOwLCQuDC3d3JWB6QhoIhhEgKCMUfhUVEBlGKCcwFyonHhwOEHcVGCMkHBUXFxUNHEM1HigZFBWGpRENFKsXFr2/FA0hQjAtdoa1uxcSDwyjqr4XfwIKLDcxyYZktau+CgkGDRcPERQBDo1HJ8fSDQsKCw2qGNIQBQsMCQcMAggaLTdQlOPFQIGzBgokYFhIYQGIDA0yFAqR4csNExC6XWBwgcUMGCFKLVwYo0WJGiVW2FB0Q4OWVQtlDJmFQUOGCAlgrOFw4MJ9SAwcRozokEGDhg0cLDiYsWbFlpEZMBQtyoFDBgYOLkABM+NAAQsZpmqoWjUDhwYFPuy5sYwCgppmrVot8EBCBRdrX2AoIADDhAVhGZQ6YEDC1rUrGEwyUIBChAUIFpAwtZaIixkQHEpYUOKqC5aVh7AoYcNDhRozXoQWEgQAIfkECAYAAAAsAAAAAB0AFgAABv7Am3BILN5ostNo5ZmtbMaosZWhUCQTSUVSItWk0hIES5aQJ6UXuLgyZyONBcMhsVIw37VwBJlYFwmACwt2FCNgUEIZCFZZICkjFA4UFRQRG0YuITIaIi0eGBARdhohJRwXqRcLGUQeIRx+dn4SCxWptxYXt1sRIUIuK5V2FZWpEw0OCxYUqbpWBgYsR8NWW3W4FxYOCIMWEg4XAggMFDY1IpW3FHEKCw23GBeSAgoNDAINBQcbLTcqD5rNY6CAAQSCEjAopMAAg4cFGBw0QJFhhpATE1StwrBiRgwQdzBkwEABBo0QNFacKILhgSqFMYak0JAhg4YIEGKC8cDggnZChRxGjOBQk6aGWjLWrKDw4OdIoxqIcnBgwUIeKTEMKFBo0yaHr0Q1GCBwSA9JBwe6fs3AwcKBC+Bc6LkRg0IBBBrmcGDHoYKAtDrnomhwAd8yBggUPAjxoMRcIjFgJJAAYgEEE2NqWHzMpkWNCx5usFDD+UYQACH5BAgGAAAALAAAAAAdABYAAAb+wJtwSCzeajWRqjSKqYxQ6OuCkVgnFMlpVItGR1fJxCrJUkYvb3EliYwfjLijPN501cKQw7zo+ymAEyJqNkIaCYBZICgjFHsVFRIcRjQcMCEbMSESD1gVFBkiJRwWFxQXCxhEIRkeiaeOEgqnFRcVpbUXViBCLSUYr5+fpgsQCqYXyaYUCQQsR8CAn2MUuRcWEgcOC4ALFgcEDBI2NRymtRQNfg25GBMNAQgMDQUJCAUZaS4OFsMMfQ4aKJCAoaAFCBJGLPiEoIQHGEJInFKWqsUMTRQKZrjg4IUNES1klCiCgYGygjGGoMigIUOGahC9bLJQsOCGESM6tGSpYYFwgRlqUgSs6ZKlSw4tQU24EyXGAQgYXGpoqYGDVXMCDozEA+yAggwYrlqV0CBDgwZp8MyQUOABBgMUODiI0MGBgAQhVuAZUqKaAgEQKCBI0CAjA717h9QogaBqggshEnCwkTYxkRU0VkxQYcNETMtBAAAh+QQIBgAAACwAAAAAHQAWAAAG/sCbcEgs3mo0kAuEaq2MUOiLgpFYKZLLaBTthrATSViMrYRe3WILLHk0GAuHhILt1NLDDyNMWSgWCQsLFBNYXHg3HIN0EiApIxQOFBWEHEU1Nh4oKRgvJREMk5MYIyUclBcXCxdEKBcedIUXFAwPCpOpFhSpqQ8Qhy0dHHR0lKgXChIIu7kYWA4DLUcchaJ8vLoUBhELEhYMEg0A4DY1GbMVsw2CCg3pGFUMAgftBgcLBxcyNzEQzBQNFDBwEFACPAwXJjTwEOEBhgQeSMAQIoKChXQXGGBYMSOGiAoHLSxQcePECRsoZhDBoCAVQgwxhqDAoCGDBngqu0A6CI/DdJYONoMaKLCvS4oDDQ5moGlzA4cNSzNEuNNFhoIKFjAE1eCUg9cIARaUQMTBgQAIN716lZr1gIOJeGY0yBehgFaNHBAMYEBiLKIbJDg8KGBgwgMECRxUgNAg5l8hNjQwgAQRw4IUMKQ9JuLiRsUaMEYUfRwEADs=';
		RESConsoleTopBar.setAttribute('class', 'RESDialogTopBar');
		$(RESConsoleTopBar).html('<img id="RESLogo" src="' + this.logo + '"><h1>reddit enhancement suite</h1>');
		RESConsoleHeader.appendChild(RESConsoleTopBar);
		this.RESConsoleVersion = createElementWithID('div', 'RESConsoleVersion');
		$(this.RESConsoleVersion).text('v' + RESVersion);
		RESConsoleTopBar.appendChild(this.RESConsoleVersion);

		// Create the search bar and place it in the top bar
		var RESSearchContainer = modules['settingsNavigation'].renderSearchForm();
		RESConsoleTopBar.appendChild(RESSearchContainer);

		var RESSubredditLink = createElementWithID('a', 'RESConsoleSubredditLink');
		$(RESSubredditLink).text('/r/Enhancement');
		RESSubredditLink.setAttribute('href', 'http://reddit.com/r/Enhancement');
		RESSubredditLink.setAttribute('alt', 'The RES Subreddit');
		RESConsoleTopBar.appendChild(RESSubredditLink);
		// create the close button and place it in the header
		var RESClose = createElementWithID('span', 'RESClose', 'RESCloseButton');
		$(RESClose).text('×');
		RESClose.addEventListener('click', function(e) {
			e.preventDefault();
			RESConsole.close();
		}, true);
		RESConsoleTopBar.appendChild(RESClose);
		this.categories = [];
		for (var module in modules) {
			if ((typeof modules[module].category !== 'undefined') && (this.categories.indexOf(modules[module].category) === -1)) {
				this.categories.push(modules[module].category);
			}
		}
		this.categories.sort();
		// create the menu
		// var menuItems = this.categories.concat(['RES Pro','About RES'));
		var menuItems = this.categories.concat(['About RES']);
		var RESMenu = createElementWithID('ul', 'RESMenu');
		for (var item = 0; item < menuItems.length; item++) {
			var thisMenuItem = document.createElement('li');
			$(thisMenuItem).text(menuItems[item]);
			thisMenuItem.setAttribute('id', 'Menu-' + menuItems[item]);
			thisMenuItem.addEventListener('click', function(e) {
				e.preventDefault();
				RESConsole.menuClick(this);
			}, true);
			RESMenu.appendChild(thisMenuItem);
		}
		RESConsoleHeader.appendChild(RESMenu);
		this.RESConsoleContainer.appendChild(RESConsoleHeader);
		// Store the menu items in a global variable for easy access by the menu selector function.
		RESConsole.RESMenuItems = RESMenu.querySelectorAll('li');
		// Create a container for each management panel
		this.RESConsoleContent = createElementWithID('div', 'RESConsoleContent');
		this.RESConsoleContainer.appendChild(this.RESConsoleContent);
		// Okay, the console is done. Add it to the document body.
		document.body.appendChild(this.RESConsoleContainer);

		window.addEventListener("keydown", function(e) {
			if ((RESConsole.captureKey) && (e.keyCode !== 16) && (e.keyCode !== 17) && (e.keyCode !== 18)) {
				// capture the key, display something nice for it, and then close the popup...
				e.preventDefault();
				var keyArray = [e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey];
				document.getElementById(RESConsole.captureKeyID).value = keyArray.join(",");
				document.getElementById(RESConsole.captureKeyID + '-display').value = RESUtils.niceKeyCode(keyArray);
				RESConsole.keyCodeModal.style.display = 'none';
				RESConsole.captureKey = false;
			}
		});

		$("#RESConsoleContent").on({
			focus: function(e) {
				var thisXY = RESUtils.getXYpos(this, true);
				// show dialog box to grab keycode, but display something nice...
				$(RESConsole.keyCodeModal).css({
					display: "block",
					top: RESUtils.mouseY + "px",
					left: RESUtils.mouseX + "px;"
				});
				// RESConsole.keyCodeModal.style.display = 'block';
				RESConsole.captureKey = true;
				RESConsole.captureKeyID = this.getAttribute('capturefor');
			},
			blur: function(e) {
				$(RESConsole.keyCodeModal).css("display", "none");
			}
		}, ".keycode + input[type=text][displayonly]");

		this.keyCodeModal = createElementWithID('div', 'keyCodeModal');
		$(this.keyCodeModal).text('Press a key (or combination with shift, alt and/or ctrl) to assign this action.');
		document.body.appendChild(this.keyCodeModal);
	},
	drawConfigPanel: function(category) {
		if (!category) return;

		this.drawConfigPanelCategory(category);
	},
	getModuleIDsByCategory: function(category) {
		var moduleList = [];
		for (var i in modules) {
			if (modules[i].category == category && !modules[i].hidden) moduleList.push(i);
		}
		moduleList.sort(function(a, b) {
			if (modules[a].moduleName.toLowerCase() > modules[b].moduleName.toLowerCase()) return 1;
			return -1;
		});

		return moduleList;
	},
	drawConfigPanelCategory: function(category, moduleList) {
		$(this.RESConsoleConfigPanel).empty();

		/*
		var moduleTest = RESStorage.getItem('moduleTest');
		if (moduleTest) {
			console.log(moduleTest);
			// TEST loading stored modules...
			var evalTest = eval(moduleTest);
		}
		*/
		moduleList = moduleList || this.getModuleIDsByCategory(category);

		this.RESConfigPanelModulesPane = createElementWithID('div', 'RESConfigPanelModulesPane');
		for (var i = 0, len = moduleList.length; i < len; i++) {
			var thisModuleButton = createElementWithID('div', 'module-' + moduleList[i]);
			thisModuleButton.classList.add('moduleButton');
			var thisModule = moduleList[i];
			$(thisModuleButton).text(modules[thisModule].moduleName);
			if (modules[thisModule].isEnabled()) {
				thisModuleButton.classList.add('enabled');
			}
			thisModuleButton.setAttribute('moduleID', modules[thisModule].moduleID);
			thisModuleButton.addEventListener('click', function(e) {
				RESConsole.showConfigOptions(this.getAttribute('moduleID'));
			}, false);
			this.RESConfigPanelModulesPane.appendChild(thisModuleButton);
		}
		this.RESConsoleConfigPanel.appendChild(this.RESConfigPanelModulesPane);

		this.RESConfigPanelOptions = createElementWithID('div', 'RESConfigPanelOptions');
		$(this.RESConfigPanelOptions).html('<h1>RES Module Configuration</h1> Select a module from the column at the left to enable or disable it, and configure its various options.');
		this.RESConsoleConfigPanel.appendChild(this.RESConfigPanelOptions);
		this.RESConsoleContent.appendChild(this.RESConsoleConfigPanel);
	},
	updateSelectedModule: function(moduleID) {
		var moduleButtons = $(RESConsole.RESConsoleConfigPanel).find('.moduleButton');
		moduleButtons.removeClass('active');
		moduleButtons.filter(function() {
			return this.getAttribute('moduleID') === moduleID;
		})
			.addClass('active');
	},
	drawOptionInput: function(moduleID, optionName, optionObject, isTable) {
		var thisOptionFormEle;
		switch (optionObject.type) {
			case 'textarea':
				// textarea...
				thisOptionFormEle = createElementWithID('textarea', optionName);
				thisOptionFormEle.setAttribute('type', 'textarea');
				thisOptionFormEle.setAttribute('moduleID', moduleID);
				$(thisOptionFormEle).html(escapeHTML(optionObject.value));
				break;
			case 'text':
				// text...
				thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type', 'text');
				thisOptionFormEle.setAttribute('moduleID', moduleID);
				thisOptionFormEle.setAttribute('placeHolder', optionObject.placeHolder || '');
				thisOptionFormEle.setAttribute('value', optionObject.value);
				break;
			case 'button':
				// button...
				thisOptionFormEle = createElementWithID('button', optionName);
				thisOptionFormEle.classList.add('RESConsoleButton');
				thisOptionFormEle.setAttribute('moduleID', moduleID);
				thisOptionFormEle.textContent = optionObject.text;
				thisOptionFormEle.addEventListener('click', optionObject.callback, false);
				break;
			case 'list':
				// list...
				thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('class', 'RESInputList');
				thisOptionFormEle.setAttribute('type', 'text');
				thisOptionFormEle.setAttribute('moduleID', moduleID);
				// thisOptionFormEle.setAttribute('value',optionObject.value);
				existingOptions = optionObject.value;
				if (typeof existingOptions === 'undefined') existingOptions = '';
				var prepop = [];
				var optionArray = existingOptions.split(',');
				for (var i = 0, len = optionArray.length; i < len; i++) {
					if (optionArray[i] !== '') prepop.push({
						id: optionArray[i],
						name: optionArray[i]
					});
				}
				setTimeout(function() {
					$(thisOptionFormEle).tokenInput(optionObject.source, {
						method: "POST",
						queryParam: "query",
						theme: "facebook",
						allowFreeTagging: true,
						zindex: 999999999,
						onResult: (typeof optionObject.onResult === 'function') ? optionObject.onResult : null,
						onCachedResult: (typeof optionObject.onCachedResult === 'function') ? optionObject.onCachedResult : null,
						prePopulate: prepop,
						hintText: (typeof optionObject.hintText === 'string') ? optionObject.hintText : null
					});
				}, 100);
				break;
			case 'password':
				// password...
				thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type', 'password');
				thisOptionFormEle.setAttribute('moduleID', moduleID);
				thisOptionFormEle.setAttribute('value', optionObject.value);
				break;
			case 'boolean':
				// checkbox
				/*
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','checkbox');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				if (optionObject.value) {
					thisOptionFormEle.setAttribute('checked',true);
				}
				*/
				thisOptionFormEle = RESUtils.toggleButton(optionName, optionObject.value, null, null, isTable);
				break;
			case 'enum':
				// radio buttons
				if (typeof optionObject.values === 'undefined') {
					alert('misconfigured enum option in module: ' + moduleID);
				} else {
					thisOptionFormEle = createElementWithID('div', optionName);
					thisOptionFormEle.setAttribute('class', 'enum');
					for (var j = 0; j < optionObject.values.length; j++) {
						var thisDisplay = optionObject.values[j].display;
						var thisValue = optionObject.values[j].value;
						var thisId = optionName + '-' + j;
						var thisOptionFormSubEle = createElementWithID('input', thisId);
						if (isTable) thisOptionFormSubEle.setAttribute('tableOption', 'true');
						thisOptionFormSubEle.setAttribute('type', 'radio');
						thisOptionFormSubEle.setAttribute('name', optionName);
						thisOptionFormSubEle.setAttribute('moduleID', moduleID);
						thisOptionFormSubEle.setAttribute('value', optionObject.values[j].value);
						var nullEqualsEmpty = ((optionObject.value == null) && (optionObject.values[j].value === ''));
						// we also need to check for null == '' - which are technically equal.
						if ((optionObject.value == optionObject.values[j].value) || nullEqualsEmpty) {
							thisOptionFormSubEle.setAttribute('checked', 'checked');
						}
						var thisLabel = document.createElement('label');
						thisLabel.setAttribute('for', thisId);
						var thisOptionFormSubEleText = document.createTextNode(' ' + optionObject.values[j].name + ' ');
						thisLabel.appendChild(thisOptionFormSubEleText);
						thisOptionFormEle.appendChild(thisOptionFormSubEle);
						thisOptionFormEle.appendChild(thisLabel);
						var thisBR = document.createElement('br');
						thisOptionFormEle.appendChild(thisBR);
					}
				}
				break;
			case 'keycode':
				// keycode - shows a key value, but stores a keycode and possibly shift/alt/ctrl combo.
				var realOptionFormEle = $("<input>").attr({
					id: optionName,
					type: "text",
					class: "keycode",
					moduleID: moduleID
				}).css({
					border: "1px solid red",
					display: "none"
				}).val(optionObject.value);
				if (isTable) realOptionFormEle.attr('tableOption', 'true');

				var thisKeyCodeDisplay = $("<input>").attr({
					id: optionName + "-display",
					type: "text",
					capturefor: optionName,
					displayonly: "true"
				}).val(RESUtils.niceKeyCode(optionObject.value));
				thisOptionFormEle = $("<div>").append(realOptionFormEle).append(thisKeyCodeDisplay)[0];
				break;
			default:
				console.log('misconfigured option in module: ' + moduleID);
				break;
		}
		if (isTable) {
			thisOptionFormEle.setAttribute('tableOption', 'true');
		}
		return thisOptionFormEle;
	},
	enableModule: function(moduleID, onOrOff) {
		var prefs = this.getAllModulePrefs(true);
		prefs[moduleID] = !! onOrOff;
		this.setModulePrefs(prefs);
	},
	showConfigOptions: function(moduleID) {
		if (!modules[moduleID]) return;
		RESConsole.drawConfigOptions(moduleID);
		RESConsole.updateSelectedModule(moduleID);
		RESConsole.currentModule = moduleID;

		RESConsole.RESConsoleContent.scrollTop = 0;

		modules['settingsNavigation'].setUrlHash(moduleID);
	},
	drawConfigOptions: function(moduleID) {
		if (modules[moduleID] && modules[moduleID].hidden) return;
		var thisOptions = RESUtils.getOptions(moduleID);
		var optCount = 0;

		this.RESConfigPanelOptions.setAttribute('style', 'display: block;');
		$(this.RESConfigPanelOptions).html('');
		// put in the description, and a button to enable/disable the module, first..
		var thisHeader = document.createElement('div');
		thisHeader.classList.add('moduleHeader');
		$(thisHeader).html('<span class="moduleName">' + modules[moduleID].moduleName + '</span>');
		var thisToggle = document.createElement('div');
		thisToggle.classList.add('moduleToggle');
		if (moduleID === 'dashboard') thisToggle.style.display = 'none';
		$(thisToggle).html('<span class="toggleOn">on</span><span class="toggleOff">off</span>');
		if (modules[moduleID].isEnabled()) thisToggle.classList.add('enabled');
		thisToggle.setAttribute('moduleID', moduleID);
		thisToggle.addEventListener('click', function(e) {
			var activePane = RESConsole.RESConfigPanelModulesPane.querySelector('.active');
			var enabled = this.classList.contains('enabled');
			if (enabled) {
				activePane.classList.remove('enabled');
				this.classList.remove('enabled');
				RESConsole.moduleOptionsScrim.classList.add('visible');
				$('#moduleOptionsSave').hide();
			} else {
				activePane.classList.add('enabled');
				this.classList.add('enabled');
				RESConsole.moduleOptionsScrim.classList.remove('visible');
				$('#moduleOptionsSave').fadeIn();
			}
			RESConsole.enableModule(this.getAttribute('moduleID'), !enabled);
		}, true);
		thisHeader.appendChild(thisToggle);
		// not really looping here, just only executing if there's 1 or more options...
		for (var i in thisOptions) {
			var thisSaveButton = createElementWithID('input', 'moduleOptionsSave');
			thisSaveButton.setAttribute('type', 'button');
			thisSaveButton.setAttribute('value', 'save options');
			thisSaveButton.addEventListener('click', function(e) {
				RESConsole.saveCurrentModuleOptions(e);
			}, true);
			this.RESConsoleConfigPanel.appendChild(thisSaveButton);
			var thisSaveStatus = createElementWithID('div', 'moduleOptionsSaveStatus', 'saveStatus');
			thisHeader.appendChild(thisSaveStatus);
			break;
		}
		var thisDescription = document.createElement('div');
		thisDescription.classList.add('moduleDescription');
		$(thisDescription).html(modules[moduleID].description);
		thisHeader.appendChild(thisDescription);
		this.RESConfigPanelOptions.appendChild(thisHeader);
		var allOptionsContainer = createElementWithID('div', 'allOptionsContainer');
		this.RESConfigPanelOptions.appendChild(allOptionsContainer);
		// now draw all the options...
		for (var i in thisOptions) {
			if (!(thisOptions[i].noconfig)) {
				optCount++;
				var thisOptionContainer = createElementWithID('div', null, 'optionContainer');
				var thisLabel = document.createElement('label');
				thisLabel.setAttribute('for', i);
				$(thisLabel).text(i);
				var thisOptionDescription = createElementWithID('div', null, 'optionDescription');
				$(thisOptionDescription).html(thisOptions[i].description);
				thisOptionContainer.appendChild(thisLabel);
				if (thisOptions[i].type === 'table') {
					thisOptionDescription.classList.add('table');
					// table - has a list of fields (headers of table), users can add/remove rows...
					if (typeof thisOptions[i].fields === 'undefined') {
						alert('misconfigured table option in module: ' + moduleID + ' - options of type "table" must have fields defined');
					} else {
						// get field names...
						var fieldNames = [];
						// now that we know the field names, get table rows...
						var thisTable = document.createElement('table');
						thisTable.setAttribute('moduleID', moduleID);
						thisTable.setAttribute('optionName', i);
						thisTable.setAttribute('class', 'optionsTable');
						var thisThead = document.createElement('thead');
						var thisTableHeader = document.createElement('tr'),
							thisTH;
						thisTable.appendChild(thisThead);
						for (var j = 0; j < thisOptions[i].fields.length; j++) {
							fieldNames[j] = thisOptions[i].fields[j].name;
							thisTH = document.createElement('th');
							$(thisTH).text(thisOptions[i].fields[j].name);
							thisTableHeader.appendChild(thisTH);
						}
						// add delete column
						thisTH = document.createElement('th');
						$(thisTH).text('delete');
						thisTableHeader.appendChild(thisTH);
						// add move column
						thisTH = document.createElement('th');
						$(thisTH).text('move')
							.attr('title', 'click, drag, and drop')
							.css('cursor', 'help');
						thisTableHeader.appendChild(thisTH);
						thisThead.appendChild(thisTableHeader);
						thisTable.appendChild(thisThead);
						var thisTbody = document.createElement('tbody');
						thisTbody.setAttribute('id', 'tbody_' + i);
						if (thisOptions[i].value) {
							for (var j = 0; j < thisOptions[i].value.length; j++) {
								var thisTR = document.createElement('tr'),
									thisTD;
								$(thisTR).data('itemidx-orig', j);
								for (var k = 0; k < thisOptions[i].fields.length; k++) {
									thisTD = document.createElement('td');
									thisTD.className = 'hasTableOption';
									var thisOpt = thisOptions[i].fields[k];
									var thisFullOpt = i + '_' + thisOptions[i].fields[k].name;
									thisOpt.value = thisOptions[i].value[j][k];
									// var thisOptInputName = thisOpt.name + '_' + j;
									var thisOptInputName = thisFullOpt + '_' + j;
									var thisTableEle = this.drawOptionInput(moduleID, thisOptInputName, thisOpt, true);
									thisTD.appendChild(thisTableEle);
									thisTR.appendChild(thisTD);
								}
								// add delete button
								thisTD = document.createElement('td');
								var thisDeleteButton = document.createElement('div');
								thisDeleteButton.className = 'deleteButton';
								thisDeleteButton.addEventListener('click', RESConsole.deleteOptionRow);
								thisTD.appendChild(thisDeleteButton);
								thisTR.appendChild(thisTD);
								// add move handle
								thisTD = document.createElement('td');
								var thisHandle = document.createElement('div');
								$(thisHandle)
									.html("&#x22ee;&#x22ee;")
									.addClass('handle')
									.appendTo(thisTD);
								thisTR.appendChild(thisTD);
								thisTbody.appendChild(thisTR);
							}
						}
						thisTable.appendChild(thisTbody);
						var thisOptionFormEle = thisTable;
					}
					thisOptionContainer.appendChild(thisOptionDescription);
					thisOptionContainer.appendChild(thisOptionFormEle);
					// Create an "add row" button...
					var addRowText = thisOptions[i].addRowText || 'Add Row';
					var addRowButton = document.createElement('input');
					addRowButton.classList.add('addRowButton');
					addRowButton.setAttribute('type', 'button');
					addRowButton.setAttribute('value', addRowText);
					addRowButton.setAttribute('optionName', i);
					addRowButton.setAttribute('moduleID', moduleID);
					addRowButton.addEventListener('click', function() {
						var optionName = this.getAttribute('optionName');
						var thisTbodyName = 'tbody_' + optionName;
						var thisTbody = document.getElementById(thisTbodyName);
						var newRow = document.createElement('tr');
						var rowCount = (thisTbody.querySelectorAll('tr')) ? thisTbody.querySelectorAll('tr').length + 1 : 1;
						for (var i = 0, len = modules[moduleID].options[optionName].fields.length; i < len; i++) {
							var newCell = document.createElement('td');
							newCell.className = 'hasTableOption';
							var thisOpt = modules[moduleID].options[optionName].fields[i];
							if (thisOpt.type !== 'enum') thisOpt.value = '';
							var optionNameWithRow = optionName + '_' + thisOpt.name + '_' + rowCount;
							var thisInput = RESConsole.drawOptionInput(moduleID, optionNameWithRow, thisOpt, true);
							newCell.appendChild(thisInput);
							newRow.appendChild(newCell);
							$(newRow).data('option-index', rowCount - 1);
							var firstText = newRow.querySelector('input[type=text]');
							if (!firstText) firstText = newRow.querySelector('textarea');
							if (firstText) {
								setTimeout(function() {
									firstText.focus();
								}, 200);
							}
						}
						// add delete button
						thisTD = document.createElement('td');
						var thisDeleteButton = document.createElement('div');
						thisDeleteButton.className = 'deleteButton';
						thisDeleteButton.addEventListener('click', RESConsole.deleteOptionRow);
						thisTD.appendChild(thisDeleteButton);
						newRow.appendChild(thisTD);
						// add move handle
						thisTD = document.createElement('td');
						var thisHandle = document.createElement('div');
						$(thisHandle)
							.html("&#x22ee;&#x22ee;")
							.addClass('handle')
							.appendTo(newRow);

						var thisLen = (modules[moduleID].options[optionName].value) ? modules[moduleID].options[optionName].value.length : 0;
						$(thisTR).data('itemidx-orig', thisLen);

						thisTbody.appendChild(newRow);
					}, true);
					thisOptionContainer.appendChild(addRowButton);

					(function(moduleID, optionKey) {
						$(thisTbody).dragsort({
							itemSelector: "tr",
							dragSelector: ".handle",
							dragEnd: function() {
								var $this = $(this);
								var oldIndex = $this.data('itemidx-orig');
								var newIndex = $this.data('itemidx');
								var rows = modules[moduleID].options[optionKey].value;
								var row = rows.splice(oldIndex, 1)[0];
								rows.splice(newIndex, 0, row);
							},
							dragBetween: false,
							scrollContainer: this.RESConfigPanelOptions,
							placeHolderTemplate: "<tr><td>---</td></tr>"
						});
					})(moduleID, i);
				} else {
					if ((thisOptions[i].type === 'text') || (thisOptions[i].type === 'password') || (thisOptions[i].type === 'keycode')) thisOptionDescription.classList.add('textInput');
					var thisOptionFormEle = this.drawOptionInput(moduleID, i, thisOptions[i]);
					thisOptionContainer.appendChild(thisOptionFormEle);
					thisOptionContainer.appendChild(thisOptionDescription);
				}
				var thisClear = document.createElement('div');
				thisClear.setAttribute('class', 'clear');
				thisOptionContainer.appendChild(thisClear);
				allOptionsContainer.appendChild(thisOptionContainer);
			}
		}

		if (optCount === 0) {
			var noOptions = createElementWithID('div', 'noOptions');
			noOptions.classList.add('optionContainer');
			$(noOptions).text('There are no configurable options for this module');
			this.RESConfigPanelOptions.appendChild(noOptions);
		} else {
			// var thisSaveStatusBottom = createElementWithID('div','moduleOptionsSaveStatusBottom','saveStatus');
			// this.RESConfigPanelOptions.appendChild(thisBottomSaveButton);
			// this.RESConfigPanelOptions.appendChild(thisSaveStatusBottom);
			this.moduleOptionsScrim = createElementWithID('div', 'moduleOptionsScrim');
			if (modules[moduleID].isEnabled()) {
				RESConsole.moduleOptionsScrim.classList.remove('visible');
				$('#moduleOptionsSave').fadeIn();
			} else {
				RESConsole.moduleOptionsScrim.classList.add('visible');
				$('#moduleOptionsSave').fadeOut();
			}
			allOptionsContainer.appendChild(this.moduleOptionsScrim);
			// console.log($(thisSaveButton).position());
		}
	},
	deleteOptionRow: function(e) {
		var thisRow = e.target.parentNode.parentNode;
		$(thisRow).remove();
	},
	saveCurrentModuleOptions: function(e) {
		e.preventDefault();
		var panelOptionsDiv = this.RESConfigPanelOptions;
		// first, go through inputs that aren't a part of a "table of options"...
		var inputs = panelOptionsDiv.querySelectorAll('input, textarea');
		for (var i = 0, len = inputs.length; i < len; i++) {
			// save values of any inputs onscreen, but skip ones with 'capturefor' - those are display only.
			var notTokenPrefix = (inputs[i].getAttribute('id') !== null) && (inputs[i].getAttribute('id').indexOf('token-input-') === -1);
			if ((notTokenPrefix) && (inputs[i].getAttribute('type') !== 'button') && (inputs[i].getAttribute('displayonly') !== 'true') && (inputs[i].getAttribute('tableOption') !== 'true')) {
				// get the option name out of the input field id - unless it's a radio button...
				var optionName;
				if (inputs[i].getAttribute('type') === 'radio') {
					optionName = inputs[i].getAttribute('name');
				} else {
					optionName = inputs[i].getAttribute('id');
				}
				// get the module name out of the input's moduleid attribute
				var optionValue, moduleID = RESConsole.currentModule;
				if (inputs[i].getAttribute('type') === 'checkbox') {
					optionValue = !! inputs[i].checked;
				} else if (inputs[i].getAttribute('type') === 'radio') {
					if (inputs[i].checked) {
						optionValue = inputs[i].value;
					}
				} else {
					// check if it's a keycode, in which case we need to parse it into an array...
					if ((inputs[i].getAttribute('class')) && (inputs[i].getAttribute('class').indexOf('keycode') !== -1)) {
						var tempArray = inputs[i].value.split(',');
						// convert the internal values of this array into their respective types (int, bool, bool, bool)
						optionValue = [parseInt(tempArray[0], 10), (tempArray[1] === 'true'), (tempArray[2] === 'true'), (tempArray[3] === 'true'), (tempArray[4] === 'true')];
					} else {
						optionValue = inputs[i].value;
					}
				}
				if (typeof optionValue !== 'undefined') {
					RESUtils.setOption(moduleID, optionName, optionValue);
				}
			}
		}
		// Check if there are any tables of options on this panel...
		var optionsTables = panelOptionsDiv.querySelectorAll('.optionsTable');
		if (typeof optionsTables !== 'undefined') {
			// For each table, we need to go through each row in the tbody, and then go through each option and make a multidimensional array.
			// For example, something like: [['foo','bar','baz'],['pants','warez','cats']]
			for (var i = 0, len = optionsTables.length; i < len; i++) {
				var moduleID = optionsTables[i].getAttribute('moduleID');
				var optionName = optionsTables[i].getAttribute('optionName');
				var thisTBODY = optionsTables[i].querySelector('tbody');
				var thisRows = thisTBODY.querySelectorAll('tr');
				// check if there are any rows...
				if (typeof thisRows !== 'undefined') {
					// go through each row, and get all of the inputs...
					var optionMulti = [];
					var optionRowCount = 0;
					for (var j = 0; j < thisRows.length; j++) {
						var optionRow = [];
						var cells = thisRows[j].querySelectorAll('td.hasTableOption');
						var notAllBlank = false;
						for (var k = 0; k < cells.length; k++) {
							var inputs = cells[k].querySelectorAll('input[tableOption=true], textarea[tableOption=true]');
							var optionValue = null;
							for (var l = 0; l < inputs.length; l++) {
								// get the module name out of the input's moduleid attribute
								// var moduleID = inputs[l].getAttribute('moduleID');
								if (inputs[l].getAttribute('type') === 'checkbox') {
									optionValue = inputs[l].checked;
								} else if (inputs[l].getAttribute('type') === 'radio') {
									if (inputs[l].checked) {
										optionValue = inputs[l].value;
									}
								} else {
									// check if it's a keycode, in which case we need to parse it into an array...
									if ((inputs[l].getAttribute('class')) && (inputs[l].getAttribute('class').indexOf('keycode') !== -1)) {
										var tempArray = inputs[l].value.split(',');
										// convert the internal values of this array into their respective types (int, bool, bool, bool)
										optionValue = [parseInt(tempArray[0], 10), (tempArray[1] === 'true'), (tempArray[2] === 'true'), (tempArray[3] === 'true')];
									} else {
										optionValue = inputs[l].value;
									}
								}
								if ((optionValue !== '') && (inputs[l].getAttribute('type') !== 'radio')
									//If no keyCode is set, then discard the value
									&& !(Array.isArray(optionValue) && isNaN(optionValue[0]))) {
									notAllBlank = true;
								}
								// optionRow[k] = optionValue;
							}
							optionRow.push(optionValue);
						}
						// just to be safe, added a check for optionRow !== null...
						if ((notAllBlank) && (optionRow !== null)) {
							optionMulti[optionRowCount] = optionRow;
							optionRowCount++;
						}
					}
					if (optionMulti == null) {
						optionMulti = [];
					}
					// ok, we've got all the rows... set the option.
					if (typeof optionValue !== 'undefined') {
						RESUtils.setOption(moduleID, optionName, optionMulti);
					}
				}
			}
		}

		var statusEle = document.getElementById('moduleOptionsSaveStatus');
		if (statusEle) {
			$(statusEle).text('Options have been saved...');
			statusEle.setAttribute('style', 'display: block; opacity: 1');
		}
		RESUtils.fadeElementOut(statusEle, 0.1);
		if (moduleID === 'RESPro') RESStorage.removeItem('RESmodules.RESPro.lastAuthFailed');
	},
	drawAboutPanel: function() {
		var RESConsoleAboutPanel = this.RESConsoleAboutPanel;
		var AboutPanelHTML = ' \
<div id="RESAboutPane"> \
	<div id="Button-DonateRES" class="moduleButton active">Donate</div> \
	<div id="Button-AboutRES" class="moduleButton">About RES</div> \
	<div id="Button-RESTeam" class="moduleButton">About the RES Team</div> \
	<div id="Button-SearchRES" class="moduleButton">Search RES Settings</div> \
</div> \
<div id="RESAboutDetails"> \
	<div id="DonateRES" class="aboutPanel"> \
		<h3>Contribute to support RES</h3> \
		<p>RES is entirely free - as in beer, as in open source, as in everything.  If you like our work, a contribution would be greatly appreciated.</p> \
		<p>When you contribute, you make it possible for the team to cover hosting costs and other expenses so that we can focus on doing what we do best: making your Reddit experience even better.</p> \
		<p> \
		<strong style="font-weight: bold;">Dwolla and bitcoin are the preferred methods of contribution</strong>, because they charge much smaller fees than PayPal and Google: <br><br>\
		<a target="_blank" href="https://www.dwolla.com/u/812-686-0217"><img src="https://www.dwolla.com/content/images/btn-donate-with-dwolla.png"></a>\
		</p> \
		<p></p> \
		<p> \
		Or bitcoin: \
		<form action="https://bitpay.com/checkout" method="post" > \
			<input type="hidden" name="action" value="checkout" /> \
			<input type="hidden" name="posData" value="" /> \
			<input type="hidden" name="data" value="ddFrz5v8dCQ/2oQV9a+OLm3nVrlinxOo1WYFsRjZR5IoouplTgMj7zg8OB3i5xSYiPTbyUmBiNjoY9z/iuEwqPvQClXqQdGINb+IVIzjuZobCUDsLUztc2qdQHvU/sLQzf3a339vzs9JAwSj6W/IpNt90WN1Bdab491xtPpeCIwcS84WY0T+QDjN0c5+1k8/rNqr6A6hFX4TWwZrxQiv35Bl/xyo+YLrE9OUM0K+2cu1hsc7/sOMNsqIB1v4W5CMkQFP40sq9CWf14nyvYbZtg==" /> \
			<input type="text" name="price" size="2" value="" /> bitcoins \
			<input type="image" src="https://bitpay.com/img/button8.png" border="0" name="submit" alt="BitPay, the easy way to pay with bitcoins." > \
			</form> \
		</p> \
		<p></p> \
		<p> \
		We also do have PayPal: <br> \
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="S7TAR7QU39H22"><input type="image" src="https://www.paypalobjects.com/en_US/i/logo/PayPal_mark_60x38.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form> \
		</p> \
	</div> \
	<div id="AboutRES" class="aboutPanel"> \
		<h3>About RES</h3> \
		<p>Author: <a target="_blank" href="http://www.honestbleeps.com/">honestbleeps</a><br></p> \
		<p>Description: Reddit Enhancement Suite is a collection of modules that makes browsing reddit a whole lot easier.</p> \
		<p>It\'s built with <a target="_blank" href="http://redditenhancementsuite.com/api">an API</a> that allows you to contribute and include your own modules!</p> \
		<p>If you\'ve got bug reports or issues with RES, please see the <a target="_blank" href="http://www.reddit.com/r/RESIssues/">RESIssues</a> subreddit. If you\'d like to follow progress on RES, or you\'d like to converse with other users, please see the <a target="_blank" href="http://www.reddit.com/r/Enhancement/">Enhancement subreddit</a>. You can also check the <a href="http://www.reddit.com/r/Enhancement/wiki/index" target="_blank">wiki</a> for the FAQ, and more detailed info on each module.</p> \
		<p>If you want to contribute to the RES code base, submit bug reports, or make suggestions, you can also visit RES at <a href="https://github.com/honestbleeps/Reddit-Enhancement-Suite" target="_blank">Github</a>.</p> \
		<p>If you want to contact me directly with suggestions, bug reports or just want to say you appreciate the work, an <a href="mailto:steve@honestbleeps.com">email</a> would be great.</p> \
		<p>License: Reddit Enhancement Suite is released under the <a target="_blank" href="http://www.gnu.org/licenses/gpl-3.0.html">GPL v3.0</a>.</p> \
		<p><strong>Note:</strong> Reddit Enhancement Suite will check, at most once a day, to see if a new version is available.  No data about you is sent to me nor is it stored.</p> \
	</div> \
	<div id="RESTeam" class="aboutPanel"> \
		<h3>About the RES Team</h3> \
		<p>Steve Sobel (<a target="_blank" href="http://www.reddit.com/user/honestbleeps/">honestbleeps</a>) is the primary developer of RES.  Beyond that, there are a number of people who have contributed code, design and/or great ideas to RES.  To read more about the RES team, visit <a target="_blank" href="http://redditenhancementsuite.com/about.html">the RES website.</a></p> \
	</div> \
	<div id="SearchRES" class="aboutPanel"></div> \
</div> \
		';
		$(RESConsoleAboutPanel).html(AboutPanelHTML);
		var searchPanel = modules['settingsNavigation'].renderSearchPanel();
		$('#SearchRES', RESConsoleAboutPanel).append(searchPanel);
		$(RESConsoleAboutPanel).find('.moduleButton').click(function(e) {
			$('.moduleButton').removeClass('active');
			$(this).addClass('active');
			var thisID = $(this).attr('id');
			var thisPanel = thisID.replace('Button-', '');
			var visiblePanel = $(this).parent().parent().find('.aboutPanel:visible');

			var duration = (e.data && e.data.duration) || $(this).hasClass('active') ? 0 : 400;
			$(visiblePanel).fadeOut(duration, function() {
				$('#' + thisPanel).fadeIn();
			});
		});
		this.RESConsoleContent.appendChild(RESConsoleAboutPanel);
	},
	drawProPanel: function() {
		RESConsoleProPanel = this.RESConsoleProPanel;
		var proPanelHeader = document.createElement('div');
		$(proPanelHeader).html('RES Pro allows you to save your preferences to the RES Pro server.<br><br><strong>Please note:</strong> this is beta functionality right now. Please don\'t consider this to be a "backup" solution just yet. To start, you will need to <a target="_blank" href="http://redditenhancementsuite.com/register.php">register for a PRO account</a> first, then email <a href="mailto:steve@honestbleeps.com">steve@honestbleeps.com</a> with your RES Pro username to get access.');
		RESConsoleProPanel.appendChild(proPanelHeader);
		this.proSetupButton = createElementWithID('div', 'RESProSetup');
		this.proSetupButton.setAttribute('class', 'RESButton');
		$(this.proSetupButton).text('Configure RES Pro');
		this.proSetupButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].configure();
		}, false);
		RESConsoleProPanel.appendChild(this.proSetupButton);
		/*
		this.proAuthButton = createElementWithID('div','RESProAuth');
		this.proAuthButton.setAttribute('class','RESButton');
		$(this.proAuthButton).html('Authenticate');
		this.proAuthButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].authenticate();
		}, false);
		RESConsoleProPanel.appendChild(this.proAuthButton);
		*/
		this.proSaveButton = createElementWithID('div', 'RESProSave');
		this.proSaveButton.setAttribute('class', 'RESButton');
		$(this.proSaveButton).text('Save Module Options');
		this.proSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].savePrefs();
			modules['RESPro'].authenticate(modules['RESPro'].savePrefs());
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveButton);

		/*
		this.proUserTaggerSaveButton = createElementWithID('div','RESProSave');
		this.proUserTaggerSaveButton.setAttribute('class','RESButton');
		$(this.proUserTaggerSaveButton).html('Save user tags to Server');
		this.proUserTaggerSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].saveModuleData('userTagger');
		}, false);
		RESConsoleProPanel.appendChild(this.proUserTaggerSaveButton);
		*/

		this.proSaveCommentsSaveButton = createElementWithID('div', 'RESProSaveCommentsSave');
		this.proSaveCommentsSaveButton.setAttribute('class', 'RESButton');
		$(this.proSaveCommentsSaveButton).text('Save saved comments to Server');
		this.proSaveCommentsSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].saveModuleData('saveComments');
			modules['RESPro'].authenticate(modules['RESPro'].saveModuleData('saveComments'));
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveCommentsSaveButton);

		this.proSubredditManagerSaveButton = createElementWithID('div', 'RESProSubredditManagerSave');
		this.proSubredditManagerSaveButton.setAttribute('class', 'RESButton');
		$(this.proSubredditManagerSaveButton).text('Save subreddits to server');
		this.proSubredditManagerSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].saveModuleData('SubredditManager');
			modules['RESPro'].authenticate(modules['RESPro'].saveModuleData('subredditManager'));
		}, false);
		RESConsoleProPanel.appendChild(this.proSubredditManagerSaveButton);

		this.proSaveCommentsGetButton = createElementWithID('div', 'RESProGetSavedComments');
		this.proSaveCommentsGetButton.setAttribute('class', 'RESButton');
		$(this.proSaveCommentsGetButton).text('Get saved comments from Server');
		this.proSaveCommentsGetButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].getModuleData('saveComments');
			modules['RESPro'].authenticate(modules['RESPro'].getModuleData('saveComments'));
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveCommentsGetButton);

		this.proSubredditManagerGetButton = createElementWithID('div', 'RESProGetSubredditManager');
		this.proSubredditManagerGetButton.setAttribute('class', 'RESButton');
		$(this.proSubredditManagerGetButton).text('Get subreddits from Server');
		this.proSubredditManagerGetButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].getModuleData('SubredditManager');
			modules['RESPro'].authenticate(modules['RESPro'].getModuleData('subredditManager'));
		}, false);
		RESConsoleProPanel.appendChild(this.proSubredditManagerGetButton);

		this.proGetButton = createElementWithID('div', 'RESProGet');
		this.proGetButton.setAttribute('class', 'RESButton');
		$(this.proGetButton).text('Get options from Server');
		this.proGetButton.addEventListener('click', function(e) {
			e.preventDefault();
			// modules['RESPro'].getPrefs();
			modules['RESPro'].authenticate(modules['RESPro'].getPrefs());
		}, false);
		RESConsoleProPanel.appendChild(this.proGetButton);
		this.RESConsoleContent.appendChild(RESConsoleProPanel);
	},
	open: function(moduleIdOrCategory) {
		var category, moduleID;
		if (moduleIdOrCategory === 'search') {
			moduleID = moduleIdOrCategory;
			category = 'About RES';
		} else {
			var module = modules[moduleIdOrCategory];
			moduleID = module && module.moduleID;
			category = module && module.category;
		}
		category = category || moduleIdOrCategory || this.categories[0];
		moduleID = moduleID || this.getModuleIDsByCategory(category)[0];


		// Draw the config panel
		this.drawConfigPanel();
		// Draw the about panel
		this.drawAboutPanel();
		// Draw the RES Pro panel
		// this.drawProPanel();
		this.openCategoryPanel(category);
		this.showConfigOptions(moduleID);

		this.isOpen = true;
		// hide the ad-frame div in case it's flash, because then it covers up the settings console and makes it impossible to see the save button!
		var adFrame = document.getElementById('ad-frame');
		if ((typeof adFrame !== 'undefined') && (adFrame !== null)) {
			adFrame.style.display = 'none';
		}
		modules['styleTweaks'].setSRStyleToggleVisibility(false, 'RESConsole');
		// var leftCentered = Math.floor((window.innerWidth - 720) / 2);
		// modalOverlay.setAttribute('style','display: block; height: ' + document.documentElement.scrollHeight + 'px');
		this.modalOverlay.classList.remove('fadeOut');
		this.modalOverlay.classList.add('fadeIn');

		// this.RESConsoleContainer.setAttribute('style','display: block; left: ' + leftCentered + 'px');
		// this.RESConsoleContainer.setAttribute('style','display: block; left: 1.5%;');
		this.RESConsoleContainer.classList.remove('slideOut');
		this.RESConsoleContainer.classList.add('slideIn');

		RESStorage.setItem('RESConsole.hasOpenedConsole', true);

		$('body').on('keyup', RESConsole.handleEscapeKey);
	},
	handleEscapeKey: function(event) {
		// don't close if the user is in a token input field (e.g. adding subreddits to a list)
		// because they probably just want to cancel the dropdown list
		if (event.which === 27 && (document.activeElement.id.indexOf('token-input') === -1)) {
			RESConsole.close();
			$('body').off('keyup', RESConsole.handleEscapeKey);
		}
	},
	close: function() {
		$('#moduleOptionsSave').fadeOut();
		this.isOpen = false;
		// Let's be nice to reddit and put their ad frame back now...
		var adFrame = document.getElementById('ad-frame');
		if ((typeof adFrame !== 'undefined') && (adFrame !== null)) {
			adFrame.style.display = 'block';
		}

		modules['styleTweaks'].setSRStyleToggleVisibility(true, 'RESConsole');

		// this.RESConsoleContainer.setAttribute('style','display: none;');
		this.modalOverlay.classList.remove('fadeIn');
		this.modalOverlay.classList.add('fadeOut');
		this.RESConsoleContainer.classList.remove('slideIn');
		this.RESConsoleContainer.classList.add('slideOut');
		// just in case the user was in the middle of setting a key and decided to close the dialog, clean that up.
		if (typeof RESConsole.keyCodeModal !== 'undefined') {
			RESConsole.keyCodeModal.style.display = 'none';
			RESConsole.captureKey = false;
		}

		modules['settingsNavigation'].resetUrlHash();
	},
	menuClick: function(obj) {
		if (!obj) return;

		var objID = obj.getAttribute('id');
		var category = objID.split('-');
		category = category[category.length - 1];
		var moduleID = this.getModuleIDsByCategory(category)[0];
		this.openCategoryPanel(category);
		this.showConfigOptions(moduleID);
	},
	openCategoryPanel: function(category) {
		// make all menu items look unselected
		$(RESConsole.RESMenuItems).removeClass('active');

		// make selected menu item look selected
		$(RESConsole.RESMenuItems).filter(function() {
			var thisCategory = (this.getAttribute('id') || '').split('-');
			thisCategory = thisCategory[thisCategory.length - 1];

			if (thisCategory == category) return true;
		}).addClass('active');

		// hide all console panels
		$(RESConsole.RESConsoleContent).find('.RESPanel').hide();

		switch (category) {
			case 'Menu-About RES': // cruft
			case 'About RES':
				// show the about panel
				$(this.RESConsoleAboutPanel).show();
				break;
			case 'Menu-RES Pro': // cruft
			case 'RES Pro':
				// show the pro panel
				$(this.RESConsoleProPanel).show();
				break;
			default:
				// show the config panel for the given category
				$(this.RESConsoleConfigPanel).show();
				this.drawConfigPanelCategory(category);
				break;
		}
	}
};


/************************************************************************************************************

Creating your own module:

Modules must have the following format, with required functions:
- moduleID - the name of the module, i.e. myModule
- moduleName - a "nice name" for your module...
- description - for the config panel, explains what the module is
- isEnabled - should always return RESConsole.getModulePrefs('moduleID') - where moduleID is your module name.
- isMatchURL - should always return RESUtils.isMatchURL('moduleID') - checks your include and exclude URL matches.
- include - an array of regexes to match against location.href (basically like include in GM)
- exclude (optional) - an array of regexes to exclude against location.href
- go - always checks both if isEnabled() and if RESUtils.isMatchURL(), and if so, runs your main code.

modules['myModule'] = {
	moduleID: 'myModule',
	moduleName: 'my module',
	category: 'CategoryName',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		defaultMessage: {
			type: 'text',
			value: 'this is default text',
			description: 'explanation of what this option is for'
		},
		doSpecialStuff: {
			type: 'boolean',
			value: false,
			description: 'explanation of what this option is for'
		}
	},
	description: 'This is my module!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: [
		/^https?:\/\/([a-z]+)\.reddit\.com\/user\/[-\w\.]+/i,
		/^https?:\/\/([a-z]+)\.reddit\.com\/message\/comments\/[-\w\.]+/i
	],
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// do stuff now!
			// this is where your code goes...
		}
	}
}; // note: you NEED this semicolon at the end!

************************************************************************************************************/


/*
 * Konami-JS ~
 * :: Now with support for touch events and multiple instances for
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.3.2 (7/02/2010)
 * Licensed under the GNU General Public License v3
 * http://www.gnu.org/copyleft/gpl.html
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+ and Mobile Safari 2.2.1
 */
var Konami = function() {
	var konami = {
		addEvent: function(obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function() {
					obj["e" + type + fn](window.event, ref_obj);
				}

				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		prepattern: "38384040373937396665",
		almostThere: false,
		pattern: "3838404037393739666513",
		load: function(link) {
			this.addEvent(document, "keydown", function(e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length) konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = "";
					return;
				} else if ((konami.input == konami.prepattern) || (konami.input.substr(2, konami.input.length) == konami.prepattern)) {
					konami.almostThere = true;
					setTimeout(function() {
						konami.almostThere = false;
					}, 2000);
				}
			}, this);
			this.iphone.load(link);
		},
		code: function(link) {
			window.location = link;
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP", "TAP"],
			code: function(link) {
				konami.code(link);
			},
			load: function(link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", function(e) {
					if (e.touches.length === 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.tap = false;
						konami.iphone.capture = false;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, "touchend", function(evt) {
					if (konami.iphone.tap == true) konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, "touchstart", function(evt) {
					konami.iphone.start_x = evt.changedTouches[0].pageX;
					konami.iphone.start_y = evt.changedTouches[0].pageY;
					konami.iphone.tap = true;
					konami.iphone.capture = true;
				});
			},
			check_direction: function(link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? "TAP" : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length === 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}
	return konami;
};

var _beforeLoadComplete = false;

function RESdoBeforeLoad() {
	if (_beforeLoadComplete) return;
	_beforeLoadComplete = true;
	// if (beforeLoadDoneOnce) return;
	// first, go through each module and set all of the options so that if a module needs to check another module's options, they're ready...
	// console.log('get options start: ' + Date());
	for (var thisModuleID in modules) {
		if (typeof modules[thisModuleID] === 'object') {

			// Allow the module to instaniate any dynamic options
			if (typeof modules[thisModuleID].loadDynamicOptions === 'function') {
				modules[thisModuleID].loadDynamicOptions();
			}

			RESUtils.getOptions(thisModuleID);
		}
	}
	// console.log('get options end: ' + Date());
	for (var thisModuleID in modules) {
		if (typeof modules[thisModuleID] === 'object') {
			if (typeof modules[thisModuleID].beforeLoad === 'function') modules[thisModuleID].beforeLoad();
		}
	}
	// apply style...
	GM_addStyle(RESUtils.css);
	// clear out css cache...
	RESUtils.css = '';
}

function RESInit() {
	// $.browser shim since jQuery removed it
	$.browser = {
		safari: BrowserDetect.isSafari(),
		mozilla: BrowserDetect.isFirefox(),
		chrome: BrowserDetect.isChrome(),
		opera: BrowserDetect.isOpera()
	};
	$.fn.safeHtml = function(string) {
		if (!string) return '';
		else return $(this).html(RESUtils.sanitizeHTML(string));
	}

	RESUtils.initObservers();
	localStorageFail = false;
	/*
	var backup = {};
	$.extend(backup, RESStorage);
	delete backup.getItem;
	delete backup.setItem;
	delete backup.removeItem;
	console.log(backup);
	*/

	// Check for localStorage functionality...
	try {
		localStorage.setItem('RES.localStorageTest', 'test');
		// if this is a firefox addon, check for the old lsTest to see if they used to use the Greasemonkey script...
		// if so, present them with a notification explaining that they should download a new script so they can
		// copy their old settings...
		if (BrowserDetect.isFirefox()) {
			if ((localStorage.getItem('RES.lsTest') === 'test') && (localStorage.getItem('copyComplete') !== 'true')) {
				modules['notifications'].showNotification('<h2>Important Alert for Greasemonkey Users!</h2>Hey! It looks like you have upgraded to RES 4.0, but used to use the Greasemonkey version of RES. You\'re going to see double until you uninstall the Greasemonkey script. However, you should first copy your settings by clicking the blue button. <b>After installing, refresh this page!</b> <a target="_blank" class="RESNotificationButtonBlue" href="http://redditenhancementsuite.com/gmutil/reddit_enhancement_suite.user.js">GM->FF Import Tool</a>', 15000);
				localStorage.removeItem('RES.lsTest');

				// this is the only "old school" DOMNodeInserted event left... note to readers of this source code:
				// it will ONLY ever be added to the DOM in the specific instance of former OLD RES users from Greasemonkey
				// who haven't yet had the chance to copy their settings to the XPI version of RES.  Once they've completed
				// that, this eventlistener will never be added again, nor will it be added for those who are not in this
				// odd/small subset of people.
				document.body.addEventListener('DOMNodeInserted', function(event) {
					if ((event.target.tagName === 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('copyToSimpleStorage') !== -1)) {
						GMSVtoFFSS();
					}
				}, true);
			}
		}
	} catch (e) {
		localStorageFail = true;
	}

	document.body.classList.add('res', 'res-v430');

	if (localStorageFail) {
		RESFail = "Sorry, but localStorage seems inaccessible. Reddit Enhancement Suite can't work without it. \n\n";
		if (BrowserDetect.isSafari()) {
			RESFail += 'Since you\'re using Safari, it might be that you\'re in private browsing mode, which unfortunately is incompatible with RES until Safari provides a way to allow extensions localStorage access.';
		} else if (BrowserDetect.isChrome()) {
			RESFail += 'Since you\'re using Chrome, you might just need to go to your extensions settings and check the "Allow in Incognito" box.';
		} else if (BrowserDetect.isOpera()) {
			RESFail += 'Since you\'re using Opera, you might just need to go to your extensions settings and click the gear icon, then click "privacy" and check the box that says "allow interaction with private tabs".';
		} else {
			RESFail += 'Since it looks like you\'re using Firefox, you probably need to go to about:config and ensure that dom.storage.enabled is set to true, and that dom.storage.default_quota is set to a number above zero (i.e. 5120, the normal default)".';
		}
		var userMenu = document.querySelector('#header-bottom-right');
		if (userMenu) {
			var preferencesUL = userMenu.querySelector('UL');
			var separator = document.createElement('span');
			separator.setAttribute('class', 'separator');
			separator.textContent = '|';
			RESPrefsLink = document.createElement('a');
			RESPrefsLink.setAttribute('href', 'javascript:void(0)');
			RESPrefsLink.addEventListener('click', function(e) {
				e.preventDefault();
				alert(RESFail);
			}, true);
			RESPrefsLink.textContent = '[RES - ERROR]';
			RESPrefsLink.setAttribute('style', 'color: red; font-weight: bold;');
			insertAfter(preferencesUL, RESPrefsLink);
			insertAfter(preferencesUL, separator);
		}
	} else {
		document.body.addEventListener('mousemove', RESUtils.setMouseXY, false);
		// added this if statement because some people's Greasemonkey "include" lines are getting borked or ignored, so they're calling RES on non-reddit pages.
		if (/^https?:\/\/(?:[\w]+\.)?reddit\.com/i.test(location.href)) {
			RESUtils.firstRun();
			RESUtils.checkForUpdate();
			// add the config console link...
			RESConsole.create();
			RESConsole.addConsoleLink();
			RESConsole.addConsoleDropdown();
			RESUtils.checkIfSubmitting();
			// go through each module and run it
			for (var thisModuleID in modules) {
				if (typeof modules[thisModuleID] === 'object') {
					// console.log(thisModuleID + ' start: ' + Date());
					// perfTest(thisModuleID+' start');
					modules[thisModuleID].go();
					// perfTest(thisModuleID+' end');
					// console.log(thisModuleID + ' end: ' + Date());
				}
			}
			GM_addStyle(RESUtils.css);
			//	console.log('end: ' + Date());
		}
		if ((location.href.indexOf('reddit.honestbleeps.com/download') !== -1)
				|| (location.href.indexOf('redditenhancementsuite.com/download') !== -1)) {
			var installLinks = document.body.querySelectorAll('.install');
			for (var i = 0, len = installLinks.length; i < len; i++) {
				installLinks[i].classList.add('update');
				installLinks[i].classList.add('res4'); // if update but not RES 4, then FF users == greasemonkey...
				installLinks[i].classList.remove('install');
			}
		}
		konami = new Konami();
		konami.code = function() {
			var baconBit = createElementWithID('div', 'baconBit');
			document.body.appendChild(baconBit);
			modules['notifications'].showNotification({
				header: 'RES Easter Eggies!',
				message: 'Mmm, bacon!'
			});
			setTimeout(function() {
				baconBit.classList.add('makeitrain');
			}, 500);
		}
		konami.load();

	}

	RESUtils.postLoad = true;
}

RESStorage = {};

function setUpRESStorage(response) {
	if (BrowserDetect.isChrome()) {
		RESStorage = response;
		// we'll set up a method for getItem, but it's not adviseable to use since it's asynchronous...
		RESStorage.getItem = function(key) {
			if (typeof RESStorage[key] !== 'undefined') return RESStorage[key];
			return null;
		}
		// if the fromBG parameter is true, we've been informed by another tab that this item has updated. We should update the data locally, but not send a background request.
		RESStorage.setItem = function(key, value, fromBG) {
			//Protect from excessive disk I/O...
			if (RESStorage[key] != value) {
				// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
				// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
				RESStorage[key] = value;
				var thisJSON = {
					requestType: 'localStorage',
					operation: 'setItem',
					itemName: key,
					itemValue: value
				};
				if (!fromBG) {
					chrome.runtime.sendMessage(thisJSON);
				}
			}
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON = {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			};
			chrome.runtime.sendMessage(thisJSON);
		}
		window.localStorage = RESStorage;
		//RESInit();
	} else if (BrowserDetect.isSafari()) {
		RESStorage = response;
		RESStorage.getItem = function(key) {
			if (typeof RESStorage[key] !== 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value, fromBG) {
			//Protect from excessive disk I/O...
			if (RESStorage[key] != value) {
				// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
				// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
				RESStorage[key] = value;
				var thisJSON = {
					requestType: 'localStorage',
					operation: 'setItem',
					itemName: key,
					itemValue: value
				};
				if (!fromBG) {
					safari.self.tab.dispatchMessage("localStorage", thisJSON);
				}
			}
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON = {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			};
			safari.self.tab.dispatchMessage("localStorage", thisJSON);
		}
		window.localStorage = RESStorage;
	} else if (BrowserDetect.isOpera()) {
		RESStorage = response;
		RESStorage.getItem = function(key) {
			if (typeof RESStorage[key] !== 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value, fromBG) {
			//Protect from excessive disk I/O...
			if (RESStorage[key] != value) {
				// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
				// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
				RESStorage[key] = value;
				var thisJSON = {
					requestType: 'localStorage',
					operation: 'setItem',
					itemName: key,
					itemValue: value
				};
				if (!fromBG) {
					opera.extension.postMessage(JSON.stringify(thisJSON));
				}
			}
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON = {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			};
			opera.extension.postMessage(JSON.stringify(thisJSON));
		}
		window.localStorage = RESStorage;
	} else if (BrowserDetect.isFirefox()) {
		RESStorage = response;
		RESStorage.getItem = function(key) {
			if (typeof RESStorage[key] !== 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value, fromBG) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			if (RESStorage[key] != value) {
				RESStorage[key] = value;
				var thisJSON = {
					requestType: 'localStorage',
					operation: 'setItem',
					itemName: key,
					itemValue: value
				};
				if (!fromBG) {
					self.postMessage(thisJSON);
				}
			}
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON = {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			};
			self.postMessage(thisJSON);
		}
		window.localStorage = RESStorage;
	} else {
		// must be firefox w/greasemonkey...
		//
		RESStorage.getItem = function(key) {
			if (typeof RESStorage[key] !== 'undefined') return RESStorage[key];
			RESStorage[key] = GM_getValue(key);
			if (typeof RESStorage[key] === 'undefined') return null;
			return GM_getValue(key);
		}
		RESStorage.setItem = function(key, value) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			// Wow, GM_setValue doesn't support big integers, so we have to store anything > 2147483647 as a string, so dumb.
			if (typeof value !== 'undefined') {
				// if ((typeof value === 'number') && (value > 2147483647)) {
				if (typeof value === 'number') {
					value = value.toString();
				}
				//Protect from excessive disk I/O...
				if (RESStorage[key] != value) {
					RESStorage[key] = value;
					// because we may want to use jQuery events to call GM_setValue and GM_getValue, we must use this ugly setTimeout hack.
					setTimeout(function() {
						GM_setValue(key, value);
					}, 0);
				}
			}
			return true;
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			GM_deleteValue(key);
			return true;
		}
	}
	RESdoBeforeLoad();
}

(function(u) {
	// Don't fire the script on the iframe. This annoyingly fires this whole thing twice. Yuck.
	// Also don't fire it on static.reddit or thumbs.reddit, as those are just images.
	// Also omit blog and code.reddit
	if ((typeof RESRunOnce !== 'undefined')
			|| (/\/toolbar\/toolbar\?id/i.test(location.href))
			|| (/comscore-iframe/i.test(location.href))
			|| (/(?:static|thumbs|blog|code)\.reddit\.com/i.test(location.hostname))
			|| (/[www\.]?(?:i|m)\.reddit\.com/i.test(location.href))
			|| (/\.(?:compact|mobile)$/i.test(location.pathname))
			|| (/metareddit\.com/i.test(location.href))) {
		// do nothing.
		return false;
	}

	// call preInit function - work in this function should be kept minimal.  It's for
	// doing stuff as early as possible prior to pageload, and even prior to the localStorage copy
	// from the background.
	// Specifically, this is used to add a class to the document for .res-nightmode, etc, as early
	// as possible to avoid the flash of unstyled content.
	RESUtils.preInit();

	RESRunOnce = true;
	var thisJSON;
	if (BrowserDetect.isChrome()) {
		// we've got chrome, get a copy of the background page's localStorage first, so don't init until after.
		thisJSON = {
			requestType: 'getLocalStorage'
		};
		chrome.runtime.sendMessage(thisJSON, function(response) {
			// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
			// old school localStorage from the foreground page to the background page to keep their settings...
			if (typeof response.importedFromForeground === 'undefined') {
				// it doesn't exist.. copy it over...
				var ls = {};
				for (var i = 0, len = localStorage.length; i < len; i++) {
					if (localStorage.key(i)) {
						ls[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
					}
				}
				var thisJSON = {
					requestType: 'saveLocalStorage',
					data: ls
				};
				chrome.runtime.sendMessage(thisJSON, function(response) {
					setUpRESStorage(response);
				});
			} else {
				setUpRESStorage(response);
			}
		});
	} else if (BrowserDetect.isSafari()) {
		var setupInterval;

		// we've got safari, get localStorage from background process
		thisJSON = {
			requestType: 'getLocalStorage'
		};
		var setupCallback = function() {
			if (!document.head) return;
			clearInterval(setupInterval);
			safari.self.tab.dispatchMessage("getLocalStorage", thisJSON);
			// since safari's built in extension stylesheets are treated as user stylesheets,
			// we can't inject them that way.  That makes them "user stylesheets" which would make
			// them require !important everywhere - we don't want that, so we'll inject this way instead.
			var loadCSS = function(filename) {
				var linkTag = document.createElement('link');
				linkTag.setAttribute('rel', 'stylesheet');
				linkTag.href = safari.extension.baseURI + filename;
				document.head.appendChild(linkTag);
			}

			// include CSS files, then load scripts.
			var cssFiles = ['res.css', 'commentBoxes.css', 'nightmode.css'];
			for (var i in cssFiles) {
				loadCSS(cssFiles[i]);
			}
		};
		setupInterval = setInterval(setupCallback, 200);
		setupCallback();
	} else if (BrowserDetect.isFirefox()) {
		// we've got firefox jetpack, get localStorage from background process
		thisJSON = {
			requestType: 'getLocalStorage'
		};
		self.postMessage(thisJSON);
	} else if (BrowserDetect.isOpera()) {
		// I freaking hate having to use different code that won't run in other browsers to log debugs, so I'm overriding console.log with opera.postError here
		// so I don't have to litter my code with different statements for different browsers when debugging.
		console.log = opera.postError;
		opera.extension.addEventListener("message", operaMessageHandler, false);
		window.addEventListener("DOMContentLoaded", function(u) {
			// we've got opera, let's check for old localStorage...
			// RESInit() will be called from operaMessageHandler()
			thisJSON = {
				requestType: 'getLocalStorage'
			};
			opera.extension.postMessage(JSON.stringify(thisJSON));
		}, false);
	} else {
		// Check if GM_getValue('importedFromForeground') has been set.. if not, this is an old user using localStorage;
		var ls = (typeof unsafeWindow !== 'undefined') ? unsafeWindow.localStorage : localStorage;
		if (GM_getValue('importedFromForeground') !== 'true') {
			// It doesn't exist, so we need to copy localStorage over to GM_setValue storage...
			for (var i = 0, len = ls.length; i < len; i++) {
				var value = ls.getItem(ls.key(i));
				if (typeof value !== 'undefined') {
					if ((typeof value === 'number') && (value > 2147483647)) {
						value = value.toString();
					}
					if (ls.key(i)) {
						GM_setValue(ls.key(i), value);
					}
				}
			}
			GM_setValue('importedFromForeground', 'true');
		}
		setUpRESStorage();
		//RESInit();
		// console.log(GM_listValues());
	}
})();

function RESInitReadyCheck() {
	if ((typeof RESStorage.getItem !== 'function') || (typeof document.body === 'undefined') || (document.body === null)) {
		setTimeout(RESInitReadyCheck, 50);
	} else {
		if (BrowserDetect.isFirefox()) {
			// firefox addon sdk... we've included jQuery... 
			// also, for efficiency, we're going to try using unsafeWindow for "less secure" (but we're not going 2 ways here, so that's OK) but faster DOM node access...
			document = unsafeWindow.document;
			window = unsafeWindow;
			if (typeof $ !== 'function') {
				console.log('Uh oh, something has gone wrong loading jQuery...');
			}
		} else if ((typeof unsafeWindow !== 'undefined') && (unsafeWindow.jQuery)) {
			// greasemonkey -- should load jquery automatically because of @require line
			// in this file's header
			if (typeof $ === 'undefined') {
				// greasemonkey-like userscript
				$ = unsafeWindow.jQuery;
				jQuery = $;
			}
		} else if (typeof window.jQuery === 'function') {
			// opera...
			$ = window.jQuery;
			jQuery = $;
		} else {
			// chrome and safari...
			if (typeof $ !== 'function') {
				console.log('Uh oh, something has gone wrong loading jQuery...');
			}
		}
		if (BrowserDetect.isOpera()) {
			// require.js-like modular injected scripts, code via:
			// http://my.opera.com/BS-Harou/blog/2012/08/08/modular-injcted-scripts-in-extensions
			// Note: This code requires Opera 12.50 to run!
			if (typeof opera.extension.getFile === 'function') {
				var loadCSS = function(filename) {
					var fileObj = opera.extension.getFile(filename);
					if (fileObj) {
						// Read out the File object as a Data URI:
						var fr = new FileReader();
						fr.onload = function() {
							// Load the library
							var styleTag = document.createElement("style");
							styleTag.textContent = fr.result;
							document.body.appendChild(styleTag);
						};
						fr.readAsText(fileObj);
					}
				}

				// include CSS files, then load scripts.
				var cssFiles = ['res.css', 'commentBoxes.css', 'nightmode.css'];
				for (var i in cssFiles) {
					loadCSS(cssFiles[i]);
				}

				(function() {
					var oex = opera.extension;

					var types = {
						'text': 'readAsText',
						'json': 'readAsText',
						'dataurl': 'readAsDataURL',
						'arraybuffer': 'readAsArrayBuffer'
					};

					if ('getFile' in oex && !('getFileData' in oex)) {
						oex.getFileData = function(path, type, cb) {
							if (typeof type === 'function') {
								cb = type;
								type = 'text';
							} else {
								type = type && type.toLowerCase();
								type = type in types ? type : 'text';
							}

							if (typeof cb !== 'function') return;

							var file = opera.extension.getFile(path);

							if (file) {
								var reader = new FileReader();

								reader.onload = function(e) {
									if (type === 'json') {
										try {
											cb(JSON.parse(reader.result), file);
										} catch (e) {
											cb(null);
										}
									} else {
										cb(reader.result, file);
									}
								}

								reader.onerror = function(e) {
									cb(null);
								}

								reader[types[type]](file);

							} else {
								setTimeout(cb, 0, null, file);
							}
						}
					}
				}());

				/**
				 * TODO: nothing
				 * better structure, less binding and fn arguments
				 * vylepsit cachovani (eg. dve stejne dependencies)
				 */

				var global = this;

				var require = (function() {
					function define(result, cb) {
						if (typeof result === 'function' || typeof cb !== 'function') {
							define.compiled = typeof result === 'undefined' ? null : result;
						} else {
							define._wait = true;

							// possible optimization - avoid calling require for falsy "result"
							// but watch out for timeout bug

							// result => path
							require(result, function(store) {
								var data = [].slice.call(arguments, 1); // get rid off "store" from arguments
								var item = store.pop();
								item.cb(cb.apply(global, data));
							}.bind(global, define._store));
						}
					}
					define.compiled = null;
					define._store = null;
					define._wait = false;

					return function() {
						function _compile() {
							define.compiled = null;
							define._store = arguments[1]._store; // arguments[1] = buffer
							with({}) eval(arguments[0]);
							if (define._wait) {
								define._wait = false;
								arguments[1]._store.push({
									//define._store.push({
									cb: arguments[3],
									path: arguments[4]
								});
								return false;
							} else {
								processData(define.compiled, arguments[1], arguments[2]);
								return true;
							}
						}

						function processData(data, buffer, i) {
							if (buffer.temp[i]) {
								delete buffer.temp[i];
							}

							buffer.add(data, i);

							var path = buffer.path;

							if (!(path[i] in require._cache) || (data && require._cache[path[i]] === null)) {
								require._cache[path[i]] = data;
							}

							var next = buffer.temp[i + 1];
							if (next) {
								if (!next.parsedPath[1]) {
									var isImmidiate = _compile(next.data, buffer, i + 1, next.cb, next.parsedPath[0]);
									if (!isImmidiate) {
										require._cache[next.path] = null;
									}
								} else {
									processData(next.data, buffer, i + 1);
								}
							}
						}

						function wait(buffer, cb) {
							// timeout is important for right order of callbacks reading from buffer
							setTimeout(function() {
								cb.apply(global, buffer);
							}, 0);
						}

						function compileCB(cb, buffer, i, data) {
							processData(data, buffer, i);

							if (buffer.length === buffer.path.length && cb) {
								wait(buffer, cb);
							}
						}

						function parsePath(path) {
							var parsedPath = path.split('!');

							// add '.js' as file extension
							if (!parsedPath[1] && path.indexOf(/\.js$/i) === -1) {
								parsedPath[0] = (path += '.js');
							}

							return parsedPath;
						}

						return function(path, cb) {
							// buffer will be served as an array of arguments to callback function
							var buffer = [];
							// special temp array to keep right order of execution and items in buffer
							buffer.temp = [];

							// this does not have anything to do with buffer .. it needs some renaming
							buffer._store = [];

							buffer.add = function(val, i) {
								if (this.length === i) {
									this.push(val);
									return true;
								}
								this.temp[i] = {
									data: val,
									cb: compileCB.bind(global, cb, buffer, i),
									parsedPath: parsePath(path[i]),
									path: path[i]
								};
								return false;
							}

							// if no files are given, return null
							if (!path.length) {
								wait(buffer, cb);
								return null;
							}

							// convert string path to array of one item
							if (!Array.isArray(path)) {
								path = [path];
							}

							buffer.path = path;

							// load all given files
							for (var i = 0, j = path.length; i < j; i++) {
								// Check for !domReady dependency
								if (path[i] === '!domReady') {
									// check if document is already loaded
									if (document.readyState === 'complete' || document.readyState === 'interactive') {
										processData(document, buffer, i);
									}
									// otherwise wait for it to get loaded
									else {
										document.addEventListener('DOMContentLoaded', function(i) {
											processData(document, buffer, i);

											// duplicitni s compileCB
											if (buffer.length === path.length && cb) {
												wait(buffer, cb);
											}
										}.bind(global, i)); // we have to bind "i" 
									}
									continue;
								}

								// split path to two parts, before and after '!'
								var parsedPath = parsePath(path[i]);

								// check for falsy name
								if (!parsedPath[0]) {
									processData(null, buffer, i);
									continue;
								}

								// check if the resource isn't already in cache
								if (path[i] in require._cache) {
									processData(require._cache[path[i]], buffer, i);
									continue;
								}

								// load the file
								opera.extension.getFileData((require._base || '') + parsedPath[0], parsedPath[1] || 'text', function(i, parsedPath, data) {
									// check if the file was succesfully loaded
									if (data) {
										// if the file is javascript for execution
										if (!parsedPath[1]) {
											if (buffer.length === i) {
												// isImmidiate = no dependencies
												var isImmidiate = _compile(data, buffer, i, compileCB.bind(global, cb, buffer, i), parsedPath[0]);

												// if it has dependencies, set it the path temporary to null to prevent circural dependencies
												if (!isImmidiate) {
													require._cache[path[i]] = null;
													return;
												}
											} else {
												// this shouldn't happen .. contact me if it does
												if (buffer.length > i) {
													debugger;
													alert('oh shit, this should not happen!');
												}

												// we have to wait before this script can be executed
												// data will be added to buffer.temp for the right time
												processData(data, buffer, i)

												// end the function to prevent caching (nothing to be cached)
												return;
											}
										}
										// the file is not supposed to be executed
										else {
											processData(data, buffer, i);
										}
									}
									// otherwise add 'null' to buffer instead
									else {
										processData(null, buffer, i);
									}

									// if buffer contains all loaded files, call callback function
									if (buffer.length === path.length && cb) {
										wait(buffer, cb);
									}
								}.bind(global, i, parsedPath));
							}

							// if all files are in cache use return
							if (buffer.length === path.length) {
								if (cb) {
									wait(buffer, cb);
								}
								return buffer.length === 1 ? buffer[0] : buffer;
							}
						}
					}();
				}());

				// IMPORTANT! Creates cache and sets base folder
				require._cache = {};
				require._base = '/modules/';

				// save Reddit's jQuery, because this script is going to jack it up.
				// now, take the new jQuery in and store it local to RES's scope (it's a var up top)
				var redditJq = window.$;
				require(['jquery-1.10.2.min', 'guiders-1.2.8', 'tinycon', 'snuownd', 'jquery.dragsort-0.6', 'jquery.tokeninput', 'jquery-fieldselection.min'], function() {
					$ = window.$;
					jQuery = window.jQuery;
					guiders = window.guiders;
					Tinycon = window.Tinycon;
					SnuOwnd = window.SnuOwnd;
					// now, return the window.$ / window.jQuery back to its original state.
					window.$ = redditJq;
					window.jQuery = redditJq;
					RESInit();
				});
			} else {
				RESInit();
			}
		} else {
			$(document).ready(RESInit);
		}
	}
}

window.addEventListener('load', RESInitReadyCheck, false);

var lastPerf = 0;

function perfTest(name) {
	var now = Date.now();
	var diff = now - lastPerf;
	console.log(name + ' executed. Diff since last: ' + diff + 'ms');
	lastPerf = now;
}

/* mediacrush.js, modified for use in RES */
window.MediaCrush = (function() {
	var self = this;
	self.version = 1;
	self.domain = 'https://mediacru.sh';
	self.maxMediaWidth = 700;
	self.maxMediaHeight = -1;
	self.preserveAspectRatio = true;
	self.logo = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHdpZHRoPSI0MjQuMDk5IgogICBoZWlnaHQ9IjQyMS40NjkwOSIKICAgdmlld0JveD0iMCAwIDQyNC4wOTkgNDIxLjQ2OTA5IgogICBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjMuMSByOTg4NiIKICAgc29kaXBvZGk6ZG9jbmFtZT0ibWVkaWFjcnVzaF9sb2dvLnN2ZyIKICAgaW5rc2NhcGU6ZXhwb3J0LWZpbGVuYW1lPSIvaG9tZS9zaXJjbXB3bi9zb3VyY2VzL01lZGlhQ3J1c2gvc3RhdGljL2xvZ28tYmcucG5nIgogICBpbmtzY2FwZTpleHBvcnQteGRwaT0iMTMuNTgiCiAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSIxMy41OCI+PG1ldGFkYXRhCiAgIGlkPSJtZXRhZGF0YTExIj48cmRmOlJERj48Y2M6V29yawogICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgIGlkPSJkZWZzOSIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzNjYiCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjcxOCIKICAgaWQ9Im5hbWVkdmlldzciCiAgIHNob3dncmlkPSJmYWxzZSIKICAgaW5rc2NhcGU6em9vbT0iMC45MjE4NzUiCiAgIGlua3NjYXBlOmN4PSIzNDguNzgwMzIiCiAgIGlua3NjYXBlOmN5PSIyMTkuNTk4OTUiCiAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iTGF5ZXJfMSIKICAgZml0LW1hcmdpbi10b3A9IjE1IgogICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgIGZpdC1tYXJnaW4tcmlnaHQ9IjAiCiAgIGZpdC1tYXJnaW4tYm90dG9tPSIxNSIgLz4KPHBhdGgKICAgZD0ibSA1Ny4wNjEsNDA2LjEzMDggYyAwLDAgLTU3LjA2MSwtNzcuMzcxIC01Ny4wNjEsLTE5Ni4wMzUgMCwtMTE4LjY2NyA1Ny4wNjYsLTE5NC45ODkgNTcuMDY2LC0xOTQuOTg5IDAsMCA5NC4zMiwtNC44MzYgMjAyLjMwMiw1MC41NzYgMTA3Ljk4Niw1NS40MTIgMTY0LjczMSwxNDMuODkgMTY0LjczMSwxNDMuODkgMCwwIC02My43OTIsOTYuMjIgLTE3MC4zODYsMTUwLjA2NiAtMTA2LjU5NCw1My44NDQgLTE5Ni42NTIsNDYuNDkyIC0xOTYuNjUyLDQ2LjQ5MiB6IgogICBpZD0icGF0aDMiCiAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgIHN0eWxlPSJmaWxsOiMwMDU1ODAiIC8+CjxwYXRoCiAgIGQ9Im0gNjkuNDY3LDI4OS4xOTc4IGggNDAuMjQ1IGwgMTYuNjUzLC0xMDYuMjQ5IDAuMjM2LC0xLjUwOCBjIDAuMjkzLC0wLjU5OSAwLjQ1NSwtMS4wMDEgMC40ODgsLTEuMjA1IDIuMzY2LC02LjIzNyA2LjUyOSwtOS4zNTcgMTIuNDkzLC05LjM1NyBoIDE5LjA3IGMgNS4zMzksMS40MDggNy41ODIsNC44MzEgNi43MywxMC4yNiBsIC0xNi45MzcsMTA4LjA1OSBoIDQwLjI0NyBsIDE2LjkzOCwtMTA4LjA1OSBjIDAuNzI1LC00LjYyNCAzLjMxMiwtNy43NDUgNy43NzIsLTkuMzUzIDEuNjkyLC0wLjYwNSAzLjA0MSwtMC45MDcgNC4wNDMsLTAuOTA3IGggMTcuNzE3IGMgNy40MDMsMCAxMC40NzksNC4wMjIgOS4yMiwxMi4wNyBsIC0xNi42NTYsMTA2LjI0OSBoIDQwLjI0NyBsIDE4LjkyNiwtMTIwLjczOSBjIDEuMzU5LC04LjY3MiAwLjY2NiwtMTUuODM2IC0yLjA2OSwtMjEuNDg2IC01LjUxNSwtMTEuMDkyIC0xNS4yMjMsLTE2LjY0MyAtMjkuMTE5LC0xNi42NDMgaCAtMzAuODE4IGMgLTE1LjUxMiwwIC0yNi43MjksNC43NDIgLTMzLjY1LDE0LjIyMyAtMy45NTMsLTkuNDgxIC0xMy42ODYsLTE0LjIyMyAtMjkuMTk2LC0xNC4yMjMgaCAtMzAuODIxIGMgLTEzLjksMCAtMjUuMzQyLDUuNTUgLTM0LjMzMywxNi42NDMgLTQuMjQ4LDUuMjQ4IC03LjA4MSwxMi40MDggLTguNTA0LDIxLjQ4NiBsIC0xOC45MjIsMTIwLjczOSB6IgogICBpZD0icGF0aDUiCiAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+Cjwvc3ZnPg==';

	/*
	 * Private methods/properties
	 */
	var createRequest = function(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, self.domain + url);
		xhr.setRequestHeader('X-CORS-Status', 'true');
		return xhr;
	};

	var createMediaObject = function(blob) {
		blob.url = self.domain + '/' + blob.hash;
		return blob;
	};

	var renderAlbum = function(target, media, options) {
		var album = document.createElement('div');
		album.className = 'mediacrush-album';
		album.media = media;

		var controls = document.createElement('span');
		controls.className = 'RESGalleryControls';
		var prev = document.createElement('a');
		prev.className = 'previous noKeyNav';
		var next = document.createElement('a');
		next.className = 'next noKeyNav';
		var text = document.createElement('span');
		text.className = 'RESGalleryLabel';
		controls.appendChild(prev);
		controls.appendChild(text);
		controls.appendChild(next);
		album.appendChild(controls);

		var brand = document.createElement('a');
		brand.href = self.domain + '/' + media.hash;
		brand.target = '_blank';
		brand.className = 'mediacrush-brand';
		var image = document.createElement('img');
		image.src = self.logo;
		image.width = 16; image.height = 16;
		brand.appendChild(image);
		var span = document.createElement('span');
		span.textContent = 'MediaCrush';
		brand.appendChild(span);
		album.appendChild(brand);

		album.index = 0;
		var mediaDiv;
		function renderPage() {
			if (mediaDiv)
				mediaDiv.parentElement.removeChild(mediaDiv);
			mediaDiv = document.createElement('div');
			mediaDiv.className = 'mediacrush';
			mediaDiv.setAttribute('data-media', media.files[album.index].hash);
			album.appendChild(mediaDiv);
			text.textContent = (album.index + 1) + ' of ' + media.files.length;
			self.render(mediaDiv);
		}
		renderPage();

		next.addEventListener('click', function(e) {
			e.preventDefault();
			album.index++;
			if (album.index >= media.files.length) album.index = 0;
			renderPage();
		}, false);
		prev.addEventListener('click', function(e) {
			e.preventDefault();
			album.index--;
			if (album.index < 0) album.index = media.files.length - 1;
			renderPage();
		}, false);

		target.appendChild(album);
	};

	var renderImage = function(target, media, callback) {
		var link = document.createElement('a');
		link.href = self.domain + '/' + media.hash;
		link.target = '_blank';
		var image = document.createElement('img');
		image.style.maxWidth = modules['showImages'].options.maxWidth.value + 'px';
		image.style.maxHeight = modules['showImages'].options.maxHeight.value + 'px';

		image.src = self.domain + media.files[0].file;
		modules['showImages'].makeImageZoomable(image);
		link.appendChild(image);
		target.appendChild(link);
	}

	var renderMedia = function(target, media, options, callback) {
		if (media.blob_type === "video") {
			var video = document.createElement('video');
			video.loop = media.type === 'image/gif';
			video.autoplay = media.type === 'image/gif';
			video.controls = true;
			// Set flags
			if (media.flags) {
				if (media.flags.loop) video.loop = media.flags.loop;
				if (media.flags.autoplay) video.loop = media.flags.autoplay;
				if (media.flags.mute) video.muted = media.flags.mute;
			}
			for (var i = 0; i < media.files.length; i++) {
				if (media.files[i].type.indexOf('video/') != 0) {
					continue;
				}
				var source = document.createElement('source');
				source.src = self.domain + media.files[i].file;
				video.appendChild(source);
			}
			modules['showImages'].makeImageZoomable(video);
			target.appendChild(video);
		} else if (media.blob_type === "audio") {
			var audio = document.createElement('audio');
			audio.controls = true;
			for (var i = 0; i < media.files.length; i++) {
				if (media.files[i].type.indexOf('audio/') != 0) {
					continue;
				}
				var source = document.createElement('source');
				source.src = self.domain + media.files[i].file;
				audio.appendChild(source);
			}
			target.appendChild(audio);
		} else if (media.type == 'application/album') {
			renderAlbum(target, media, options);
		}
	};

	/*
	 * Retrieves information for the specified hashes.
	 */
	self.get = function(hashes, callback) {
		var xhr;
		if (hashes instanceof Array) {
			xhr = createRequest('GET', '/api/info?list=' + hashes.join(','));
		} else {
			xhr = createRequest('GET', '/api/' + hashes);
		}
		xhr.onload = function() {
			if (callback) {
				var result = JSON.parse(this.responseText);
				if (hashes instanceof Array) {
					var array = [];
					var dictionary = {};
					for (blob in result) {
						if (blob.length != 12)
							continue;
						result[blob].hash = blob;
						if (result[blob] == null) {
							array.push(result[blob]);
							dictionary[blob] = result[blob];
						} else {
							var media = createMediaObject(result[blob]);
							media.hash = blob;
							array.push(media);
							dictionary[blob] = media;
						}
					}
					if (callback)
						callback(array, dictionary);
				} else {
					if (callback) {
						var media = createMediaObject(result);
						media.hash = hashes;
						callback(media);
					}
				}
			}
		};
		xhr.send();
	};

	/*
	 * Translates a .mediacrush div into an embedded MediaCrush object.
	 */
	self.render = function(element, callback) {
		var hash = element.getAttribute('data-media');
		var options = '';
		if (hash.indexOf('#') == 12) {
			options = hash.split('#')[1];
			hash = hash.split('#')[0];
		}
		self.get(hash, function(media) {
			if (media.type.indexOf('image/') == 0 && media.type != 'image/gif') {
				renderImage(element, media, callback);
			} else {
				renderMedia(element, media, options, callback);
			}
		});
	};

	return self;
}());
