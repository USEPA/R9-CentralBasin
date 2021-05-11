/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import WebScene from '@arcgis/core/WebScene';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import SceneView from '@arcgis/core/views/SceneView';
import FeatureFilter from '@arcgis/core/views/layers/support/FeatureFilter';
import moment from 'moment';
import { whenNotOnce } from '@arcgis/core/core/watchUtils';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import Expand from '@arcgis/core/widgets/Expand';
import TimeExtent from '@arcgis/core/TimeExtent';
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import Camera from '@arcgis/core/Camera';
// import FeatureTable from '@arcgis/core/widgets/FeatureTable';
// import LayerView from '@arcgis/core/views/layers/LayerView';

export const info = new OAuthInfo({
	appId: process.env.NODE_ENV === 'production' ? 'RjgBsWrJbfY8hMGY' : 'ZtlpDht9ywRCA4Iq',
	portalUrl: 'https://epa.maps.arcgis.com',
	// Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
	// authNamespace: "portal_oauth_inline",
	popup: false,
});

export const mapProperties: any = {
	blankBasemapId: 'c0af3abd0d60427ba659e38d457fbe07',
};

export const map = new WebScene({
	portalItem: {
		id: 'b8eab523b28b453cb9cff1d90569cd43', // dev webscene
		// id: 'dd983ac69154460fb75f5ce193b5344d', // production webscene
	},
	ground: {
		navigationConstraint: {
			type: 'none',
		},
	},
});

export const elevLyr = new ElevationLayer({
	url: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
});

function applyTimeExtent(timeExtent: TimeExtent, layerView: SceneLayerView) {
	const start = moment(timeExtent.start).format('YYYY-MM-DD');
	const end = moment(timeExtent.end).format('YYYY-MM-DD');

	layerView.filter = new FeatureFilter({
		where: `WellsRanThroughDEM_EPA_WQ_DDW_3 BETWEEN DATE '${start}' AND DATE '${end}'`,
		// where: `WellsRanThroughDEM_EPA_WQ_DDW_1 = DATE '${start}'`
	});
}

export async function setupWellSlider(
	justWells: SceneLayerView,
	timeSlider: TimeSlider,
	timeSliderExpand: Expand,
	view: SceneView,
) {
	// @ts-ignore
	// let justWells = view.map.layers.find(x => x.portalItem && x.portalItem.id === "71e28039832f4ba3b02b997a59230c08") as SceneLayer;

	// view.whenLayerView(justWells).then(async layerView => {

	// layerView.maximumNumberOfFeatures = 500_000;
	//
	// const field = "Value_";
	// const min = minHeight;
	// const max = maxHeight;
	//
	// const minOpacity = 0;
	// const maxOpacity = 0.8;
	timeSlider.watch('timeExtent', () => {
		if (timeSliderExpand.expanded) {
			applyTimeExtent(timeSlider.timeExtent, justWells);
		}
	});

	// @ts-ignore
	justWells.filter = null;
	timeSliderExpand.watch('expanded', () => {
		if (!timeSliderExpand.expanded) {
			// @ts-ignore
			justWells.filter = null;
		} else if (timeSlider.timeExtent) {
			applyTimeExtent(timeSlider.timeExtent, justWells);
		}
	});

	await whenNotOnce(view, 'updating');
}

export async function loadWellsView(wellsSceneLayer: SceneLayer, wellsSceneLayerView: SceneLayerView, view: SceneView) {
	let highlight: any;

	const featureSearchInput = document.getElementById('featureSearch');
	// @ts-ignore
	featureSearchInput.onkeyup = (event: any) => {
		if (event.keyCode === 13) {
			const value = event.currentTarget.value;
			if (highlight) {
				highlight.remove();
			}
			wellsSceneLayer
				.queryExtent({
					where: `WellsRanThroughDEM2_WRDID = ${parseInt(value, 10)}`,
					// where: `1=1`,
				})
				.then((response: any) => {
					wellsSceneLayerView
						.queryExtent({
							where: `WellsRanThroughDEM2_WRDID = ${parseInt(value, 10)}`,
							// where: `1=1`,
						})
						.then((response1: any) => {
							wellsSceneLayer.visible = true;
							view.goTo({
								center: response1.extent.center,
								tilt: 102,
								zoom: 17,
							});

							// view.goTo({ target: response.extent, scale: 2000 }).then(evt => {
							// 	view.goTo({ tilt: -45 });
							// });
							highlight = wellsSceneLayerView.highlight(response.features);
						});
				});
		}
	};
}
