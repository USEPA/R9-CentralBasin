/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Map data
import { info, map, elevLyr, loadWellsView, setupWellSlider } from './data/app';

// widget utils
import { initTimeSlider, initWidgets, initSlidesWidget, initTableWidget } from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import { whenFalse, whenTrue } from '@arcgis/core/core/watchUtils';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';

// add calcite components
// import '@esri/calcite-components/dist/calcite.js';

const wellsLayer = new FeatureLayer();

/**
 * Initialize application
 */
IdentityManager.registerOAuthInfos([info]);

IdentityManager.checkSignInStatus(info.portalUrl + '/sharing').catch(function () {
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

whenTrue(view, 'updating', function () {
	// @ts-ignore
	document.getElementById('lds-roller').style.visibility = 'visible';
});

whenFalse(view, 'updating', function () {
	// @ts-ignore
	document.getElementById('lds-roller').style.visibility = 'hidden';
});

view.when(initWidgets);
view.when(initSlidesWidget);
view.when(initTimeSlider).then((timePieces) => {
	// @ts-ignore
	document.getElementById('slidesDiv').style.visibility = 'visible';
	// @ts-ignore
	document.getElementById('featureSearchDiv').style.visibility = 'visible';
	view.on('click', function () {
		console.log('click');
	});

	// @ts-ignore
	let wells2dId;
	let wells3dId;
	let gamaTce2dId;
	let gamaTce3dId;
	let gamaPce2dId;
	let gamaPce3dId;
	let wrdPce3dId;
	let wrdTce3dId;
	let gamaCr62dId;
	let gamaCr63dId;

	view.map.layers.items.forEach((parentLayer) => {
		console.log('layer', parentLayer.title);
		if (parentLayer.title === 'Wells 2D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells With Labels') {
					console.log(layer);
					wells2dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'Wells 3D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells - Gray V3') {
					console.log(layer);
					wells3dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'TCE Sampling Results') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'GAMA TCE 2D') {
					console.log(layer);
					gamaTce2dId = layer.id;
				} else if (layer.title === 'GAMA TCE 3D') {
					console.log(layer);
					gamaTce3dId = layer.id;
				}
				else if (layer.title === 'WRD TCE 3D') {
					console.log(layer);
					wrdTce3dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'PCE Sampling Results') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'GAMA PCE 2D') {
					console.log(layer);
					gamaPce2dId = layer.id;
				} else if (layer.title === 'GAMA PCE 3D') {
					console.log(layer);
					gamaPce3dId = layer.id;
				}
				else if (layer.title === 'WRD PCE 3D') {
					console.log(layer);
					wrdPce3dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'CR6 Sampling Results') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'GAMA CR6 2D') {
					console.log(layer);
					gamaCr62dId = layer.id;
				} else if (layer.title === 'GAMA CR6 3D') {
					console.log(layer);
					gamaCr63dId = layer.id;
				}
			});
		} else {
			console.log(parentLayer.title);
		}
	});

	const wells2dLayer = view.map.findLayerById(wells2dId) as FeatureLayer;
	wells2dLayer.outFields = ['*'];
	const tceGamaLayer = view.map.findLayerById(gamaTce2dId) as FeatureLayer;
	tceGamaLayer.outFields = ['*'];
	const pceGamaLayer = view.map.findLayerById(gamaPce2dId) as FeatureLayer;
	pceGamaLayer.outFields = ['*'];
	const cr6GamaLayer = view.map.findLayerById(gamaCr62dId) as FeatureLayer;
	cr6GamaLayer.outFields = ['*'];

	const wells3dLayer = view.map.findLayerById(wells3dId) as SceneLayer;
	const wrdTce3DLayer = view.map.findLayerById(wrdTce3dId) as SceneLayer;
	const wrdPce3DLayer = view.map.findLayerById(wrdPce3dId) as SceneLayer;
	const gamaTce3DLayer = view.map.findLayerById(gamaTce3dId) as SceneLayer;
	const gamaPce3DLayer = view.map.findLayerById(gamaPce3dId) as SceneLayer;
	const gamaCr63DLayer = view.map.findLayerById(gamaCr63dId) as SceneLayer;

	const timeLayersArr = [wells3dLayer, wrdTce3DLayer, wrdPce3DLayer, gamaTce3DLayer, gamaPce3DLayer, gamaCr63DLayer];

	const dateField = ['Date', 'WellsRanThroughDEM_EPA_WQ_DDW_3', 'WellsRanThroughDEM_EPA_WQ_DDW_3', 'Date', 'Date', 'Date'];

	wells3dLayer.outFields = ['*'];
	wrdTce3DLayer.outFields = ['*'];
	wrdPce3DLayer.outFields = ['*'];
	gamaTce3DLayer.outFields = ['*'];
	gamaPce3DLayer.outFields = ['*'];
	gamaCr63DLayer.outFields = ['*'];

	const promise1 = view.whenLayerView(timeLayersArr[0]);
	const promise2 = view.whenLayerView(timeLayersArr[1]);
	const promise3 = view.whenLayerView(timeLayersArr[2]);
	const promise4 = view.whenLayerView(timeLayersArr[3]);
	const promise5 = view.whenLayerView(timeLayersArr[4]);
	const promise6 = view.whenLayerView(timeLayersArr[5]);

	Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((layerViews) => {
		console.log(layerViews);
		const sliderInfo: any[] | SceneLayerView = [];
		layerViews.forEach((layerView, i) => {
			sliderInfo.push({
				layerView: layerView,
				fieldName: dateField[i]
			})
		});

		const tableLayersArr = [{ div: document.getElementById('wells2dLayer'), layer: wells2dLayer, layer3d: layerViews[0] },
		{ div: document.getElementById('tceGamaLayer'), layer: tceGamaLayer, layer3d: layerViews[3] },
		{ div: document.getElementById('pceGamaLayer'), layer: pceGamaLayer, layer3d: layerViews[4] },
		{ div: document.getElementById('cr6GamaLayer'), layer: cr6GamaLayer, layer3d: layerViews[5] }];
	
		initTableWidget(view, tableLayersArr);

		setupWellSlider(sliderInfo, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});

	view.whenLayerView(wells3dLayer).then((wellsLayerView) => {
		loadWellsView(wells3dLayer, wellsLayerView as SceneLayerView, view);
	});

});

function changeTab(evt, elementId) {
	console.log(evt, elementId);
}