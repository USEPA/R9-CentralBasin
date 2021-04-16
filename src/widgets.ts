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

import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';


export function initWidgets(view: SceneView) {
    const legend = new Legend({ view });

    let homeButton = new Home({ view });

    let layerList = new LayerList({
        view,
        listItemCreatedFunction: function (event: any) {
            const item = event.item;
            if (item.layer.type !== "group") {
                // don't show legend twice
                item.panel = {
                    content: "legend",
                    open: false
                };
            }
        }
    });

    const searchWidget = new Search({
        view: view
    });

    var basemapGallery = new BasemapGallery({
        view: view,
        // @ts-ignore
        source: {
            portal: info.portalUrl,
            updateBasemapsCallback: function (items) {
                // create custom basemap to be added to the array of portal basemaps
                var bm = new Basemap({
                    portalItem: {
                        id: "c0af3abd0d60427ba659e38d457fbe07"
                    }
                });
                // add basemap to the array
                items.unshift(bm);
                // return the array of basemaps
                return items;
            }
        }
    });

    let lineMeasurement = new DirectLineMeasurement3D({
        view: view
    });

    let areaMeasurement = new AreaMeasurement3D({
        view: view
    });

    const slice = new Slice({
        view: view
    });

    const basemapExpand = new Expand({
        view,
        content: basemapGallery,
        expandIconClass: 'esri-icon-basemap',
        autoCollapse: true,
        group: 'top-left',
        expandTooltip: 'Basemaps'
    });

    const lineMeasurementExpand = new Expand({
        view,
        content: lineMeasurement,
        expandIconClass: 'esri-icon-measure-line',
        autoCollapse: true,
        group: 'top-left',
        expandTooltip: 'Distance Measurement'
    });

    const areaMeasurementExpand = new Expand({
        view,
        content: areaMeasurement,
        expandIconClass: 'esri-icon-measure-area',
        autoCollapse: true,
        group: 'top-left',
        expandTooltip: 'Area Measurement'
    });

    const sliceExpand = new Expand({
        view,
        content: slice,
        expandIconClass: 'esri-icon-cursor-marquee',
        group: 'top-left',
        autoCollapse: false,
        expandTooltip: 'Slice'
    });

    sliceExpand.viewModel.watch("expanded", function (value) {
        // console.log(value);
        if (!value) { slice.viewModel.clear() }
    });

    // Add widget to the bottom left corner of the view
    // view.ui.add(legend, 'bottom-left');
    view.ui.add(layerList, 'top-right');
    view.ui.add(searchWidget, 'top-right');

    view.ui.add(homeButton, "top-left");
    view.ui.add(basemapExpand, "top-left");

    view.ui.add(lineMeasurementExpand, "top-left");
    view.ui.add(areaMeasurementExpand, "top-left");
    view.ui.add(sliceExpand, "top-left");

    let featureSearch = document.getElementById("featureSearchDiv");
    // @ts-ignore
    view.ui.add(featureSearch, "top-right", 0);


    // Get references to div elements for toggling table visibility
    const appContainer = document.getElementById("appContainer");
    const tableContainer = document.getElementById("tableContainer");
    const tableDiv = document.getElementById("tableDiv");

    // Get reference to div elements
    const checkboxEle = document.getElementById("checkboxId");
    const labelText = document.getElementById("labelText");

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
            labelText.innerHTML = "Show Feature Table";
        } else {
            // @ts-ignore
            appContainer.appendChild(tableContainer);
            // @ts-ignore
            labelText.innerHTML = "Hide Feature Table";
        }
    }

    return view;
}

export function initTimeSlider(view: SceneView) {
    const timeInterval = new TimeInterval({ value: 1, unit: "months" });
    const timeSlider = new TimeSlider({
        container: "timeSlider",
        view,
        mode: "time-window",
        fullTimeExtent: {
            start: new Date(1984, 0, 23),
            end: new Date(2021, 0, 6)
        },
        stops: {
            interval: timeInterval
        }
    });
    const timeSliderExpand = new Expand({
        view,
        content: timeSlider.container,
        expandIconClass: 'esri-icon-time-clock',
        expandTooltip: 'Time Slider'
    });

    view.ui.add(timeSliderExpand, "bottom-left");
    return { timeSlider, timeSliderExpand };
}


export function initSlidesWidget(view: SceneView) {
    const slidesDiv: any = document.getElementById("slidesDiv");
    // @ts-ignore
    const slides = view.map.presentation.slides;
    slides.forEach(function (slide: any, placement: number) {

        let slideElement = document.createElement("div");
        slideElement.id = slide.id;
        slideElement.classList.add("slide");

        slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
        slidesDiv.appendChild(slideElement);

        let title = document.createElement("div");
        title.innerText = slide.title.text;
        title.classList.add("title");
        slideElement.appendChild(title);

        let img = new Image();
        img.src = slide.thumbnail.url;
        img.title = slide.title.text;
        slideElement.appendChild(img);

        slideElement.addEventListener("click", function () {
            let slides = document.querySelectorAll(".slide");
            Array.from(slides).forEach(function (node) {
                node.classList.remove("active");
            });
            slideElement.classList.add("active");
            slide.applyTo(view);
        });
    });
    const slidesExpand = new Expand({
        view,
        content: slidesDiv,
        expandIconClass: 'esri-icon-collection',
        group: 'top-left',
        expandTooltip: 'Slides'
    });
    view.ui.add(slidesExpand, "top-left");
}

export function initTableWidget(view: SceneView, wellsLayer: FeatureLayer) {

    // Get references to div elements for toggling table visibility
    // const appContainer = document.getElementById("appContainer");
    // const tableContainer = document.getElementById("tableContainer");
    const tableDiv = document.getElementById("tableDiv");

    // Create FeatureTable
    const featureTable = new FeatureTable({
        view: view, // make sure to pass in view in order for selection to work
        layer: wellsLayer,
        fieldConfigs: [{
            name: "WellsRanThroughDEM2_WRDID",
            label: "WRDID",
            direction: "asc"
        },
        {
            name: "WellsRanThroughDEM2_DPW_ID",
            label: "DPW_ID"
        },
        {
            name: "WellsRanThroughDEM2_Common_Nam ",
            label: "Common_Nam"
        },
        {
            name: "WellsRanThroughDEM2_Owner_No",
            label: "Owner_No"
        },
        {
            name: "WellsRanThroughDEM2_Type",
            label: "Type"
        }
        ],
        // @ts-ignore
        container: tableDiv
    });

    // Add toggle visibility slider
    // view.ui.add(document.getElementById("sliderDiv"), "top-right");

    // Get reference to div elements
    const checkboxEle = document.getElementById("checkboxId");
    const labelText = document.getElementById("labelText");
}