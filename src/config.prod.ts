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

const AnalyteFields = [
	{
		name: 'GM_WELL_ID',
		label: 'WELL_ID',
		direction: 'asc',
	},
	{
		name: 'GM_WELL_CATEGORY',
		label: 'WELL_TYPE',
	},
	{
		name: 'GM_CHEMICAL_NAME',
		label: 'CHEMICAL',
	},
	{
		name: 'GM_SAMP_COLLECTION_DATE',
		label: 'Date',
	},
	{
		name: 'GM_RESULT',
		label: 'Results',
	},
	{
		name: 'GM_RESULT_UNITS',
		label: 'UNITS',
	},
	{
		name: 'GM_BOTTOM_DEPTH_OF_SCREEN_FT',
		label: 'WELL DEPTH (FT)',
	},
];

const wellsTemplate = {
	title: 'WRD ID No. {WellsRanThroughDEM2_WRDID}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
				{
					fieldName: 'WellsRanThroughDEM2_Type',
					label: 'Type',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Common_Nam',
					label: 'Common Name',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Status',
					label: 'Well Status',
				},
				{
					fieldName: 'WellsRanThroughDEM2_WRDID',
					label: 'WRD ID No.',
				},
				{
					fieldName: 'WellsRanThroughDEM2_STATE_SOUR',
					label: 'State Well No.',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Agency_Lon',
					label: 'Purveyor',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Owner_No',
					label: 'Purveyor Well No.',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Constr_YYY',
					label: 'Construction Year',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Destr_YYYY',
					label: 'Destruction Year',
				},
				{
					fieldName: 'PerfsAndAquifersSummary_Max_INT',
					label: 'No. of Perforations',
				},
				{
					fieldName: 'PerfsAndAquifersSummary_Min_TOI',
					label: 'Top of Perforation',
				},
				{
					fieldName: 'PerfsAndAquifersSummary_Max_BOI',
					label: 'Bottom of Perforation',
				},
				{
					fieldName: 'WellsRanThroughDEM2_SN_LONG',
					label: 'DWR Well No.',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Log_Avail',
					label: 'Well Log Available',
				},
				{
					fieldName: 'WellsRanThroughDEM2_City',
					label: 'City',
				},
				{
					fieldName: 'WellsRanThroughDEM2_Basin',
					label: 'Basin',
				},
			],
		},
	],
};

const AnalyteTemplate = {
	title: '{GM_CHEMICAL_NAME}',
	content: [
		{
			type: 'fields',
			fieldInfos: [
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
					label: 'Date',
				},
				{
					fieldName: 'GM_BOTTOM_DEPTH_OF_SCREEN_FT',
					label: 'WELL DEPTH (FT)',
				},
			],
		},
	],
};

export const configProd = {
	appTitle: 'Central Basin Map v2.0 beta',
	portalEnv: {
		appId: 'RjgBsWrJbfY8hMGY',
		portalUrl: 'https://epa.maps.arcgis.com',
		blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
		// webScene: 'dd983ac69154460fb75f5ce193b5344d',
		webScene: '9b7acd242d6d4ab99f2ee4880422c6a3',
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
