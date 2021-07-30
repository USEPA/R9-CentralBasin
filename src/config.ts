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

export const config = {
	portalEnv: {
		production: {
			appId: 'RjgBsWrJbfY8hMGY',
			portalUrl: 'https://epa.maps.arcgis.com',
			blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
			// webScene: 'dd983ac69154460fb75f5ce193b5344d',
			webScene: '6e43620d338a418481c9702fe2a97f26',
			elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
		},
		development: {
			appId: 'ZtlpDht9ywRCA4Iq',
			portalUrl: 'https://epa.maps.arcgis.com',
			blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
			// webScene: 'dd370d1e2c194f4491078b579379f1d1',
			// webScene: 'dd370d1e2c194f4491078b579379f1d1',
			// webScene: '6e43620d338a418481c9702fe2a97f26',
			webScene: 'c28d269394414b0cb55b2e3308816bb3', // 15

			elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
		},
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

			{
				parentTitle: 'CR Sampling Results',
				title2D: 'GAMA CR 2D',
				title3D: 'GAMA CR 3D',
				label: 'GAMA CR',
				layerVar: 'gamaCR',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'CR Sampling Results',
				title2D: 'WRD CR 2D',
				title3D: 'WRD CR 3D',
				label: 'WRD CR',
				layerVar: 'wrdCR',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'DCE12C Sampling Results',
				title2D: 'GAMA DCE12C 2D',
				title3D: 'GAMA DCE12C 3D',
				label: 'GAMA DCE12C',
				layerVar: 'gamaDCE12C',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'DCE12C Sampling Results',
			// 	title2D: 'WRD DCE12C 2D',
			// 	title3D: 'WRD DCE12C 3D',
			// 	label: 'WRD DCE12C',
			// 	layerVar: 'wrdDCE12C',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'AS Sampling Results',
				title2D: 'GAMA AS 2D',
				title3D: 'GAMA AS 3D',
				label: 'GAMA AS',
				layerVar: 'gamaAS',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'AS Sampling Results',
				title2D: 'WRD AS 2D',
				title3D: 'WRD AS 3D',
				label: 'WRD AS',
				layerVar: 'wrdAS',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'DCE11 Sampling Results',
				title2D: 'GAMA DCE11 2D',
				title3D: 'GAMA DCE11 3D',
				label: 'GAMA DCE11',
				layerVar: 'gamaDCE11',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'DCE11 Sampling Results',
			// 	title2D: 'WRD DCE11 2D',
			// 	title3D: 'WRD DCE11 3D',
			// 	label: 'WRD DCE11',
			// 	layerVar: 'wrdDCE11',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'DIOXANE14C Sampling Results',
				title2D: 'GAMA DIOXANE14C 2D',
				title3D: 'GAMA DIOXANE14C 3D',
				label: 'GAMA DIOXANE14C',
				layerVar: 'gamaDIOXANE14C',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'DIOXANE14C Sampling Results',
			// 	title2D: 'WRD DIOXANE14C 2D',
			// 	title3D: 'WRD DIOXANE14C 3D',
			// 	label: 'WRD DIOXANE14C',
			// 	layerVar: 'wrdDIOXANE14C',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'PB Sampling Results',
				title2D: 'GAMA PB 2D',
				title3D: 'GAMA PB 3D',
				label: 'GAMA PB',
				layerVar: 'gamaPB',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'PB Sampling Results',
				title2D: 'WRD PB 2D',
				title3D: 'WRD PB 3D',
				label: 'WRD PB',
				layerVar: 'wrdPB',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'PCATE Sampling Results',
				title2D: 'GAMA PCATE 2D',
				title3D: 'GAMA PCATE 3D',
				label: 'GAMA PCATE',
				layerVar: 'gama0PCATE',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'PCATE Sampling Results',
			// 	title2D: 'WRD PCATE 2D',
			// 	title3D: 'WRD PCATE 3D',
			// 	label: 'WRD PCATE',
			// 	layerVar: 'wrdPCATE',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'PFOA Sampling Results',
				title2D: 'GAMA PFOA 2D',
				title3D: 'GAMA PFOA 3D',
				label: 'GAMA PFOA',
				layerVar: 'gamaPFOA',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'PFOA Sampling Results',
				title2D: 'WRD PFOA 2D',
				title3D: 'WRD PFOA 3D',
				label: 'WRD PFOA',
				layerVar: 'wrdPFOA',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'TCPR123 Sampling Results',
				title2D: 'GAMA TCPR123 2D',
				title3D: 'GAMA TCPR123 3D',
				label: 'GAMA TCPR123',
				layerVar: 'gamaTCPR123',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'TCPR123 Sampling Results',
			// 	title2D: 'WRD TCPR123 2D',
			// 	title3D: 'WRD TCPR123 3D',
			// 	label: 'WRD TCPR123',
			// 	layerVar: 'wrdTCPR123',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'VC Sampling Results',
				title2D: 'GAMA VC 2D',
				title3D: 'GAMA VC 3D',
				label: 'GAMA VC',
				layerVar: 'gamaVC',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'VC Sampling Results',
				title2D: 'WRD VC 2D',
				title3D: 'WRD VC 3D',
				label: 'WRD VC',
				layerVar: 'wrdVC',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
			{
				parentTitle: 'CTCL Sampling Results',
				title2D: 'GAMA CTCL 2D',
				title3D: 'GAMA CTCL 3D',
				label: 'GAMA CTCL',
				layerVar: 'gamaCTCL',
				fields: gamaFields,
				dateField: 'DATE',
			},
			// {
			// 	parentTitle: 'CTCL Sampling Results',
			// 	title2D: 'WRD CTCL 2D',
			// 	title3D: 'WRD CTCL 3D',
			// 	label: 'WRD CTCL',
			// 	layerVar: 'wrdCTCL',
			// 	fields: wrdFields,
			// 	dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			// },
			{
				parentTitle: 'PFOS Sampling Results',
				title2D: 'GAMA PFOS 2D',
				title3D: 'GAMA PFOS 3D',
				label: 'GAMA PFOS',
				layerVar: 'gamaPFOS',
				fields: gamaFields,
				dateField: 'DATE',
			},
			{
				parentTitle: 'PFOS Sampling Results',
				title2D: 'WRD PFOS 2D',
				title3D: 'WRD PFOS 3D',
				label: 'WRD PFOS',
				layerVar: 'wrdPFOS',
				fields: wrdFields,
				dateField: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
			},
		],
		layers3D: [
			{
				parentTitle: 'Wells 3D',
				title: 'All Wells - Gray V3',
				layerVar: 'wells3D',
			},
			{
				parentTitle: 'TCE Sampling Results',
				title: 'GAMA TCE 3D',
				layerVar: 'gamaTCE3D',
			},
			{
				parentTitle: 'TCE Sampling Results',
				title: 'WRD TCE 3D',
				layerVar: 'wrdTCE3D',
			},
			{
				parentTitle: 'PCE Sampling Results',
				title: 'GAMA PCE 3D',
				layerVar: 'gamaPCE3D',
			},
			{
				parentTitle: 'PCE Sampling Results',
				title: 'WRD PCE 3D',
				layerVar: 'wrdPCE3D',
			},
			{
				parentTitle: 'CR6 Sampling Results',
				title: 'GAMA CR6 3D',
				layerVar: 'gamaCR63D',
			},
			{
				parentTitle: 'PCE Sampling Results',
				title: 'WRD CR6 3D',
				layerVar: 'wrdCR63D',
			},
		],
	},
};
