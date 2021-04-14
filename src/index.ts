// Map data
import {wellsLayer, info, map, elevLyr, loadWellsView, setupWellSlider} from './data/app';

// widget utils
import {initTimeSlider, initWidgets} from './widgets';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import SceneView from '@arcgis/core/views/SceneView';

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

wellsLayer.when(() => {
    view.goTo(wellsLayer.fullExtent);
});

view.when(initWidgets);
view.when(loadWellsView)
// @ts-ignore
view.when(initTimeSlider).then(timePieces => {
    setupWellSlider(view, timePieces.timeSlider, timePieces.timeSliderExpand)
});
