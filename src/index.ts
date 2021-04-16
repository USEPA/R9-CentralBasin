import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// Map data
import { mapProperties, info, map, elevLyr, loadWellsView, setupWellSlider, initTableWidget } from './data/app';

// widget utils
import { initTimeSlider, initWidgets, initSlidesWidget } from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';

let wellsLayer = new FeatureLayer;

/**
 * Initialize application
 */
IdentityManager.registerOAuthInfos([info]);

IdentityManager
    .checkSignInStatus(info.portalUrl + "/sharing")
    // .then(function () {
    //     displayScene();
    // })
    .catch(function () {
        // // Anonymous view
        // anonPanelElement.style.display = "block";
        // personalPanelElement.style.display = "none";
        IdentityManager.getCredential(info.portalUrl + "/sharing");
    });

let view = new SceneView({
    container: "viewDiv",
    map,
    qualityProfile: "high",
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

view.when(initWidgets);
// view.when(loadWellsView);
view.when(initTimeSlider).then(timePieces => {
    // @ts-ignore
    document.getElementById("slidesDiv").style.visibility = "visible";
    // @ts-ignore
    document.getElementById("featureSearchDiv").style.visibility = "visible";
    view.on("click", function (event) {
        console.log("click");
    });

    // @ts-ignore
    const wellsLayer = view.map.layers.find(x => x.portalItem && x.portalItem.id === mapProperties.wellsLayerId) as SceneLayer;

    wellsLayer.when(initTableWidget);
    wellsLayer.outFields = ["*"];
    view.whenLayerView(wellsLayer).then(wellsLayerView => {
        loadWellsView(wellsLayerView as SceneLayerView, view);
        setupWellSlider(wellsLayerView as SceneLayerView, timePieces.timeSlider, timePieces.timeSliderExpand, view)
    })
});

view.when(initSlidesWidget);
