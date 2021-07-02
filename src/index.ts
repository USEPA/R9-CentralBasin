/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Map data
import { info, map, elevLyr, loadWellsView, setupWellSlider } from './data/app';

// widget utils
import {initTimeSlider, initWidgets, initSlidesWidget, initTableWidget, initFeatureTable} from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import { whenFalse, whenTrue } from '@arcgis/core/core/watchUtils';
import { config } from './config';

// add calcite components
// import '@esri/calcite-components/dist/calcite.js';

const wellsLayer = new FeatureLayer();

/**
 * Initialize application
 */
IdentityManager.registerOAuthInfos([info]);
IdentityManager.checkSignInStatus(info.portalUrl + '/sharing').catch(() => {
	IdentityManager.getCredential(info.portalUrl + '/sharing');
});

const view = new SceneView({
	container: 'viewDiv',
	map,
	qualityProfile: 'high',
});

map.layers.splice(0, 0, wellsLayer);
map.ground.layers.add(elevLyr);

view.popup.defaultPopupTemplateEnabled = true;

// handle spinner for when layers are updating
whenTrue(view, 'updating', () => {
	// @ts-ignore
	document.getElementById('lds-roller').style.visibility = 'visible';
});
whenFalse(view, 'updating', () => {
	// @ts-ignore
	document.getElementById('lds-roller').style.visibility = 'hidden';
});

// load widgets
view.when(initWidgets);
view.when(initFeatureTable);
view.when(initSlidesWidget);
view.when(initTimeSlider).then((timePieces) => {
	// @ts-ignore
	document.getElementById('slidesDiv').style.visibility = 'visible';
	// @ts-ignore
	document.getElementById('featureSearchDiv').style.visibility = 'visible';

	let tableLayersArr = config.tableLayers.layers;
	const wells3DInfo = config.wells3D;

	//loop through map layers
	view.map.layers.items.forEach((parentLayer: { title: string; id: any; layers: { items: any[]; }; }) => {
		if (parentLayer.id === '17a21a99df2-layer-1') {
			debugger;
		}

		// console.log('parentlayer: ', parentLayer.title, 'id: ', parentLayer.id);
		if (parentLayer.layers) {
			// loop through config layers
			config.tableLayers.layers.forEach((configLayer, configLayerIndex) => {
				// loop through group to match config and map layers
				if (parentLayer.title === configLayer.parentTitle) {
					parentLayer.layers.items.forEach((layer: any) => {
						if (layer.title === configLayer.title2D) {
							tableLayersArr[configLayerIndex].id2D = layer.id;
							tableLayersArr[configLayerIndex].layer2D = view.map.findLayerById(layer.id) as FeatureLayer;
							tableLayersArr[configLayerIndex].layer2D.outFields = ['*'];
						} else if (layer.title === configLayer.title3D) {
							tableLayersArr[configLayerIndex].id3D = layer.id;
							tableLayersArr[configLayerIndex].layer3D = view.map.findLayerById(layer.id) as SceneLayer;
						}
					});
				}
			});

			if (parentLayer.title === config.wells3D.parentTitle) {
				parentLayer.layers.items.forEach((layer: any) => {
					if (layer.title === config.wells3D.title3D) {
						wells3DInfo.id3D = layer.id;
						wells3DInfo.layer3D = view.map.findLayerById(layer.id) as SceneLayer;
						wells3DInfo.layer3D.outFields = ['*'];
					}
				});
			}
		}
	});

	// create promises for when layers load
	let promiseArr = [];
	tableLayersArr.forEach((layer) => {
		promiseArr.push(view.whenLayerView(layer.layer3D));
	});

	// execute after layers loaded
	Promise.all(promiseArr).then((layerViews) => {
		console.log(layerViews);

		tableLayersArr = createTableElements(layerViews, tableLayersArr);
		initTableWidget(view, tableLayersArr);
		setupWellSlider(tableLayersArr, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});

	view.whenLayerView(wells3DInfo.layer3D).then((wellsLayerView) => {
		loadWellsView(wells3DInfo.layer3D, wellsLayerView as SceneLayerView, view);
	});
});

const createTableElements = (layerViews: any[], tableLayersArr: any[]) => {
	layerViews.forEach((layerView) => {
		tableLayersArr.forEach((tableLayer, j) => {
			// console.log(tableLayer);
			// add scene view, html elements to array
			if (tableLayer.id3D === layerView.layer.id) {
				console.log(tableLayer);
				tableLayersArr[j].sceneView = layerView;

				tableLayersArr[j].tableDiv = document.createElement('DIV');
				tableLayersArr[j].tableDiv.classList.add('tab-body');

				tableLayersArr[j].tab = document.createElement('BUTTON');
				tableLayersArr[j].tab.classList.add('calcite-tab', 'wells2d', 'esri-widget--button');
				tableLayersArr[j].tab.innerHTML = tableLayer.label;

				if (j === 0) {
					tableLayersArr[j].tab.classList.add('active');
					tableLayersArr[j].tableDiv.classList.add('active-table');
				}

				document.getElementById('tableTabs')?.appendChild(tableLayersArr[j].tab);
				document.getElementById('tableDivs')?.appendChild(tableLayersArr[j].tableDiv);

				tableLayersArr[j].tab.onclick = () => changeTab(tableLayersArr[j]);
			}
		})
	});
	return tableLayersArr;
};

// manage table and tab elements when changing tabs
const changeTab = (layerInfo: string) => {
	console.log(layerInfo);
	const tabArr = Array.from(document.getElementsByClassName('calcite-tab'));

	for (let i = 0; i < tabArr.length; i++) {
		tabArr[i].classList.remove("active");
	}
	layerInfo.tab?.classList.add('active');

	const tableArr = Array.from(document.getElementsByClassName('tab-body'));
	for (let i = 0; i < tableArr.length; i++) {
		tableArr[i].classList.remove("active-table");
	}
	layerInfo.tableDiv?.classList.add('active-table');
};
