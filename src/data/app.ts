/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { configDev } from '../config.dev';
import { configProd } from '../config.prod';

import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import WebScene from '@arcgis/core/WebScene';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import SceneView from '@arcgis/core/views/SceneView';
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import moment from 'moment';
import { whenNotOnce } from '@arcgis/core/core/watchUtils';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import Expand from '@arcgis/core/widgets/Expand';
import TimeExtent from '@arcgis/core/TimeExtent';
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';

let highlight: any;
export let config: any;

if (process.env.NODE_ENV === 'production') {
	config = configProd;
} else {
	config = configDev;
}

const env: any = config.portalEnv;

export const info = new OAuthInfo({
	appId: env.appId,
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
});

export const elevLyr = new ElevationLayer({
	url: env.elevationUrl,
});

const applyTimeExtent = (timeExtent: TimeExtent, layerView: SceneLayerView, timeField: string) => {
	const start: string = moment(timeExtent.start).format('YYYY-MM-DD');
	const end: string = moment(timeExtent.end).format('YYYY-MM-DD');

	layerView.filter = new FeatureFilter({
		where: `${timeField} BETWEEN DATE '${start}' AND DATE '${end}'`,
	});
};

export const setupWellSlider = async (
	layersArr: any[],
	timeSlider: TimeSlider,
	timeSliderExpand: Expand,
	view: SceneView,
) => {
	timeSlider.watch('timeExtent', () => {
		if (timeSliderExpand.expanded) {
			layersArr.forEach((layerInfo) => {
				applyTimeExtent(timeSlider.timeExtent, layerInfo.sceneView, layerInfo.dateField);
			});
		}
	});

	layersArr.forEach((layerInfo) => {
		layerInfo.sceneView.filter = null;
	});
	timeSliderExpand.watch('expanded', () => {
		if (!timeSliderExpand.expanded) {
			// @ts-ignore
			layersArr.forEach((layerInfo) => {
				layerInfo.sceneView.filter = null;
			});
		} else if (timeSlider.timeExtent) {
			layersArr.forEach((layerInfo) => {
				applyTimeExtent(timeSlider.timeExtent, layerInfo.sceneView, layerInfo.dateField);
			});
		}
	});

	await whenNotOnce(view, 'updating');
};

export const loadWellsView = async (
	wellsSceneLayer: SceneLayer,
	wellsSceneLayerView: SceneLayerView,
	view: SceneView,
) => {
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
};

const highlightFeature = async (wellsSceneLayerView: SceneLayerView, view: SceneView, value: string) => {
	if (highlight) {
		highlight.remove();
	}
	return whenNotOnce(wellsSceneLayerView, 'updating', () => {
		wellsSceneLayerView
			.queryFeatures({
				where: `WellsRanThroughDEM2_WRDID = ${parseInt(value, 10)}`,
			})
			.then((response) => {
				highlight = wellsSceneLayerView.highlight(response.features);
			});
	});
};
