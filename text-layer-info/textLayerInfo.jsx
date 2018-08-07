﻿/* * author: Oleg Nazarov* version: 1.0.0*/var AA = app.activeDocument;var GROUP_NAME = 'ScriptGroup';var RESULT_TEXT_SIZE = '18 px';try {	var group = reCreateGroup();	recursive(AA.layers, group);} catch(e) {}function reCreateGroup() {	var group;	try {		group = AA.layers.getByName(GROUP_NAME);		if(isLayerSet(group)) {			group.remove();		}	} catch (e) {}	group = AA.layerSets.add();	group.name = GROUP_NAME;		return group;}function recursive(_layers, group) {	try {		var _layer;		var i = 0;		for(i; i < _layers.length; i++) {			_layer = _layers[i];			if(_layer.name == GROUP_NAME) {				continue;			} else if(isTextLayer(_layer)) {				createTextInfoLayer(_layer, group);			} else if (isLayerSet(_layer)) {				recursive(_layer.layers, group);			}		}	} catch(e) {}}function isTextLayer(_layer) {	try {		if(isArtLayer(_layer)) {			if(_layer.textItem) {				return true;			}		}	} catch (e) {}		return false;}function isArtLayer(_layer) {	return _layer.typename === "ArtLayer"}function isLayerSet(_layer) {	return _layer.typename === "LayerSet"}function createTextInfoLayer(_layer, group) {	var layer = group.artLayers.add();	try {		layer.name = _layer.name;		layer.kind = LayerKind.TEXT;		layer.textItem.size = RESULT_TEXT_SIZE;		layer.textItem.position = _layer.textItem.position;		layer.textItem.justification = _layer.textItem.justification;		layer.textItem.contents = "font-family: " +_layer.textItem.font + EOL()								+ "font-size: " + _layer.textItem.size + EOL()								+ "font-weight: " + (_layer.textItem.fauxBold ? "bold" : "normal") + EOL()								+ "font-style: " + (_layer.textItem.fauxItalic ? "italic" : "normal") + EOL()								+ "font-color: #" + _layer.textItem.color.rgb.hexValue  + EOL()								+ "letter-spacing: " + _layer.textItem.tracking + EOL()								+ "line-height: " + _layer.textItem.leading + EOL()		;	} catch(e){		layer.remove();	}}function EOL() {	return String.fromCharCode(13)}