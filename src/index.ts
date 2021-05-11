/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

// Map data
import { mapProperties, info, map, elevLyr, loadWellsView, setupWellSlider } from './data/app';

// widget utils
import { initTimeSlider, initWidgets, initSlidesWidget, initTableWidget } from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import { whenFalse, whenTrue } from '@arcgis/core/core/watchUtils';

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
	let layer2dId;
	let allWells3dId;
	let pceWellsId;
	let tceWellsId;

	view.map.layers.items.forEach((parentLayer) => {
		console.log('layer', parentLayer.title);
		if (parentLayer.title === 'Wells 2D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells With Labels') {
					console.log(layer);
					layer2dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'Wells 3D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells - Gray V2') {
					console.log(layer);
					allWells3dId = layer.id;
				}
			});
		} else if (parentLayer.title === 'WRD 3D Sampling Results') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'Wells Sampled for PCE 3D') {
					console.log(layer);
					pceWellsId = layer.id;
				} else if (layer.title === 'Wells Sampled for TCE 3D') {
					console.log(layer);
					tceWellsId = layer.id;
				}
			});
		}
	});
	const wellsLayer2D = view.map.findLayerById(layer2dId) as FeatureLayer;
	wellsLayer2D.outFields = ['*'];

	const allWellsLayer3D = view.map.findLayerById(allWells3dId) as SceneLayer;
	const tceWellsLayer3D = view.map.findLayerById(pceWellsId) as SceneLayer;
	const pceWellsLayer3D = view.map.findLayerById(tceWellsId) as SceneLayer;

	const timeLayersArr = [allWellsLayer3D, tceWellsLayer3D, pceWellsLayer3D];


	allWellsLayer3D.outFields = ['*'];
	tceWellsLayer3D.outFields = ['*'];
	pceWellsLayer3D.outFields = ['*'];

	const promise1 = view.whenLayerView(timeLayersArr[0]);
	const promise2 = view.whenLayerView(timeLayersArr[1]);
	const promise3 = view.whenLayerView(timeLayersArr[2]);

	Promise.all([promise1, promise2, promise3]).then((layerViews) => {
		console.log(layerViews);
		const sliderInfo = [];
		layerViews.forEach((layerView, index) => {
			sliderInfo.push({layerView: layerView,
				fieldName: 'WellsRanThroughDEM_EPA_WQ_DDW_3'
			})
		});

		setupWellSlider(sliderInfo, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});
	
	view.whenLayerView(allWellsLayer3D).then((wellsLayerView) => {
		loadWellsView(allWellsLayer3D, wellsLayerView as SceneLayerView, view);

		// setupWellSlider(wellsLayerView as SceneLayerView, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});

	view.whenLayerView(wellsLayer2D).then(wellsLayerView => {
		initTableWidget(view, wellsLayer2D as FeatureLayer);
	});
});
