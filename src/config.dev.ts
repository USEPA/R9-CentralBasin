import { displayedAnalyteTitle } from "./widgets";

const wellsFields = [
	{
		name: 'WellsRanThroughDEM2_WRDID',
		label: 'WRDID',
		direction: 'asc',
	},
	{
		name: 'WellsRanThroughDEM2_STATE_SOUR',
		label: 'State Source',
	},
	{
		name: 'WellsRanThroughDEM2_Type',
		label: 'Type',
	},
	{
		name: 'WellsRanThroughDEM2_Agency_Lon',
		label: 'Agency_Lon',
	},
	{
		name: 'WellsRanThroughDEM2_Short_Lbl',
		label: 'Short_Lbl',
	},
	{
		name: 'WellsRanThroughDEM2_Status ',
		label: 'Status',
	},
	{
		name: 'WellsRanThroughDEM2_BOP',
		label: 'BOP',
	},
	{
		name: 'WellsRanThroughDEM2_Constr_YYY',
		label: 'Constr_YYY',
	},
	{
		name: 'WellsRanThroughDEM2_Destr_YYYY',
		label: 'Destr_YYYY',
	},
];

export const AnalyteTemplate = {
	title: '{GM_WELL_ID}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: "GM_WELL_ID",
					label: "Well ID"
				},
				{
					fieldName: 'GM_RESULT',
					label: 'Results',
				},
				{
					fieldName: 'GM_RESULT_UNITS',
					label: 'Result Units',
				},
				{
					fieldName: 'GM_WELL_CATEGORY',
					label: 'Well Category',
				},
				{
					fieldName: 'GM_SAMP_COLLECTION_DATE',
					label: 'Collection Date',
				},
				{
					fieldName: 'GM_BOTTOM_DEPTH_OF_SCREEN_FT',
					label: 'Well Depth (Feet)',
				},
			],
		},
	],
};

export const configDev = {
	appTitle: 'Central Basin Map - v2.0 beta',
	portalEnv: {
		appId: 'ZtlpDht9ywRCA4Iq',
		portalUrl: 'https://epa.maps.arcgis.com',
		blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',

		// webScene: 'c28d269394414b0cb55b2e3308816bb3',
		webScene: '9b7acd242d6d4ab99f2ee4880422c6a3', // 2.0

		elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
	},
	wells3D: {
		parentTitle: 'All Wells',
		title2D: 'All Wells 2D with Labels',
		title3D: 'All Wells 3D',
		layerVar: 'allWells',
	},
	tableLayers: {
		layers: [
			{
				parentTitle: 'All Wells',
				title2D: 'All Wells 2D with Labels',
				title3D: 'All Wells 3D',
				label: 'All Wells',
				layerVar: 'allWells',
				fields: wellsFields,
				template: wellsTemplate,
			},
			{
				parentTitle: "Displayed Analyte",
				title2D: displayedAnalyteTitle,
				title3D: "All GAMA Wells",
				label: displayedAnalyteTitle,
				layerVar: "Displayed Analyte",
				fields: AnalyteFields,
				dateField: "GM_SAMP_COLLECTION_DATE",
				template: AnalyteTemplate,
			},
		],
	},
};
