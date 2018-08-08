﻿/* * author: Oleg Nazarov* version: 1.0.1*/var AA = app.activeDocument;var GROUP_NAME = 'ScriptGroup';var RESULT_TEXT_SIZE = '6 px';var DEBUG = false;try {	var group = reCreateGroup();	recursive(AA.layers, group);} catch(e) {	debug(e);}function reCreateGroup() {	var group;	try {		group = AA.layers.getByName(GROUP_NAME);		if(isLayerSet(group)) {			group.remove();		}	} catch (e) {		debug(e);	}	group = AA.layerSets.add();	group.name = GROUP_NAME;		return group;}function recursive(_layers, group) {	try {		var _layer;		var i = 0;		for(i; i < _layers.length; i++) {			_layer = _layers[i];			if(_layer.name == GROUP_NAME) {				continue;			} else if(isTextLayer(_layer)) {				createTextInfoLayer(_layer, group);			} else if (isLayerSet(_layer)) {				recursive(_layer.layers, group);			}		}	} catch(e) {		debug(e);	}}function isTextLayer(_layer) {	try {		if(isArtLayer(_layer)) {			if(_layer.textItem) {				return true;			}		}	} catch (e) {		debug(e);	}		return false;}function isArtLayer(_layer) {	return _layer.typename === "ArtLayer"}function isLayerSet(_layer) {	return _layer.typename === "LayerSet"}function makeLine(prefix, content) {    if(content == '') {        content = "auto";    }    return prefix + ': ' + content + EOL();}function readProp(obj,name) {    try {        return obj[name];    } catch(e) {		debug(name + ":" + e);	}    return "";}function getColor(textItem) {    try {        return "#"+textItem.color.rgb.hexValue;    } catch(e) {		debug(e);	}    return "#000000";}function createTextInfoLayer(_layer, group) {    var layer = group.artLayers.add();    var textItem = _layer.textItem;    	try {		layer.name = _layer.name;		layer.kind = LayerKind.TEXT;		layer.textItem.size = RESULT_TEXT_SIZE;		layer.textItem.position = textItem.position;		layer.textItem.justification = textItem.justification;                var font = 		layer.textItem.contents = makeLine("font-family",readProp(textItem, 'font'))                                           + makeLine("font-size", parseFloat(readProp(textItem, 'size')).toFixed(2))                                           + makeLine("font-weight",readProp(textItem, 'fauxBold') ? "bold" : "normal")                                           + makeLine("font-style",readProp(textItem, 'fauxItalic') ? "italic" : "normal")                                           + makeLine("font-color", getColor(textItem))                                           + makeLine("letter-spacing", readProp(textItem, 'tracking'))                                           + makeLine("line-height", readProp(textItem, 'leading'))		;	} catch(e){		layer.remove();		debug(e);	}}function EOL() {	return String.fromCharCode(13)}function debug(context) {	if(DEBUG) {		$.writeln(context)	}}