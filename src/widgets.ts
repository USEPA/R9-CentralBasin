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

    let basemapGallery = new BasemapGallery({
        view: view
    });

    let lineMeasurement = new DirectLineMeasurement3D({
        view: view
    });

    let areaMeasurement = new AreaMeasurement3D({
        view: view
    });

    const basemapExpand = new Expand({
        view,
        content: basemapGallery,
        expandIconClass: 'esri-icon-basemap',
        autoCollapse: true,
        group: 'top-left'
    });

    const lineMeasurementExpand = new Expand({
        view,
        content: lineMeasurement,
        expandIconClass: 'esri-icon-measure-line',
        autoCollapse: true,
        group: 'top-left'
    });

    const areaMeasurementExpand = new Expand({
        view,
        content: areaMeasurement,
        expandIconClass: 'esri-icon-measure-area',
        autoCollapse: true,
        group: 'top-left'
    });

    const slice = new Slice({
        view: view,
        container: "sliceContainer"
    });

    slice.viewModel.watch("state", function (value) {
        console.log(value);
        if (value === "ready") {
            document.getElementById("clearPlaneBtn").style.display = "none";
        } else {
            document.getElementById("clearPlaneBtn").style.display = "inherit";
        }
    });

    document.getElementById("clearPlaneBtn").addEventListener("click", evt => {
        slice.viewModel.clear();
    });

    // Add widget to the bottom left corner of the view
    // view.ui.add(legend, 'bottom-left');
    view.ui.add(layerList, 'top-right');
    view.ui.add("sliceDiv", "top-right");

    view.ui.add(homeButton, "top-left");
    view.ui.add(basemapExpand, "top-left");

    view.ui.add(lineMeasurementExpand, "top-left");
    view.ui.add(areaMeasurementExpand, "top-left");
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
        expandIconClass: 'esri-icon-time-clock'
    });

    view.ui.add(timeSliderExpand, "bottom-left");
    return { timeSlider, timeSliderExpand };
}
