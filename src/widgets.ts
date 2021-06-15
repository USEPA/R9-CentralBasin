import { mapProperties } from './data/app';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
// Widgets
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import TimeInterval from '@arcgis/core/TimeInterval';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import Expand from '@arcgis/core/widgets/Expand';
import Home from '@arcgis/core/widgets/Home';
import SceneView from '@arcgis/core/views/SceneView';
import Slice from '@arcgis/core/widgets/Slice';
import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D';
import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Search from '@arcgis/core/widgets/Search';
import WebScene from '@arcgis/core/WebScene';
import Basemap from '@arcgis/core/Basemap';
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import { info } from './data/app';
import { watch } from '@arcgis/core/core/watchUtils';
import ButtonMenuItem from '@arcgis/core/widgets/FeatureTable/Grid/support/ButtonMenuItem';

import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';

export function initWidgets(view: SceneView) {
	const legend = new Legend({ view });

	const homeButton = new Home({ view });

	const layerList = new LayerList({
		view,
		listItemCreatedFunction: function (event: any) {
			const item = event.item;
			if (item.layer.type !== 'group') {
				// don't show legend twice
				item.panel = {
					content: 'legend',
					open: false,
				};
			}
		},
	});

	const searchWidget = new Search({
		view: view,
	});

	const basemapGallery = new BasemapGallery({
		view: view,
		// @ts-ignore
		source: {
			portal: info.portalUrl,
			updateBasemapsCallback: function (items) {
				// create custom basemap to be added to the array of portal basemaps
				const bm = new Basemap({
					portalItem: {
						id: mapProperties.blankBasemapId,
					},
				});
				// add basemap to the array
				items.unshift(bm);
				// return the array of basemaps
				return items;
			},
		},
	});

	const lineMeasurement = new DirectLineMeasurement3D({
		view: view,
	});

	const areaMeasurement = new AreaMeasurement3D({
		view: view,
	});

	const slice = new Slice({
		view: view,
	});

	const basemapExpand = new Expand({
		view,
		content: basemapGallery,
		expandIconClass: 'esri-icon-basemap',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Basemaps',
	});

	const lineMeasurementExpand = new Expand({
		view,
		content: lineMeasurement,
		expandIconClass: 'esri-icon-measure-line',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Distance Measurement',
	});

	const areaMeasurementExpand = new Expand({
		view,
		content: areaMeasurement,
		expandIconClass: 'esri-icon-measure-area',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Area Measurement',
	});

	const sliceExpand = new Expand({
		view,
		content: slice,
		expandIconClass: 'esri-icon-cursor-marquee',
		group: 'top-left',
		autoCollapse: false,
		expandTooltip: 'Slice',
	});

	sliceExpand.viewModel.watch('expanded', function (value) {
		// console.log(value);
		if (!value) {
			slice.viewModel.clear();
		}
	});

	// Add widget to the bottom left corner of the view
	// view.ui.add(legend, 'bottom-left');
	view.ui.add(layerList, 'top-right');

	view.ui.add(homeButton, 'top-left');
	view.ui.add(basemapExpand, 'top-left');

	view.ui.add(lineMeasurementExpand, 'top-left');
	view.ui.add(areaMeasurementExpand, 'top-left');
	view.ui.add(sliceExpand, 'top-left');

	const featureSearch = document.getElementById('featureSearchDiv');
	// @ts-ignore
	view.ui.add(featureSearch, 'top-right', 0);
	view.ui.add(searchWidget, 'top-right');

	// Get references to div elements for toggling table visibility
	const appContainer = document.getElementById('appContainer');
	const tableContainer = document.getElementById('tableContainer');
	// const tableDiv = document.getElementById('tableDiv');

	// Get reference to div elements
	const checkboxEle = document.getElementById('checkboxId');
	const labelText = document.getElementById('labelText');

	// Listen for when toggle is changed, call toggleFeatureTable function
	// @ts-ignore
	checkboxEle.onchange = function () {
		toggleFeatureTable();
	};

	function toggleFeatureTable() {
		// Check if the table is displayed, if so, toggle off. If not, display.
		// @ts-ignore
		if (!checkboxEle.checked) {
			// @ts-ignore
			appContainer.removeChild(tableContainer);
			// @ts-ignore
			labelText.innerHTML = 'Show Feature Table';
		} else {
			// @ts-ignore
			appContainer.appendChild(tableContainer);
			// @ts-ignore
			labelText.innerHTML = 'Hide Feature Table';
			tableContainer.style.display = 'flex';
		}
	}

	return view;
}

export function initTimeSlider(view: SceneView) {
	const timeInterval = new TimeInterval({ value: 1, unit: 'months' });
	const timeSlider = new TimeSlider({
		container: 'timeSlider',
		view,
		mode: 'time-window',
		fullTimeExtent: {
			start: new Date(1984, 0, 23),
			end: new Date(2021, 0, 6),
		},
		stops: {
			interval: timeInterval,
		},
	});
	const timeSliderExpand = new Expand({
		view,
		content: timeSlider.container,
		expandIconClass: 'esri-icon-time-clock',
		expandTooltip: 'Time Slider',
	});

	view.ui.add(timeSliderExpand, 'bottom-left');
	return { timeSlider, timeSliderExpand };
}

export function initSlidesWidget(view: SceneView) {
	const slidesDiv: any = document.getElementById('slidesDiv');
	// @ts-ignore
	const slides = view.map.presentation.slides;
	slides.forEach(function (slide: any, placement: number) {
		const slideElement = document.createElement('div');
		slideElement.id = slide.id;
		slideElement.classList.add('slide');

		slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
		slidesDiv.appendChild(slideElement);

		const title = document.createElement('div');
		title.innerText = slide.title.text;
		title.classList.add('title');
		slideElement.appendChild(title);

		const img = new Image();
		img.src = slide.thumbnail.url;
		img.title = slide.title.text;
		slideElement.appendChild(img);

		slideElement.addEventListener('click', function () {
			const slides = document.querySelectorAll('.slide');
			Array.from(slides).forEach(function (node) {
				node.classList.remove('active');
			});
			slideElement.classList.add('active');
			slide.applyTo(view);
		});
	});
	const slidesExpand = new Expand({
		view,
		content: slidesDiv,
		expandIconClass: 'esri-icon-collection',
		group: 'top-left',
		expandTooltip: 'Slides',
	});
	view.ui.add(slidesExpand, 'top-left');
}

export function initTableWidget(view: SceneView, layersInfo: any[]) {
	// Get references to div elements for toggling table visibility
	// const appContainer = document.getElementById("appContainer");
	// const tableContainer = document.getElementById("tableContainer");
	layersInfo.forEach((layerInfo) => {
		const tableDiv = layerInfo.div;

		// tableDiv.onclick = function (evt) {
		// 	console.log(evt);
		// };

		let fields: (
			| { name: string; label: string; direction: string }
			| { name: string; label: string; direction?: undefined }
		)[] = [];

		if (layerInfo.layer.title === 'All Wells - Gray V3') {
			fields = [
				{
					name: 'WellsRanThroughDEM2_WRDID',
					label: 'WRDID',
					direction: 'asc',
				},
				{
					name: 'WellsRanThroughDEM2_DPW_ID',
					label: 'DPW ID',
				},
				// {
				// 	name: 'WellsRanThroughDEM2_Common_Nam ',
				// 	label: 'Common_Nam',
				// },
				{
					name: 'WellsRanThroughDEM2_Owner_No',
					label: 'Owner No',
				},
				{
					name: 'WellsRanThroughDEM2_Type',
					label: 'Type',
				},
			];
		} else if (layerInfo.layer.title === 'GAMA TCE 2D') {
			fields = [
				{
					name: 'Well ID',
					label: 'WELL_ID',
					direction: 'asc',
				},
				{
					name: 'RESULTS',
					label: 'Results',
				},
				{
					name: 'DATE',
					label: 'Date',
				},
				{
					name: 'TOP_OF_SCREEN__FT_',
					label: 'Top of Screen (ft)',
				},
				{
					name: 'SCREEN_LENGTH__FT_',
					label: 'Screen Length (ft)',
				},
				{
					name: 'SOURCE_NAME',
					label: 'Source Name',
				},
				{
					name: 'OTHER_NAMES',
					label: 'Other Names',
				},
			];
		} else if (layerInfo.layer.title === 'GAMA PCE 2D') {
			fields = [
				{
					name: 'Well ID',
					label: 'WELL_ID',
					direction: 'asc',
				},
				{
					name: 'RESULTS',
					label: 'Results',
				},
				{
					name: 'DATE',
					label: 'Date',
				},
				{
					name: 'TOP_OF_SCREEN__FT_',
					label: 'Top of Screen (ft)',
				},
				{
					name: 'SCREEN_LENGTH__FT_',
					label: 'Screen Length (ft)',
				},
				{
					name: 'SOURCE_NAME',
					label: 'Source Name',
				},
				{
					name: 'OTHER_NAMES',
					label: 'Other Names',
				},
			];
		} else if (layerInfo.layer.title === 'WRD PCE 2D') {
			fields = [
				{
					name: 'Well ID',
					label: 'WELL_ID',
					direction: 'asc',
				},
				{
					name: 'RESULTS',
					label: 'Results',
				},
				{
					name: 'DATE',
					label: 'Date',
				},
				{
					name: 'TOP_OF_SCREEN__FT_',
					label: 'Top of Screen (ft)',
				},
				{
					name: 'SCREEN_LENGTH__FT_',
					label: 'Screen Length (ft)',
				},
				{
					name: 'SOURCE_NAME',
					label: 'Source Name',
				},
				{
					name: 'OTHER_NAMES',
					label: 'Other Names',
				},
			];
		}

		const zoomMenuItem = new ButtonMenuItem({
			label: 'Zoom to feature(s)',
			iconClass: 'esri-icon-zoom-in-magnifying-glass',
			clickFunction: function (evt) {
				// console.log(evt);
				// debugger;
				zoomToSelectedFeature();
			},
		})
		// Create FeatureTable
		const featureTable = new FeatureTable({
			view: view, // make sure to pass in view in order for selection to work
			layer: layerInfo.layer,
			fieldConfigs: fields,
			// @ts-ignore
			container: tableDiv,
			highlightOnRowSelectEnabled: true,
			visibleElements: {
				header: true,
				menu: true,
				menuItems: {
					clearSelection: true,
					refreshData: false,
					toggleColumns: false,
				},
			},
			menuConfig: {
				items: [zoomMenuItem],
			},
		});

		const features: { feature: __esri.Graphic }[] = [];
		let selectedFeature: number | __esri.Graphic | (number | __esri.Graphic)[], id: any;
		const features3d: number[] = [];
		let selectedFeature3d, id3d: any;

		featureTable.on('selection-change', (changes) => {
			// If row is unselected in table, remove it from the features array
			changes.removed.forEach(function (item) {
				const data = features.find(function (data) {
					return data.feature === item.feature;
				});
				const data3d = features3d.find(function (data3d) {
					return data3d.feature === item.feature.attributes.OBJECTID;
				});
			});

			// If a row is selected, add to the features array
			changes.added.forEach(function (item) {
				// highlight 3d features
				features3d.push(item.feature.attributes.OBJECTID);
				layerInfo.layer3d.highlight(features3d);

				const feature = item.feature;
				features.push({
					feature: feature,
				});

				// Listen for row selection in the feature table. If the popup is open and a row is selected that is not the same feature as opened popup, close the existing popup.
				if (feature.attributes.OBJECTID !== id && view.popup.visible === true) {
					featureTable.deselectRows(selectedFeature);
					view.popup.close();
				}
			});
		});
		watch(view.popup.viewModel, 'active', (graphic) => {
			selectedFeature = view.popup.selectedFeature;
			if (selectedFeature !== null && view.popup.visible !== false) {
				featureTable.clearSelection();
				featureTable.selectRows(view.popup.selectedFeature);
				id = selectedFeature.getObjectId();
			}
		});

		function zoomToSelectedFeature() {
			// Create a query off of the feature layer
			const query = layerInfo.layer.createQuery();
			// Iterate through the features and grab the feature's objectID
			const featureIds = features.map((result) => {
				return result.feature.getAttribute(layerInfo.layer.objectIdField);
			});
			// Set the query's objectId
			query.objectIds = featureIds;
			// Make sure to return the geometry to zoom to
			query.returnGeometry = true;
			// Call queryFeatures on the feature layer and zoom to the resulting features
			layerInfo.layer.queryFeatures(query).then((results: { features: any; }) => {
				view.goTo(results.features).catch((error) => {
					if (error.name != 'AbortError') {
						console.error(error);
					}
				});
			});
		}
	});
}
