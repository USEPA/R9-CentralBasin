// Widgets
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import TimeInterval from '@arcgis/core/TimeInterval';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import Expand from '@arcgis/core/widgets/Expand';
import Home from '@arcgis/core/widgets/Home';
import SceneView from '@arcgis/core/views/SceneView';
import Slice from '@arcgis/core/widgets/Slice';

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

    const slice = new Slice({
        view: view,
        container: "sliceContainer"
    });

    // slice.viewModel.watch("state", function (value) {
    //     if (value === "ready") {
    //         clearPlaneBtn.style.display = "none";
    //     } else {
    //         clearPlaneBtn.style.display = "inherit";
    //     }
    // });

    // clearPlaneBtn.addEventListener("click", function () {
    //     sliceWidget.viewModel.clear();
    // });





    // Add widget to the bottom left corner of the view
    // view.ui.add(legend, 'bottom-left');
    view.ui.add(layerList, 'top-right');
    view.ui.add("menu", "top-right");

    // view.ui.add(sliceExpand, "top-right");
    view.ui.add(homeButton, "top-left");
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
        content: timeSlider.container
    });

    view.ui.add(timeSliderExpand, "bottom-left");
    return { timeSlider, timeSliderExpand };
}
