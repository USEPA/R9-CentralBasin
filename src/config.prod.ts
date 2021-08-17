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

const wrdFields = [
	{
		name: 'WellsRanThroughDEM_WRD_CB_Wells',
		label: 'WRDID',
		direction: 'asc',
	},
	{
		name: 'WellsRanThroughDEM_WRD_CB_Wel_9',
		label: 'State Source',
	},
	{
		name: 'WellsRanThroughDEM_WRD_CB_Wel_5',
		label: 'Type',
	},
	{
		name: 'WellsRanThroughDEM_WRD_CB_We_13',
		label: 'Agency_Lon',
	},
	{
		name: 'WellsRanThroughDEM_WRD_CB_We_11',
		label: 'Short_Lbl',
	},
	{
		name: 'WellsRanThroughDEM_WRD_CB_We_15',
		label: 'Status',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_5',
		label: 'Constituen',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
		label: 'Sample_Dat',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_6',
		label: 'Value_',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_9',
		label: 'Unit_Stand',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DD_17',
		label: 'Primary__1',
	},
	{
		name: 'PerfsAndAquifersSummary_Max_INT ',
		label: 'Maximum_INT_No',
	},
	{
		name: 'PerfsAndAquifersSummary_Min_TOI',
		label: 'Minimum_TOI',
	},
	{
		name: 'PerfsAndAquifersSummary_Max_BOI',
		label: 'Maximum_BOI',
	},
	{
		name: 'Constr_YYYYDate',
		label: 'Constr_YYY',
	},
	{
		name: 'Destr_YYYYDate ',
		label: 'Destr_YYYY',
	},
];

const gamaFields = [
	{
		name: 'Well ID',
		label: 'WELL_ID',
		direction: 'asc',
	},
	{
		name: 'SOURCE_NAME',
		label: 'Source Name',
	},
	{
		name: 'WELL_TYPE',
		label: 'WELL_TYPE',
	},
	{
		name: 'CHEMICAL',
		label: 'CHEMICAL',
	},
	{
		name: 'DATE',
		label: 'Date',
	},
	{
		name: 'RESULTS',
		label: 'Results',
	},
	{
		name: 'UNITS',
		label: 'UNITS',
	},
	{
		name: 'WELL_DEPTH__FT_',
		label: 'WELL DEPTH (FT)',
	},
];

export const configProd = {
	appTitle: 'Central Basin Map v1.2',
	portalEnv: {
		appId: 'RjgBsWrJbfY8hMGY',
		portalUrl: 'https://epa.maps.arcgis.com',
		blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
		// webScene: 'dd983ac69154460fb75f5ce193b5344d',
		webScene: 'c6c5e203c3ab44058353f151ad967b59',
		elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
	},
	wells3D: {
		parentTitle: 'Wells 3D',
		title2D: 'All Wells With Labels',
		title3D: 'All Wells - Gray V3',
		layerVar: 'wells2D',
	},
	tableLayers: {
		layers: [
			{
				parentTitle: 'Wells 3D',
				title2D: 'All Wells With Labels',
				title3D: 'All Wells - Gray V3',
				label: 'All Wells',
				layerVar: 'wells2D',
				fields: wellsFields,
			},
			{
				parentTitle: 'TCE Sampling Results',
				title2D: 'GAMA TCE 2D',
				title3D: 'GAMA TCE 3D',
				label: 'GAMA TCE',
				layerVar: 'gamaTCE',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'TCE Sampling Results',
				title2D: 'WRD TCE 2D',
				title3D: 'WRD TCE 3D',
				label: 'WRD TCE',
				layerVar: 'wrdTCE',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'PCE Sampling Results',
				title2D: 'GAMA PCE 2D',
				title3D: 'GAMA PCE 3D',
				label: 'GAMA PCE',
				layerVar: 'gamaPCE',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'PCE Sampling Results',
				title2D: 'WRD PCE 2D',
				title3D: 'WRD PCE 3D',
				label: 'WRD PCE',
				layerVar: 'wrdPCE',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'CR6 Sampling Results',
				title2D: 'GAMA CR6 2D',
				title3D: 'GAMA CR6 3D',
				label: 'GAMA CR6',
				layerVar: 'gamaCR6',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'CR6 Sampling Results',
				title2D: 'WRD CR6 2D',
				title3D: 'WRD CR6 3D',
				label: 'WRD CR6',
				layerVar: 'wrdCR6',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
		],
	},
};
