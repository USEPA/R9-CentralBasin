import {mapProperties} from './data/app';
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
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import {info} from './data/app';
import {watch} from '@arcgis/core/core/watchUtils';
import ButtonMenuItem from '@arcgis/core/widgets/FeatureTable/Grid/support/ButtonMenuItem';

let appContainer: HTMLElement | null;
let tableContainer: HTMLElement | null;
// const tableDiv = document.getElementById('tableDiv');

// Get reference to div elements
let labelText: HTMLElement | null;

export const initWidgets = (view: SceneView) => {
    const legend = new Legend({view});

    const homeButton = new Home({view});

    const layerList = new LayerList({
        view,
        listItemCreatedFunction: (event: any) => {
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

    sliceExpand.viewModel.watch('expanded', (value) => {
        // console.log(value);
        if (!value) {
            slice.viewModel.clear();
        }
    });

    // Add widget to the bottom left corner of the view
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

    return view;
};

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
}
export const toggleFeatureTable = (checkboxEle: HTMLElement) => {
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
        // @ts-ignore
        tableContainer.style.display = 'flex';
    }
};

export const initTimeSlider = (view: SceneView) => {
    const timeInterval = new TimeInterval({value: 1, unit: 'months'});
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
    return {timeSlider, timeSliderExpand};
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
};

export const initTableWidget = (view: SceneView, layersInfo: any[]) => {
    // create table for each layer in config
    layersInfo.forEach((layerInfo) => {
        const zoomMenuItem = new ButtonMenuItem({
            label: 'Zoom to feature(s)',
            iconClass: 'esri-icon-zoom-in-magnifying-glass',
            clickFunction: (evt) => {
                // console.log(evt);
                // debugger;
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

        const features: { feature: __esri.Graphic }[] = [];
        let selectedFeature: number | __esri.Graphic | (number | __esri.Graphic)[], id: any;
        let features3D: number[] = [];
        let highlight: { remove: () => void } | null = null;

        featureTable.on('selection-change', (changes) => {
            // If row is unselected in table, remove it from the features array
            changes.removed.forEach((item) => {
                const data = features.find((data) => {
                    return data.feature !== item.feature;
                });

                features3D = features3D.filter((feature) => {
                    return feature !== item.feature.attributes.OBJECTID;
                });

                if (highlight) {
                    highlight.remove();
                }
                highlight = layerInfo.sceneView.highlight(features3D);
            });

            // If a row is selected, add to the features array
            changes.added.forEach((item) => {
                // highlight 3d features
                features3D.push(item.feature.attributes.OBJECTID);
                highlight = layerInfo.sceneView.highlight(features3D);

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

        const zoomToSelectedFeature = () => {
            // Create a query off of the feature layer
            const query = layerInfo.layer2D.createQuery();
            // Iterate through the features and grab the feature's objectID
            const featureIds = features.map((result) => {
                return result.feature.getAttribute(layerInfo.layer2D.objectIdField);
            });
            // Set the query's objectId
            query.objectIds = featureIds;
            // Make sure to return the geometry to zoom to
            query.returnGeometry = true;
            // Call queryFeatures on the feature layer and zoom to the resulting features
            layerInfo.layer2D.queryFeatures(query).then((results: { features: any; }) => {
                view.goTo(results.features).catch((error) => {
                    if (error.name != 'AbortError') {
                        console.error(error);
                    }
                });
            });
        }
    });
};
