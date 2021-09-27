import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import SceneLayerView from '@arcgis/core/views/layers/SceneLayerView';
import PopupTemplate from '@arcgis/core/PopupTemplate';

export interface FieldInfo {
	name: string;
	label: string;
	direction?: string;
	visible?: boolean;
}

export interface LayerInfo {
	parentTitle: string;
	title2D: string;
	title3D: string;
	label: string;
	layerVar: string;
	fields: FieldInfo[];
	id2D?: string;
	layer2D?: FeatureLayer;
	id3D?: string;
	layer3D?: SceneLayer;
	tab?: HTMLElement;
	tableDiv?: HTMLElement;
	sceneView?: SceneLayerView;
	template?: PopupTemplate;
}

export interface TableLayers {
	layers: LayerInfo[];
}

export interface WellsInfo {
	parentTitle: string;
	title2D: string;
	title3D: string;
	layerVar: string;
	id3D?: string;
	layer3D?: SceneLayer;
}
