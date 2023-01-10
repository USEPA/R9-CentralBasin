/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// Map data
import { info, map, elevLyr, loadWellsView, setupWellSlider, config } from './data/app';

// widget utils
import { initTimeSlider, initWidgets, initSlidesWidget, initTableWidget, initFeatureTable } from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import { whenFalse, whenTrue } from '@arcgis/core/core/watchUtils';
import { LayerInfo, WellsInfo } from './tableLayers';

// add calcite components
import '@esri/calcite-components/dist/index.js';

const appTitle = document.getElementById('appTitle');
if (appTitle) appTitle.innerHTML = config.appTitle;

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
view.popup.highlightEnabled = false;

map.layers.splice(0, 0, wellsLayer);

// GamaWellsRanThroughDEMclp
export const chemicalLayer = new FeatureLayer({
	portalItem: {
		id: "b2465d9640c848e7b5de175f48c31376"
	},
	visible: false,
	title: "Displayed Analyte",
	// useViewTime: true
});

// GamaWells_Location
export const allWells = new FeatureLayer({
	portalItem: {
		// id: "89aa45e4bb2446aeaf692011d4b59483"
		id: "58c259ccfd5e4115a4b4644d1ffdf4c9"
	},
	visible: false,
	title: "GAMA Wells",
})

let renderer = {
	type: "simple",
	symbol:
	{
		type: "point-3d",
		symbolLayers: [{
			type: "object",  // autocasts as new ObjectSymbol3DLayer()
			resource: { primitive: "cylinder" },
			material: { color: [105, 104, 104, 0.5] },
			width: 40,
			tilt: 180
		}]
	},
	visualVariables: [
		{
			type: "size",
			axis: "height",
			field: "GM_BOTTOM_DEPTH_OF_SCREEN_FT",
			valueUnit: "feet"
		},
		{
			type: "size",
			axis: "width-and-depth",
			valueRepresentation: "diameter",
			useSymbolValues: true,
			minSize: 40,
			valueUnit: "feet"
		},
	]
};



view.when(removeGroup);

function removeGroup() {
	map.allLayers.forEach((layer) => {
		console.log(layer.title, layer.id);
		if (layer.id === "1860a30687c-layer-223") {
			map.remove(layer);
		}
	})
}


allWells.renderer = renderer;

let displayedAnalyte = new GroupLayer;
displayedAnalyte.title = "Displayed Analyte";
// displayedAnalyte.visible = false;

displayedAnalyte.addMany([allWells, chemicalLayer]);
map.layers.add(displayedAnalyte, 1);

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

	let tableLayersArr: LayerInfo[] = config.tableLayers.layers;
	const wells3DInfo: WellsInfo = config.wells3D;

	//loop through map layers
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	view.map.layers.items.forEach((parentLayer: { title: string; id: string; layers: { items: any[]; }; }) => {
		if (parentLayer.id === '17a21a99df2-layer-1') {
			debugger;
		}

		if (parentLayer.layers) {
			// loop through config layers
			config.tableLayers.layers.forEach((configLayer: LayerInfo, configLayerIndex) => {
				// loop through group to match config and map layers
				if (parentLayer.title === configLayer.parentTitle) {
					parentLayer.layers.items.forEach((layer: any) => {
						if (layer.title === configLayer.title2D) {
							tableLayersArr[configLayerIndex].id2D = layer.id;
							tableLayersArr[configLayerIndex].layer2D = view.map.findLayerById(layer.id) as FeatureLayer;
							tableLayersArr[configLayerIndex].layer2D?.set('popupTemplate', tableLayersArr[configLayerIndex].template);
							// @ts-ignore
							tableLayersArr[configLayerIndex].layer2D.outFields = ['*'];
						} else if (layer.title === configLayer.title3D) {
							tableLayersArr[configLayerIndex].id3D = layer.id;
							tableLayersArr[configLayerIndex].layer3D = view.map.findLayerById(layer.id) as SceneLayer;
							tableLayersArr[configLayerIndex].layer3D?.set('popupTemplate', tableLayersArr[configLayerIndex].template);
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
	const promiseArr: Promise<SceneLayerView>[] = [];
	tableLayersArr.forEach((layer: LayerInfo) => {
		promiseArr.push(view.whenLayerView(layer.layer3D as SceneLayer));
	});

	// execute after layers loaded
	Promise.all(promiseArr).then((layerViews) => {
		// console.log(layerViews);

		tableLayersArr = createTableElements(layerViews, tableLayersArr);
		initTableWidget(view, tableLayersArr, layerViews);
		setupWellSlider(tableLayersArr, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});

	view.whenLayerView(wells3DInfo.layer3D as SceneLayer).then((wellsLayerView) => {
		loadWellsView(wells3DInfo.layer3D as SceneLayer, wellsLayerView as SceneLayerView, view);
	});
});

const createTableElements = (layerViews: SceneLayerView[], tableLayersArr: LayerInfo[]) => {
	layerViews.forEach((layerView) => {
		tableLayersArr.forEach((tableLayer, j) => {
			// add scene view, html elements to array
			if (tableLayer.id3D === layerView.layer.id) {
				// console.log(tableLayer);
				tableLayersArr[j].sceneView = layerView;

				tableLayersArr[j].tableDiv = document.createElement('DIV') as HTMLElement;
				tableLayersArr[j]?.tableDiv?.classList.add('tab-content');

				tableLayersArr[j].tab = document.createElement('BUTTON');

				// @ts-ignore
				tableLayersArr[j].tab.classList.add('calcite-tab', 'wells2d', 'esri-widget--button');
				// @ts-ignore
				tableLayersArr[j].tab.innerHTML = tableLayer.label;

				if (j === 0) {
					tableLayersArr[j]?.tab?.classList.add('active-button');
					tableLayersArr[j]?.tableDiv?.classList.add('active-content');
				}

				// @ts-ignore
				document.getElementById('tableTabs')?.appendChild(tableLayersArr[j].tab);
				// @ts-ignore
				document.getElementById('tableDivs')?.appendChild(tableLayersArr[j].tableDiv);
				// @ts-ignore
				tableLayersArr[j].tab.onclick = () => changeTab(tableLayersArr[j]);
			}
		})
	});
	return tableLayersArr;
};

// manage table and tab elements when changing tabs
export const changeTab = (layerInfo: LayerInfo) => {
	removeActive('calcite-tab', 'active-button');
	removeActive('tab-content', 'active-content');
	setActive(layerInfo);
	return '';
};

const removeActive = (elementClass: string, activeClass: string) => {
	const tabArr = Array.from(document.getElementsByClassName(elementClass));
	for (let i = 0; i < tabArr.length; i++) {
		tabArr[i].classList.remove(activeClass);
	}
};

const setActive = (layerInfo: LayerInfo) => {
	// console.log(layerInfo);

	layerInfo.tab?.classList.add('active-button');
	layerInfo.tableDiv?.classList.add('active-content');
};
