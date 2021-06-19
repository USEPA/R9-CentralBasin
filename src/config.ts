import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';

const wrdFields = [
	{
		name: 'WellsRanThroughDEM_WRD_CB_Wel_4',
		label: 'WELL ID',
		direction: 'asc',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_6',
		label: 'Results',
	},
	{
		name: 'WellsRanThroughDEM_EPA_WQ_DDW_3',
		label: 'Date',
	},
];

const gamaFields = [
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

export const config = {
	portalEnv: {
		production: {
			appId: 'RjgBsWrJbfY8hMGY',
			portalUrl: 'https://epa.maps.arcgis.com',
			blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
			webScene: 'dd983ac69154460fb75f5ce193b5344d',
			elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
		},
		development: {
			appId: 'ZtlpDht9ywRCA4Iq',
			portalUrl: 'https://epa.maps.arcgis.com',
			blankBasemap: 'c0af3abd0d60427ba659e38d457fbe07',
			webScene: 'dd370d1e2c194f4491078b579379f1d1',
			// webScene: 'dd370d1e2c194f4491078b579379f1d1',
			elevationUrl: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
		},
	},
	tableLayers: {
		layers: [
			// {
			// 	parentTitle2D: 'Wells 2D',
			// 	parentTitle3D: 'Wells 3D',
			// 	title2D: 'All Wells With Labels',
			// 	title3D: 'All Wells - Gray V3',
			// 	layerVar: 'wells2D',
			// 	fields: [
			// 		{
			// 			name: 'WellsRanThroughDEM2_WRDID',
			// 			label: 'WRDID',
			// 			direction: 'asc',
			// 		},
			// 		{
			// 			name: 'WellsRanThroughDEM2_DPW_ID',
			// 			label: 'DPW ID',
			// 		},
			// 		{
			// 			name: 'WellsRanThroughDEM2_Owner_No',
			// 			label: 'Owner No',
			// 		},
			// 		{
			// 			name: 'WellsRanThroughDEM2_Type',
			// 			label: 'Type',
			// 		},
			// 	],
			// },
			{
				parentTitle: 'TCE Sampling Results',
				title2D: 'GAMA TCE 2D',
				title3D: 'GAMA TCE 3D',
				layerVar: 'gamaTCE',
				fields: gamaFields,
			},
			{
				parentTitle: 'TCE Sampling Results',
				title2D: 'WRD TCE 2D',
				title3D: 'WRD TCE 3D',
				layerVar: 'wrdTCE',
				fields: wrdFields,
			},
			{
				parentTitle: 'PCE Sampling Results',
				title2D: 'GAMA PCE 2D',
				title3D: 'GAMA PCE 3D',
				layerVar: 'gamaPCE',
				fields: gamaFields,
			},
			{
				parentTitle: 'PCE Sampling Results',
				title2D: 'WRD PCE 2D',
				title3D: 'WRD PCE 3D',
				layerVar: 'wrdPCE',
				fields: wrdFields,
			},
			{
				parentTitle: 'CR6 Sampling Results',
				title2D: 'GAMA CR6 2D',
				title3D: 'GAMA CR6 3D',
				layerVar: 'gamaCR6',
				fields: gamaFields,
			},
			{
				parentTitle: 'PCE Sampling Results',
				title2D: 'WRD CR6 2D',
				title3D: 'WRD CR6 3D',
				layerVar: 'wrdCR6',
				fields: wrdFields,
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
		]
	}
};
