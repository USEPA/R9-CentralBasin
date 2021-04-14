import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import ArcGISMap from '@arcgis/core/Map';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import WebScene from '@arcgis/core/WebScene';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import SceneView from '@arcgis/core/views/SceneView';
import FeatureFilter from '@arcgis/core/views/layers/support/FeatureFilter';
import moment from 'moment';
import {whenNotOnce} from "@arcgis/core/core/watchUtils";
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import TimeInterval from '@arcgis/core/TimeInterval';
import Home from '@arcgis/core/widgets/Home';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';

export const wellsLayer = new SceneLayer({
    portalItem: {
        id: "71e28039832f4ba3b02b997a59230c08"
    },
    outFields: ["*"]
});

export const map = new WebScene({
    portalItem: {
        id: "dd983ac69154460fb75f5ce193b5344d"
    },
    // basemap: "gray-vector",
    ground: {
        navigationConstraint: {
            type: "none"
        }
    }
    // ground: "world-elevation",
    // layers: [wellsLayer]

});


export const info = new OAuthInfo({
    // Swap this ID out with registered application ID
    // appId: "ZtlpDht9ywRCA4Iq",
    appId: "RjgBsWrJbfY8hMGY",
    // Uncomment the next line and update if using your own portal
    portalUrl: "https://epa.maps.arcgis.com",
    // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
    // authNamespace: "portal_oauth_inline",
    popup: false
});

export const elevLyr = new ElevationLayer({
    // Custom elevation service
    url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
});

// let minHeight = 2485;
// let maxHeight = 44070;

export function setupWellSlider(view: SceneView, timeSlider: TimeSlider, timeSliderExpand: Expand) {
    // function loadLayerView(wellsLayer: SceneLayer) {
    wellsLayer.outFields = ["*"];
    view.whenLayerView(wellsLayer).then(async layerView => {

        // layerView.maximumNumberOfFeatures = 500_000;
        //
        // const field = "Value_";
        // const min = minHeight;
        // const max = maxHeight;
        //
        // const minOpacity = 0;
        // const maxOpacity = 0.8;


        timeSlider.watch("timeExtent", () => {
            if (timeSliderExpand.expanded) {
                const timeExtent = timeSlider.timeExtent;
                const start = moment(timeExtent.start).format("YYYY-MM-DD");
                const end = moment(timeExtent.end).format("YYYY-MM-DD");


                layerView.filter = new FeatureFilter({
                    where: `WellsRanThroughDEM_EPA_WQ_DDW_3 BETWEEN DATE '${start}' AND DATE '${end}'`
                    // where: `WellsRanThroughDEM_EPA_WQ_DDW_1 = DATE '${start}'`

                });
            }
            // layerView.queryFeatures({where: layerView.filter.where, outFields: ["*"]}).then(r => console.log(r));
        });


        // @ts-ignore
        layerView.filter = null;
        timeSliderExpand.watch("expanded", () => {
            if (!timeSliderExpand.expanded) {
                // @ts-ignore
                layerView.filter = null;
            }
        });


        // query loaded features


        await whenNotOnce(view, "updating");
    });
    // const featureTable = new FeatureTable({
    //     view: view, // The view property must be set for the select/highlight to work
    //     layer: plumes,
    //     container: "tableDiv"
    // });




}

export async function loadWellsView(view: SceneView) {
    // @ts-ignore
    let justWells = view.map.layers.find(x => x.portalItem && x.portalItem.id === "71e28039832f4ba3b02b997a59230c08") as SceneLayer;
    justWells.outFields = ["*"];
    let highlight: any;
    return view.whenLayerView(justWells).then(justWellsView => {
        let featureSearch = document.getElementById("featureSearchDiv");
        // @ts-ignore
        view.ui.add(featureSearch, "top-right", 0);
        let featureSearchInput = document.getElementById("featureSearch");
        // @ts-ignore
        featureSearchInput.onkeyup = (event: any) => {
            if (event.keyCode === 13) {
                if (highlight) {
                    highlight.remove();
                }
                justWellsView.queryExtent({
                    where: `WellsRanThroughDEM_WRD_CB_Wells = ${parseInt(event.currentTarget.value, 10)}`
                }).then((response: any) => {
                    view.goTo({target: response.extent, scale: 2000});
                });
                justWellsView.queryFeatures({
                    where: `WellsRanThroughDEM_WRD_CB_Wells = ${parseInt(event.currentTarget.value, 10)}`
                }).then((response: any) => {
                    highlight = justWellsView.highlight(response.features);
                });
            }
        };
    });
}
