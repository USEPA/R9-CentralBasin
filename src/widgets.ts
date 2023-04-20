import { config, map, mapProperties } from './data/app';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Slider from "@arcgis/core/widgets/Slider";
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import { info } from './data/app';
import ButtonMenuItem from '@arcgis/core/widgets/FeatureTable/Grid/support/ButtonMenuItem';
import Graphic from '@arcgis/core/Graphic';
// Filter widget/render given chemical
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer";
import { chemicalLayer, allWells, displayedAnalyte, changeTableTab, view } from '.';
import "@esri/calcite-components";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TopFeaturesQuery from "@arcgis/core/rest/support/TopFeaturesQuery";
import TopFilter from "@arcgis/core/rest/support/TopFilter";
import { AnalyteFields, AnalyteTemplate } from './config.dev';


let appContainer: HTMLElement | null;
let tableContainer: HTMLElement | null;
let basemapDiv = document.getElementById("basemapGalleryDiv")?.parentElement;
let addedLayers: string[] = [];
let selectedItem: string = "";
let needsAlert = false;
let chemicalNames: string[] = [];
let units: string;
let ready: boolean = true;

// Check if query layer is ready before starting a new one
async function checkReady() {
	if (ready === false) {
		window.setTimeout(checkReady, 100);
	} else {
		ready = false;
		await removeQueryLayer();
		await selectAnalyte();
	}
}

// Get reference to div elements
let labelText: HTMLElement | null;

// Selected analyte data for layer list and feature table
export let displayedAnalyteTitle = "Displayed Analyte";
let queryData = {
	parentTitle: "Displayed Analyte",
	title2D: "",
	title3D: "All GAMA Wells",
	label: `Max GM_RESULT`,
	layerVar: "Query Result",
	fields: AnalyteFields,
	dateField: "GM_SAMP_COLLECTION_DATE",
	template: AnalyteTemplate,
};

export const initWidgets = (view: SceneView) => {
	const homeButton = new Home({ view });

	const searchWidget = new Search({
		view: view,
	});

	const basemapGallery = new BasemapGallery({
		view: view,
		container: 'basemapGalleryDiv',
		// @ts-ignore
		source: {
			portal: info.portalUrl,
			updateBasemapsCallback: (items) => {
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

	const opacSlider = new Slider({
		container: 'opacitySliderDiv',
		label: 'Ground transparency',
		min: 0,
		max: 1,
		layout: "horizontal-reversed",
		values: [map.ground.opacity],
		steps: 0.01,
		snapOnClickEnabled: true,
		visibleElements: {
			labels: false,
			rangeLabels: false
		}
	})

	opacSlider.tickConfigs = [{
		mode: "percent",
		values: [0, 25, 50, 75, 100],
		labelsVisible: true,
		tickCreatedFunction: function (initialValue, tickElement, labelElement) {
			tickElement.classList.add("sliderQuarterTicks");
			labelElement?.classList.add("sliderQuarterLabels");

			let sliderLabels = document.getElementsByClassName("sliderQuarterLabels");
			for (let i = 0; i < sliderLabels.length; i++) {
				switch (sliderLabels[i].innerHTML) {
					case "1":
						sliderLabels[i].innerHTML = "0";
						break;
					case "0.75":
						sliderLabels[i].innerHTML = "25";
						break;
					case "0.5":
						sliderLabels[i].innerHTML = "50";
						break;
					case "0.25":
						sliderLabels[i].innerHTML = "75";
						break;
					case "0":
						sliderLabels[i].innerHTML = "100";
						break;

					default:
						break;
				}
			}

			// @ts-ignore
			labelElement.onclick = function () {
				// @ts-ignore
				const newValue = labelElement["data-value"];
				opacSlider.values = [newValue];
				// @ts-ignore
				map.ground.opacity = [newValue];
			};

			// @ts-ignore
			tickElement.onclick = function () {
				// @ts-ignore
				const newValue = tickElement["data-value"];
				opacSlider.values = [newValue];
				// @ts-ignore
				map.ground.opacity = [newValue];
			};
		}
	}, {
		mode: "percent",
		values: [5, 10, 15, 20, 30, 35, 40, 45, 55, 60, 65, 70, 80, 85, 90, 95],
		labelsVisible: false,
		tickCreatedFunction: function (initialValue, tickElement, labelElement) {
			tickElement.classList.add("sliderSmallTicks");
			labelElement?.classList.add("sliderSmallLabels");

			// @ts-ignore
			tickElement.onclick = function () {
				// @ts-ignore
				const newValue = tickElement["data-value"];
				opacSlider.values = [newValue];
				// @ts-ignore
				map.ground.opacity = [newValue];
			};
		}
	}
	];

	// @ts-ignore
	opacSlider.on(['thumb-change', 'thumb-drag'], function (event) {
		map.ground.opacity = event.value;
	})

	const lineMeasurement = new DirectLineMeasurement3D({
		view: view,
	});

	const areaMeasurement = new AreaMeasurement3D({
		view: view,
	});

	const slice = new Slice({
		view: view,
	});

	const llDiv: any = document.getElementById('layerLegendDiv');
	const layersContentDiv: any = document.getElementById('layers-content');
	const legendContentDiv: any = document.getElementById('legend-content');

	const layersBtn: any = document.getElementById('layers-button');
	const legendBtn: any = document.getElementById('legend-button');

	layersBtn.onclick = () => changeTab('layers');
	legendBtn.onclick = () => changeTab('legend');

	const changeTab = (clicked: string) => {
		if (clicked === 'layers') {
			legendBtn.classList.remove('active-button');
			legendContentDiv.classList.remove('active-content');
			layersBtn.classList.add('active-button');
			layersContentDiv.classList.add('active-content');
		} else {
			legendBtn.classList.add('active-button');
			legendContentDiv.classList.add('active-content');
			layersBtn.classList.remove('active-button');
			layersContentDiv.classList.remove('active-content');
		}
	};

	const layerList = new LayerList({
		view,
		container: layersContentDiv,
	});

	const legend = new Legend({
		view,
		container: legendContentDiv,
	});

	const llExpand = new Expand({
		view,
		content: llDiv,
		expandIconClass: 'esri-icon-layers',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Legend and Layer List',
		expanded: true,
	});

	const overmapDiv: any = document.getElementById('overmapDiv');

	const overmapExpand = new Expand({
		view: view,
		content: overmapDiv,
		expandIconClass: 'esri-icon-maps',
		autoCollapse: false,
		group: 'bottom-right',
		expandTooltip: 'Overview Map',
		expanded: false,
	});

	// Filter widget added to expand, query feature layer for unique chemicals and add them
	// to calcite combobox. Selecting a combobox item applies definition expression to
	// the layer to show only that chemical
	const filtersDiv: any = document.getElementById('filtersDiv');
	const combobox = document.getElementById('combobox') as HTMLCalciteComboboxElement;

	const queryParams = chemicalLayer.createQuery();
	queryParams.outFields = ["GM_CHEMICAL_NAME"];
	queryParams.returnDistinctValues = true;
	chemicalLayer.queryFeatures(queryParams).then(function (results) {

		results.features.forEach(i => {
			if (!chemicalNames.includes(i.attributes["GM_CHEMICAL_NAME"])) {
				chemicalNames.push(i.attributes["GM_CHEMICAL_NAME"]);
				const comboItem = document.createElement('calcite-combobox-item');
				comboItem.setAttribute('value', i.attributes["GM_CHEMICAL_NAME"]);
				comboItem.setAttribute('text-label', i.attributes["GM_CHEMICAL_NAME"]);
				combobox.appendChild(comboItem);
			}
		});

	})

	combobox.addEventListener("calciteComboboxChange", async calciteComboboxChangeEvt => {
		// @ts-ignore
		selectedItem = calciteComboboxChangeEvt.target.value;
		if (selectedItem == "Show all") {
			// Hide chemical layer instead, show all wells
			displayedAnalyte.visible = true;
			await removeQueryLayer();
			allWells.visible = true;
			initTableWidget(view, [chemicalLayer], [chemicalLayer]);
		} else {
			checkReady();
		}
	});

	const filterExpand = new Expand({
		view,
		content: filtersDiv,
		expandIconClass: 'esri-icon-filter',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Display an analyte',
	})

	const basemapExpand = new Expand({
		view,
		// @ts-ignore
		content: basemapDiv,
		expandIconClass: 'esri-icon-basemap',
		autoCollapse: true,
		group: 'top-left',
		expandTooltip: 'Basemaps',
	});

	basemapExpand.watch('expanded', () => {
		opacSlider.values = [map.ground.opacity];
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

	// api is not recognizing .clear() method
	lineMeasurementExpand.watch('expanded', () => {
		if (!lineMeasurementExpand.expanded) {
			lineMeasurement.set({ visible: false });
		} else {
			lineMeasurement.set({ visible: true });
		}
	});

	areaMeasurementExpand.watch('expanded', () => {
		if (!areaMeasurementExpand.expanded) {
			areaMeasurement.set({ visible: false });
		} else {
			areaMeasurement.set({ visible: true });
		}
	});

	const sliceExpand = new Expand({
		view,
		content: slice,
		expandIconClass: 'esri-icon-cursor-marquee',
		group: 'top-left',
		autoCollapse: false,
		expandTooltip: 'Slice',
	});

	sliceExpand.viewModel.watch('expanded', (value) => {
		// console.log(value);
		if (!value) {
			slice.viewModel.clear();
		}
	});

	// Add widget to the bottom left corner of the view
	const featureSearch = document.getElementById('featureSearchDiv');

	view.ui.add(overmapExpand, 'bottom-right');
	// @ts-ignore
	view.ui.add(featureSearch, 'top-right', 0);
	view.ui.add(searchWidget, 'top-right');

	view.ui.add(llExpand, 'top-right');
	view.ui.add(filterExpand, 'top-right');

	view.ui.add(homeButton, 'top-left');
	view.ui.add(basemapExpand, 'top-left');

	view.ui.add(lineMeasurementExpand, 'top-left');
	view.ui.add(areaMeasurementExpand, 'top-left');
	view.ui.add(sliceExpand, 'top-left');

	return view;
};

// Creates a class break renderer, provide an array of 6 numbers for break values
function createRenderer(values: number[], name: string) {
	let renderer = new ClassBreaksRenderer({
		field: "GM_RESULT",
		legendOptions: {
			title: `GM Result Values for ${name} (${units})`
		},
		visualVariables: [
			{
				// @ts-ignore
				type: "size",
				axis: "height",
				field: "GM_BOTTOM_DEPTH_OF_SCREEN_FT",
				useSymbolValues: true,
				valueUnit: "feet",
				minSize: 5
			},
			{
				// @ts-ignore
				type: "size",
				axis: "width-and-depth",
				valueRepresentation: "diameter",
				useSymbolValues: true,
				minSize: 5,
				valueUnit: "feet"
			}
		]
	});
	// All features with values between min and Legend1
	renderer.addClassBreakInfo({
		label: `${values[0]} - ${values[1]}`,
		minValue: values[0],
		maxValue: values[1],
		symbol: {
			type: "point-3d",  // autocasts as new PointSymbol3D()
			symbolLayers: [
				{
					type: "icon",
					size: 5,
					resource: { primitive: "circle" },
					material: { color: [198, 247, 214] }
				},
				{
					type: "object",  // autocasts as new ObjectSymbol3DLayer()
					resource: { primitive: "cylinder" },
					material: { color: [198, 247, 214] },
					tilt: 180
				}]
		}
	});
	// All features with values between Legend1 and Legend2
	renderer.addClassBreakInfo({
		label: `${values[1]} - ${values[2]}`,
		minValue: values[1],
		maxValue: values[2],
		symbol: {
			type: "point-3d",  // autocasts as new PointSymbol3D()
			symbolLayers: [
				{
					type: "icon",
					size: 5,
					resource: { primitive: "circle" },
					material: { color: [187, 228, 83] }
				},
				{
					type: "object",  // autocasts as new ObjectSymbol3DLayer()
					resource: { primitive: "cylinder" },
					material: { color: [187, 228, 83] },
					tilt: 180
				}]
		}
	});
	// All features with values between Legend2 and Legend3
	renderer.addClassBreakInfo({
		label: `${values[2]} - ${values[3]}`,
		minValue: values[2],
		maxValue: values[3],
		symbol: {
			type: "point-3d",  // autocasts as new PointSymbol3D()
			symbolLayers: [
				{
					type: "icon",
					size: 5,
					resource: { primitive: "circle" },
					material: { color: [231, 181, 3] }
				},
				{
					type: "object",  // autocasts as new ObjectSymbol3DLayer()
					resource: { primitive: "cylinder" },
					material: { color: [231, 181, 3] },
					tilt: 180
				}]
		}
	});
	// All features with values between Legend3 and Legend4
	renderer.addClassBreakInfo({
		label: `${values[3]} - ${values[4]}`,
		minValue: values[3],
		maxValue: values[4],
		symbol: {
			type: "point-3d",  // autocasts as new PointSymbol3D()
			symbolLayers: [
				{
					type: "icon",
					size: 5,
					resource: { primitive: "circle" },
					material: { color: [246, 121, 11] }
				},
				{
					type: "object",  // autocasts as new ObjectSymbol3DLayer()
					resource: { primitive: "cylinder" },
					material: { color: [246, 121, 11] },
					tilt: 180
				}]
		}
	});
	// All features with values between Legend4 and the max
	renderer.addClassBreakInfo({
		label: `${values[4]} - ${values[5]}`,
		minValue: values[4],
		maxValue: values[5],
		symbol: {
			type: "point-3d",  // autocasts as new PointSymbol3D()
			symbolLayers: [
				{
					type: "icon",
					size: 5,
					resource: { primitive: "circle" },
					material: { color: [228, 5, 21] }
				},
				{
					type: "object",  // autocasts as new ObjectSymbol3DLayer()
					resource: { primitive: "cylinder" },
					material: { color: [228, 5, 21] },
					tilt: 180
				}]
		}
	});
	return renderer;
}

const LegendTable = new FeatureLayer({
	url: "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ChemList_Voted4/FeatureServer",
	outFields: ["from_Gama_lookup", "Legend1", "Legend2", "Legend3", "Legend4"],
	listMode: "hide",
})

// Returns legend values for selected analyte from ChemList_Voted4 table
async function getLegendValues(chemName: String) {
	LegendTable.definitionExpression = `from_Gama_lookup = '${chemName}'`;
	const queryParams = LegendTable.createQuery();
	queryParams.outFields = ["Legend1", "Legend2", "Legend3", "Legend4"];
	// @ts-ignore
	let legendVals: number[] = await LegendTable.queryFeatures(queryParams).then(async function (results) {
		let features = results.features;
		let data = features.map(feature => feature.attributes);
		let vals;
		let max: number = await getValue("max", chemicalLayer, "GM_RESULT");
		let min: number = await getValue("min", chemicalLayer, "GM_RESULT");
		let avg: number = await getValue("avg", chemicalLayer, "GM_RESULT");
		try {
			// Map legend values to array, or 0's if null
			vals = Object.values(data[0]).map(i => i === null ? 0 : i);
			needsAlert = false;

			// If legend values are not present, generate values based on field stats
			if (vals.every(item => item === 0)) {
				// Create steps for generated legend values, round to 2 decimal places
				let step = +(avg / 4).toFixed(2) / 5;
				vals = [+(step).toFixed(2), +(step * 2).toFixed(2), +(step * 3).toFixed(2), +(step * 4).toFixed(2)];
				needsAlert = true;
			}
		} catch (error) {
			// If analyte is not in legend table, generate values based on field stats
			// Create steps for generated legend values, round to 2 decimal places
			let step = +(avg / 4).toFixed(2) / 5;
			vals = [+(step).toFixed(2), +(step * 2).toFixed(2), +(step * 3).toFixed(2), +(step * 4).toFixed(2)];
			needsAlert = true;
		}
		// Add max value to end of array
		vals.push(max);

		// Add min value to start of array
		vals.unshift(min);

		return vals;
	});
	return legendVals;
}

// Returns a stat (min, max, avg) given a stat, layer, and field to query
async function getValue(stat: String, layer: FeatureLayer, field: String): Promise<number> {
	let val = {
		onStatisticField: field,
		outStatisticFieldName: field,
		statisticType: stat
	}
	let query = layer.createQuery();
	// @ts-ignore
	query.outStatistics = [val];
	let response = await layer.queryFeatures(query).then(function (response) {
		let stats = response.features[0].attributes;
		return stats;
	});
	return Object.values(response)[0] as number;
}

async function selectAnalyte() {
	chemicalLayer.definitionExpression = `GM_CHEMICAL_NAME = '${selectedItem}'`;
	// @ts-ignore
	document.getElementById('lds-roller2').style.visibility = 'visible';
	let visLayer = await queryMax();
	getLegendValues(selectedItem).then(result => {
		// Once legend values are ready use them for renderer
		chemicalLayer.title = `All GAMA Wells Containing ${selectedItem}`;
		displayedAnalyteTitle = chemicalLayer.title;
		displayedAnalyte.visible = true;
		displayedAnalyte.add(visLayer);
		allWells.visible = true;
		visLayer.title = `GAMA Wells Containing ${selectedItem}`;
		visLayer.popupTemplate = AnalyteTemplate;

		queryData.title2D = `GAMA Wells Containing ${selectedItem}`;
		queryData.layer2D = visLayer;
		queryData.fields = AnalyteFields;
		queryData.template = AnalyteTemplate;
		queryData.sceneView = view;
		queryData.tableDiv = document.createElement('DIV') as HTMLElement;
		queryData?.tableDiv?.classList.add('tab-content');
		queryData.tab = document.createElement('BUTTON');
		queryData.tab.classList.add('calcite-tab', 'wells2d', 'esri-widget--button');
		queryData.tab.innerHTML = queryData.label;
		document.getElementById('tableTabs')?.appendChild(queryData.tab);
		document.getElementById('tableDivs')?.appendChild(queryData.tableDiv);
		queryData.tab.onclick = () => changeTableTab(queryData);
		changeTableTab(queryData);
		config.tableLayers.layers.push(queryData);

		visLayer.renderer = createRenderer(result, selectedItem);
		visLayer.load();
		// @ts-ignore
		document.getElementById('lds-roller2').style.visibility = 'hidden';
		// Refresh table widget for new selected analyte
		initTableWidget(view, [queryData], [view]);
		createValueAlert();

		ready = true;
	});

}

// Remove feature table and related tab, remove old query layer.
async function removeQueryLayer() {
	if (queryData.tab) {
		changeTableTab(config.tableLayers.layers[1]);
		queryData.tab.remove();
		queryData.tableDiv.remove();
	}

	if (addedLayers.length > 0) {
		displayedAnalyte.remove(map.findLayerById(addedLayers[0]));
		addedLayers.pop();
	}

}

// Queries for top GM_RESULT for selected analyte, using time extent, returns new layer
async function queryMax() {
	const query = new TopFeaturesQuery({
		outFields: ["GM_RESULT", "GM_BOTTOM_DEPTH_OF_SCREEN_FT", "GM_WELL_ID", "GM_RESULT_UNITS", "GM_WELL_CATEGORY", "GM_SAMP_COLLECTION_DATE", "GM_CHEMICAL_NAME"],
		timeExtent: timeSlider.timeExtent,
		returnGeometry: true,
		returnZ: true,
		where: `GM_CHEMICAL_NAME = '${selectedItem}'`,
		outSpatialReference: chemicalLayer.spatialReference,
		topFilter: new TopFilter({
			topCount: 1,
			groupByFields: ["GM_WELL_ID"],
			orderByFields: ["GM_RESULT DESC"]
		})
	});
	let result = await chemicalLayer.queryTopFeatures(query);

	units = result.features[0].getAttribute("GM_RESULT_UNITS");

	let layer = new FeatureLayer({
		source: result.features,
		fields: chemicalLayer.fields,
		geometryType: "point",
		objectIdField: "OBJECTID",
		spatialReference: chemicalLayer.spatialReference,
		elevationInfo: {
			mode: "on-the-ground"
		}
	});

	addedLayers.push(layer.id);

	return layer;
}

// Shows calcite alert if needed (analyte without legend values)
function createValueAlert() {
	if (needsAlert) {
		let alert = document.getElementById("valueAlert");
		alert?.setAttribute("open", "true");
	}
}

export const initFeatureTable = (view: SceneView) => {
	// Get references to div elements for toggling table visibility
	appContainer = document.getElementById('appContainer');
	tableContainer = document.getElementById('tableContainer');
	// const tableDiv = document.getElementById('tableDiv');

	// Get reference to div elements
	const checkboxEle = document.getElementById('checkboxId');
	labelText = document.getElementById('labelText');

	// Listen for when toggle is changed, call toggleFeatureTable function
	// @ts-ignore
	checkboxEle.onchange = (e) => {
		toggleFeatureTable(e.target as HTMLElement);
	};
};
export const toggleFeatureTable = (checkboxEle: HTMLElement) => {
	// Check if the table is displayed, if so, toggle off. If not, display.
	// @ts-ignore
	if (!checkboxEle.checked) {
		// @ts-ignore
		// appContainer.removeChild(tableContainer);
		tableContainer.style.display = "none";
		// @ts-ignore
		labelText.innerHTML = 'Show Feature Table';
	} else {
		// @ts-ignore
		appContainer.appendChild(tableContainer);
		// @ts-ignore
		labelText.innerHTML = 'Hide Feature Table';
		// @ts-ignore
		tableContainer.style.display = 'flex';
	}
};

const timeInterval = new TimeInterval({ value: 1, unit: 'months' });
const timeSlider = new TimeSlider({
	container: 'timeSlider',
	view: view,
	mode: 'time-window',
	fullTimeExtent: {
		start: new Date(1984, 0, 23),
		end: new Date(2022, 3, 15),
	},
	// Set default time extent to full extent
	timeExtent: {
		start: new Date(1984, 0, 23),
		end: new Date(2022, 3, 15),
	},
	stops: {
		interval: timeInterval,
	},
});

// Use watch for time extent change, using short timeout to wait for user to
// likely be done changing time extent. Await the removal of old query layer for
// selected analyte to avoid duplicate layers.
let timeTimeout: any;
timeSlider.watch("timeExtent", async () => {
	clearTimeout(timeTimeout);
	timeTimeout = setTimeout(async function () {
		if (chemicalNames.includes(selectedItem)) {
			checkReady();
		}
	}, 2000)
});

export const initTimeSlider = (view: SceneView) => {
	const timeSliderExpand = new Expand({
		view,
		content: timeSlider.container,
		expandIconClass: 'esri-icon-time-clock',
		expandTooltip: 'Time Slider',
	});

	view.ui.add(timeSliderExpand, 'bottom-left');
	return { timeSlider, timeSliderExpand };
};

export const initSlidesWidget = (view: SceneView) => {
	const slidesDiv: any = document.getElementById('slidesDiv');
	// @ts-ignore
	const slides = view.map.presentation.slides;
	slides.forEach((slide: any, placement: number) => {
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

		slideElement.addEventListener('click', () => {
			const slides = document.querySelectorAll('.slide');
			Array.from(slides).forEach((node) => {
				node.classList.remove('active-slide');
			});
			slideElement.classList.add('active-slide');
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
};

export const initTableWidget = (view: SceneView, layersInfo: any[], layerViews: any[]) => {
	// create table for each layer in config
	layersInfo.forEach((layerInfo, layerIndex) => {
		const layerView = layerViews[layerIndex];
		const zoomMenuItem = new ButtonMenuItem({
			label: 'Zoom to feature(s)',
			iconClass: 'esri-icon-zoom-in-magnifying-glass',
			clickFunction: (evt) => {
				// console.log(evt);
				zoomToSelectedFeature();
			},
		});
		// Create FeatureTable
		const featureTable = new FeatureTable({
			view: view, // make sure to pass in view in order for selection to work
			layer: layerInfo.layer2D,
			fieldConfigs: layerInfo.fields,
			// @ts-ignore
			container: layerInfo.tableDiv,
			highlightOnRowSelectEnabled: true,
			visibleElements: {
				header: true,
				menu: true,
				menuItems: {
					clearSelection: true,
					refreshData: false,
					toggleColumns: true,
				},
			},
			menuConfig: {
				items: [zoomMenuItem],
			},
		});

		let features3D: Graphic[] = [];
		let highlight: any;

		featureTable.on('selection-change', (changes) => {
			// remove highlight
			if (highlight) {
				highlight.remove();
			}

			// If row is unselected in table, remove it from the features array
			changes.removed.forEach((item) => {
				features3D = features3D.filter((feature) => {
					return feature !== item.feature;
				});
			});

			// If a row is selected, add to the features array
			changes.added.forEach((item) => {
				features3D.push(item.feature);
			});

			// highlight selected features
			if (features3D.length > 0) {
				highlight = layerInfo.sceneView.highlight(features3D);
			}
		});

		const zoomToSelectedFeature = () => {
			view.goTo(features3D).catch((error) => {
				if (error.name != 'AbortError') {
					console.error(error);
				}
			});
		};
	});
};
