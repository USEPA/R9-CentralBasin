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

// const wrdFields = [
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_Wells',
// 		label: 'WRDID',
// 		direction: 'asc',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_Wel_9',
// 		label: 'State Source',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_Wel_5',
// 		label: 'Type',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_We_13',
// 		label: 'Agency_Lon',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_We_11',
// 		label: 'Short_Lbl',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_WRD_CB_We_15',
// 		label: 'Status',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_EPA_WQ_DDW_5',
// 		label: 'Constituen',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
// 		label: 'Sample_Dat',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_EPA_WQ_DDW_6',
// 		label: 'Value_',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_EPA_WQ_DDW_9',
// 		label: 'Unit_Stand',
// 	},
// 	{
// 		name: 'WellsRanThroughDEM_EPA_WQ_DD_17',
// 		label: 'Primary__1',
// 	},
// 	{
// 		name: 'PerfsAndAquifersSummary_Max_INT ',
// 		label: 'Maximum_INT_No',
// 	},
// 	{
// 		name: 'PerfsAndAquifersSummary_Min_TOI',
// 		label: 'Minimum_TOI',
// 	},
// 	{
// 		name: 'PerfsAndAquifersSummary_Max_BOI',
// 		label: 'Maximum_BOI',
// 	},
// 	{
// 		name: 'Constr_YYYYDate',
// 		label: 'Constr_YYY',
// 	},
// 	{
// 		name: 'Destr_YYYYDate ',
// 		label: 'Destr_YYYY',
// 	},
// ];

// const gamaFields = [
// 	{
// 		name: 'Well ID',
// 		label: 'WELL_ID',
// 		direction: 'asc',
// 	},
// 	{
// 		name: 'SOURCE_NAME',
// 		label: 'Source Name',
// 	},
// 	{
// 		name: 'WELL_TYPE',
// 		label: 'WELL_TYPE',
// 	},
// 	{
// 		name: 'CHEMICAL',
// 		label: 'CHEMICAL',
// 	},
// 	{
// 		name: 'DATE',
// 		label: 'Date',
// 	},
// 	{
// 		name: 'RESULTS',
// 		label: 'Results',
// 	},
// 	{
// 		name: 'UNITS',
// 		label: 'UNITS',
// 	},
// 	{
// 		name: 'WELL_DEPTH__FT_',
// 		label: 'WELL DEPTH (FT)',
// 	},
// ];

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

// const wrdTemplate = {
// 	title: 'WRD ID No. {WellsRanThroughDEM_WRD_CB_Wells}',
// 	content: [
// 		{
// 			type: 'fields',
// 			fieldInfos: [
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_Wells',
// 					label: 'WRDID',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_Wel_9',
// 					label: 'State Source',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_Wel_5',
// 					label: 'Type',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_We_13',
// 					label: 'Agency_Lon',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_We_11',
// 					label: 'Short_Lbl',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_WRD_CB_We_15',
// 					label: 'Status',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_EPA_WQ_DDW_5',
// 					label: 'Constituen',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
// 					label: 'Sample_Dat',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_EPA_WQ_DDW_6',
// 					label: 'Value_',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_EPA_WQ_DDW_9',
// 					label: 'Unit_Stand',
// 				},
// 				{
// 					fieldName: 'WellsRanThroughDEM_EPA_WQ_DD_17',
// 					label: 'Primary__1',
// 				},
// 				{
// 					fieldName: 'PerfsAndAquifersSummary_Max_INT ',
// 					label: 'Maximum_INT_No',
// 				},
// 				{
// 					fieldName: 'PerfsAndAquifersSummary_Min_TOI',
// 					label: 'Minimum_TOI',
// 				},
// 				{
// 					fieldName: 'PerfsAndAquifersSummary_Max_BOI',
// 					label: 'Maximum_BOI',
// 				},
// 				{
// 					fieldName: 'Constr_YYYYDate',
// 					label: 'Constr_YYY',
// 				},
// 				{
// 					fieldName: 'Destr_YYYYDate ',
// 					label: 'Destr_YYYY',
// 				},
// 			],
// 		},
// 	],
// };

// const gamaTemplate = {
// 	title: 'WRD ID No. {WELL_ID}',
// 	content: [
// 		{
// 			type: 'fields',
// 			fieldInfos: [
// 				{
// 					fieldName: 'RESULTS',
// 					label: 'Results',
// 				},
// 				{
// 					fieldName: 'SOURCE_NAME',
// 					label: 'Source Name',
// 				},
// 				{
// 					fieldName: 'WELL_TYPE',
// 					label: 'WELL_TYPE',
// 				},
// 				{
// 					fieldName: 'CHEMICAL',
// 					label: 'CHEMICAL',
// 				},
// 				{
// 					fieldName: 'DATE',
// 					label: 'Date',
// 				},
// 				{
// 					fieldName: 'RESULTS',
// 					label: 'Results',
// 				},
// 				{
// 					fieldName: 'UNITS',
// 					label: 'UNITS',
// 				},
// 				{
// 					fieldName: 'WELL_DEPTH__FT_',
// 					label: 'WELL DEPTH (FT)',
// 				},
// 			],
// 		},
// 	],
// };

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
			// {
			// 	parentTitle: 'TCE Sampling Results (Trichloroethylene)',
			// 	title2D: 'GAMA TCE 2D',
			// 	title3D: 'GAMA TCE 3D',
			// 	label: 'GAMA TCE',
			// 	layerVar: 'gamaTCE',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'TCE Sampling Results (Trichloroethylene)',
			// 	title2D: 'WRD TCE 2D',
			// 	title3D: 'WRD TCE 3D',
			// 	label: 'WRD TCE',
			// 	layerVar: 'wrdTCE',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'PCE Sampling Results (Tetrachloroethylene)',
			// 	title2D: 'GAMA PCE 2D',
			// 	title3D: 'GAMA PCE 3D',
			// 	label: 'GAMA PCE',
			// 	layerVar: 'gamaPCE',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'PCE Sampling Results (Tetrachloroethylene)',
			// 	title2D: 'WRD PCE 2D',
			// 	title3D: 'WRD PCE 3D',
			// 	label: 'WRD PCE',
			// 	layerVar: 'wrdPCE',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'CR6 Sampling Results (Hexavalent Chromium)',
			// 	title2D: 'GAMA CR6 2D',
			// 	title3D: 'GAMA CR6 3D',
			// 	label: 'GAMA CR6',
			// 	layerVar: 'gamaCR6',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'CR6 Sampling Results (Hexavalent Chromium)',
			// 	title2D: 'WRD CR6 2D',
			// 	title3D: 'WRD CR6 3D',
			// 	label: 'WRD CR6',
			// 	layerVar: 'wrdCR6',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'CR Sampling Results (Total Chromium)',
			// 	title2D: 'GAMA CR 2D',
			// 	title3D: 'GAMA CR 3D',
			// 	label: 'GAMA CR',
			// 	layerVar: 'gamaCR',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'CR Sampling Results (Total Chromium)',
			// 	title2D: 'WRD CR 2D',
			// 	title3D: 'WRD CR 3D',
			// 	label: 'WRD CR',
			// 	layerVar: 'wrdCR',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'DCE12C Sampling Results (cis-1,2-Dichloroethylene)',
			// 	title2D: 'GAMA DCE12C 2D',
			// 	title3D: 'GAMA DCE12C 3D',
			// 	label: 'GAMA DCE12C',
			// 	layerVar: 'gamaDCE12C',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'DCE12C Sampling Results (cis-1,2-Dichloroethylene)',
			// 	title2D: 'WRD DCE12C 2D',
			// 	title3D: 'WRD DCE12C 3D',
			// 	label: 'WRD DCE12C',
			// 	layerVar: 'wrdDCE12C',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'AS Sampling Results (Arsenic)',
			// 	title2D: 'GAMA AS 2D',
			// 	title3D: 'GAMA AS 3D',
			// 	label: 'GAMA AS',
			// 	layerVar: 'gamaAS',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'AS Sampling Results (Arsenic)',
			// 	title2D: 'WRD AS 2D',
			// 	title3D: 'WRD AS 3D',
			// 	label: 'WRD AS',
			// 	layerVar: 'wrdAS',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'DCE11 Sampling Results (1,1-Dichloroethylene)',
			// 	title2D: 'GAMA DCE11 2D',
			// 	title3D: 'GAMA DCE11 3D',
			// 	label: 'GAMA DCE11',
			// 	layerVar: 'gamaDCE11',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'DCE11 Sampling Results (1,1-Dichloroethylene)',
			// 	title2D: 'WRD DCE11 2D',
			// 	title3D: 'WRD DCE11 3D',
			// 	label: 'WRD DCE11',
			// 	layerVar: 'wrdDCE11',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'DIOXANE14C Sampling Results (C4H8O2, 1,4-Dioxane)',
			// 	title2D: 'GAMA DIOXANE14C 2D',
			// 	title3D: 'GAMA DIOXANE14C 3D',
			// 	label: 'GAMA DIOXANE14C',
			// 	layerVar: 'gamaDIOXANE14C',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'DIOXANE14C Sampling Results (C4H8O2, 1,4-Dioxane)',
			// 	title2D: 'WRD DIOXANE14C 2D',
			// 	title3D: 'WRD DIOXANE14C 3D',
			// 	label: 'WRD DIOXANE14C',
			// 	layerVar: 'wrdDIOXANE14C',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'PB Sampling Results (Lead)',
			// 	title2D: 'GAMA PB 2D',
			// 	title3D: 'GAMA PB 3D',
			// 	label: 'GAMA PB',
			// 	layerVar: 'gamaPB',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'PB Sampling Results (Lead)',
			// 	title2D: 'WRD PB 2D',
			// 	title3D: 'WRD PB 3D',
			// 	label: 'WRD PB',
			// 	layerVar: 'wrdPB',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'PCATE Sampling Results (ClO4, Perchlorate)',
			// 	title2D: 'GAMA PCATE 2D',
			// 	title3D: 'GAMA PCATE 3D',
			// 	label: 'GAMA PCATE',
			// 	layerVar: 'gama0PCATE',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'PCATE Sampling Results (ClO4, Perchlorate)',
			// 	title2D: 'WRD PCATE 2D',
			// 	title3D: 'WRD PCATE 3D',
			// 	label: 'WRD PCATE',
			// 	layerVar: 'wrdPCATE',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'PFOA Sampling Results (Perfuloroctanioic Acid)',
			// 	title2D: 'GAMA PFOA 2D',
			// 	title3D: 'GAMA PFOA 3D',
			// 	label: 'GAMA PFOA',
			// 	layerVar: 'gamaPFOA',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'PFOA Sampling Results (Perfuloroctanioic Acid)',
			// 	title2D: 'WRD PFOA 2D',
			// 	title3D: 'WRD PFOA 3D',
			// 	label: 'WRD PFOA',
			// 	layerVar: 'wrdPFOA',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'TCPR123 Sampling Results (Trichlp)',
			// 	title2D: 'GAMA TCPR123 2D',
			// 	title3D: 'GAMA TCPR123 3D',
			// 	label: 'GAMA TCPR123',
			// 	layerVar: 'gamaTCPR123',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'TCPR123 Sampling Results (Trichlp)',
			// 	title2D: 'WRD TCPR123 2D',
			// 	title3D: 'WRD TCPR123 3D',
			// 	label: 'WRD TCPR123',
			// 	layerVar: 'wrdTCPR123',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'VC Sampling Results (Vinyl Chloride)',
			// 	title2D: 'GAMA VC 2D',
			// 	title3D: 'GAMA VC 3D',
			// 	label: 'GAMA VC',
			// 	layerVar: 'gamaVC',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'VC Sampling Results (Vinyl Chloride)',
			// 	title2D: 'WRD VC 2D',
			// 	title3D: 'WRD VC 3D',
			// 	label: 'WRD VC',
			// 	layerVar: 'wrdVC',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'CTCL Sampling Results (CT, Carbon Tetrachloride)',
			// 	title2D: 'GAMA CTCL 2D',
			// 	title3D: 'GAMA CTCL 3D',
			// 	label: 'GAMA CTCL',
			// 	layerVar: 'gamaCTCL',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'CTCL Sampling Results (CT, Carbon Tetrachloride)',
			// 	title2D: 'WRD CTCL 2D',
			// 	title3D: 'WRD CTCL 3D',
			// 	label: 'WRD CTCL',
			// 	layerVar: 'wrdCTCL',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			// {
			// 	parentTitle: 'PFOS Sampling Results (Perfluorooctancesulfonic Acid)',
			// 	title2D: 'GAMA PFOS 2D',
			// 	title3D: 'GAMA PFOS 3D',
			// 	label: 'GAMA PFOS',
			// 	layerVar: 'gamaPFOS',
			// 	fields: gamaFields,
			// 	dateField: 'DATE',
			// 	template: gamaTemplate,
			// },
			// {
			// 	parentTitle: 'PFOS Sampling Results (Perfluorooctancesulfonic Acid)',
			// 	title2D: 'WRD PFOS 2D',
			// 	title3D: 'WRD PFOS 3D',
			// 	label: 'WRD PFOS',
			// 	layerVar: 'wrdPFOS',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// 	template: wrdTemplate,
			// },
			{
				parentTitle: "Displayed Analyte",
				title2D: displayedAnalyteTitle,
				title3D: "All GAMA Wells",
				label: "Displayed Analyte",
				layerVar: "Displayed Analyte",
				fields: AnalyteFields,
				dateField: "GM_SAMP_COLLECTION_DATE",
				template: AnalyteTemplate,
			},
		],
	},
};
