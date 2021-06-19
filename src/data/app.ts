/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { config } from '../config';

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
let highlight: any;

let env;
if (process.env.NODE_ENV === 'production') {
	env = config.portalEnv.production;
} else {
	env = config.portalEnv.development;
}

export const info = new OAuthInfo({
	appId: process.env.NODE_ENV === 'production' ? env.appId : env.appId,
	portalUrl: env.portalUrl,
	// Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
	// authNamespace: "portal_oauth_inline",
	popup: false,
});

export const mapProperties: any = {
	blankBasemapId: env.blankBasemap,
};

export const map = new WebScene({
	portalItem: {
		id: env.webScene,
	},
	ground: {
		navigationConstraint: {
			type: 'none',
		},
	},
});

export const elevLyr = new ElevationLayer({
	url: env.elevationUrl,
});

function applyTimeExtent(timeExtent: TimeExtent, layerView: SceneLayerView, timeField: string) {
	const start = moment(timeExtent.start).format('YYYY-MM-DD');
	const end = moment(timeExtent.end).format('YYYY-MM-DD');

	layerView.filter = new FeatureFilter({
		where: `${timeField} BETWEEN DATE '${start}' AND DATE '${end}'`,
		// where: `WellsRanThroughDEM_EPA_WQ_DDW_1 = DATE '${start}'`
	});
}

export async function setupWellSlider(
	layerViews: any[] | SceneLayerView,
	timeSlider: TimeSlider,
	timeSliderExpand: Expand,
	view: SceneView,
) {
	timeSlider.watch('timeExtent', () => {
		if (timeSliderExpand.expanded) {
			layerViews.forEach(layerView => {
				applyTimeExtent(timeSlider.timeExtent, layerView.layerView, layerView.fieldName);
			});
		}
	});

	layerViews.forEach(layerView => {
		layerView.layerView.filter = null;
	});
	timeSliderExpand.watch('expanded', () => {
		if (!timeSliderExpand.expanded) {
			// @ts-ignore
			layerViews.forEach(layerView => {
				layerView.layerView.filter = null;
			});
		} else if (timeSlider.timeExtent) {
			layerViews.forEach(layerView => {
				applyTimeExtent(timeSlider.timeExtent, layerView.layerView, layerView.fieldName);
			});
		}
	});

	await whenNotOnce(view, 'updating');
}

export async function loadWellsView(wellsSceneLayer: SceneLayer, wellsSceneLayerView: SceneLayerView, view: SceneView) {
	const featureSearchInput = document.getElementById('featureSearch');
	// @ts-ignore
	featureSearchInput.onkeyup = (event: any) => {
		if (event.keyCode === 13) {
			const value = event.currentTarget.value;

			wellsSceneLayer
				.queryExtent({
					where: `WellsRanThroughDEM2_WRDID = ${parseInt(value, 10)}`,
				})
				.then((response: any) => {
					view.goTo({
						center: response.extent,
						tilt: 102,
						zoom: 17,
					}).then(() => highlightFeature(wellsSceneLayerView, view, value));
				});
		}
	};
}

async function highlightFeature(wellsSceneLayerView: SceneLayerView, view: SceneView, value: string) {
	if (highlight) {
		highlight.remove();
	}

	return whenNotOnce(wellsSceneLayerView, 'updating', updating => {
		wellsSceneLayerView
			.queryFeatures({
				where: `WellsRanThroughDEM2_WRDID = ${parseInt(value, 10)}`,
			})
			.then(response => {
				highlight = wellsSceneLayerView.highlight(response.features);
			});
	});
}
