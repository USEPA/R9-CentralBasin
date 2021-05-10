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

IdentityManager.checkSignInStatus(info.portalUrl + '/sharing')
	// .then(function () {
	//     displayScene();
	// })
	.catch(function () {
		// // Anonymous view
		// anonPanelElement.style.display = "block";
		// personalPanelElement.style.display = "none";
		IdentityManager.getCredential(info.portalUrl + '/sharing');
	});

const view = new SceneView({
	container: 'viewDiv',
	map,
	qualityProfile: 'high',
	// camera: {
	//     position: {
	//         longitude: -118.28748742872797,
	//         latitude: 33.662192782586914,
	//         z: -7081.5817536227405
	//     },
	//
	//     heading: 25.294671756735518,
	//     tilt: 104.18433339008232
	// }
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
	let layer3dId;
	view.map.layers.items.forEach((parentLayer) => {
		if (parentLayer.title === 'Wells 2D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells With Labels') {
					console.log(layer);
					layer2dId = layer.id;
				}
			});
		}
		if (parentLayer.title === 'Wells 3D') {
			parentLayer.layers.items.forEach((layer: any) => {
				if (layer.title === 'All Wells - Gray V2') {
					console.log(layer);
					layer3dId = layer.id;
				}
			});
		}
	});
	const wellsLayer2D = view.map.findLayerById(layer2dId) as FeatureLayer;
	wellsLayer2D.outFields = ['*'];

	const wellsLayer3D = view.map.findLayerById(layer3dId) as SceneLayer;

	wellsLayer3D.outFields = ['*'];
	view.whenLayerView(wellsLayer3D).then((wellsLayerView) => {
		loadWellsView(wellsLayer3D, view);
		setupWellSlider(wellsLayerView as SceneLayerView, timePieces.timeSlider, timePieces.timeSliderExpand, view);
	});

	view.whenLayerView(wellsLayer2D).then(wellsLayerView => {
		initTableWidget(view, wellsLayer2D as FeatureLayer);
	});
});
