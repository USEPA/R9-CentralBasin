/* eslint-disable prettier/prettier */
import { initFeatureTable, initWidgets, toggleFeatureTable, initSlidesWidget } from './widgets';
import { changeTab } from './index';
import { LayerInfo } from './tableLayers';

jest.mock('@arcgis/core/widgets/LayerList');
jest.mock('@arcgis/core/widgets/Legend');

let spy: jest.SpyInstance;

describe('widgets', () => {
    beforeEach(() => {
        spy = jest.spyOn(document, 'getElementById');
        const mockElem: any = {
            offsetWidth: 300,
        };
        spy.mockReturnValue(mockElem);
    });

    it('initializes widgets in view', () => {
        const widgets: any[] = [];
        const view: any = {
            ui: {
                add(w: any) {
                    widgets.push(w);
                },
            },
            watch() { },
        };
        initWidgets(view);
        expect(widgets).toHaveLength(8);
    });

    // it('initializes time slider', () => {
    //     const widgets: any[] = [];
    //     const view: any = {
    //         ui: {
    //             add(w: any) {
    //                 widgets.push(w);
    //             },
    //         },
    //         watch() {
    //         },
    //     };
    //     initTimeSlider(view);
    //     expect(widgets).toHaveLength(8);
    // });

    // it('initializes slides widget', () => {
    //     const widgets: any[] = [];
    //     const view: any = {
    //         ui: {
    //             add(w: any) {
    //                 widgets.push(w);
    //             },
    //         },
    //         watch() {
    //         },
    //     };
    //     initSlidesWidget(view);
    //     expect(widgets).toHaveLength(8);
    // });
});

describe('featureTable', () => {
    let spyCreate: jest.SpyInstance;
    let spyRemove: jest.SpyInstance;
    let spyAdd: jest.SpyInstance;
    let mockElement: HTMLElement;
    beforeAll(() => {
        spyCreate = jest.spyOn(document, 'getElementById');
        mockElement = document.createElement('appContainer');
        spyRemove = jest.spyOn(mockElement, 'removeChild');
        spyRemove.mockReturnValue(null);
        spyAdd = jest.spyOn(mockElement, 'appendChild');
        spyAdd.mockReturnValue(null);
        spyCreate.mockReturnValue(mockElement);
        initFeatureTable({} as any);
    });
    it('removes table and toggles label when not checked', () => {
        const e = { checked: false } as any;
        toggleFeatureTable(e);
        expect(spyRemove).toHaveBeenCalled();
    });
    it('add table and toggles label when not checked', () => {
        const e = { checked: true } as any;
        toggleFeatureTable(e);
        expect(spyRemove).toHaveBeenCalled();
    });
});

describe('tabs', () => {
    let spyCreate: jest.SpyInstance;
    // let spyCalciteTab: jest.SpyInstance;
    // let spyActiveTab: jest.SpyInstance;
    // let spyAdd: jest.SpyInstance;
    let mockElement1: HTMLElement;
    let mockElement2: HTMLElement;
    let mockElement3: HTMLElement;

    const layerInfo: LayerInfo = {
        tab: document.createElement('BUTTON'),
        tableDiv: document.createElement('DIV'),
        parentTitle: 'Wells 3D',
        title2D: 'All Wells With Labels',
        title3D: 'All Wells - Gray V3',
        label: 'All Wells',
        layerVar: 'wells2D',
        fields: [
            {
                name: 'WellsRanThroughDEM2_WRDID',
                label: 'WRDID',
                direction: 'asc',
            }
        ]
    }
    beforeAll(() => {
        spyCreate = jest.spyOn(document, 'getElementsByClassName');

        mockElement1 = document.createElement('mockElement1');
        mockElement2 = document.createElement('mockElement2');
        mockElement2 = document.createElement('mockElement3');
        mockElement1.classList.add('active');
        mockElement1.classList.add('calcite-tab');
        mockElement2.classList.add('calcite-tab');
        mockElement3.classList.add('calcite-tab');

        spyCreate.mockReturnValue([mockElement1, mockElement2, mockElement3])

        // changeTab(layerInfo);
    });
    it('changes active feature table tab', () => {
        // const e = { checked: false } as any;
        changeTab(layerInfo);
        expect(layerInfo.tab?.classList.contains('active')).toBeTruthy();
        expect(layerInfo.tableDiv?.classList.contains('active-table')).toBeTruthy();
    });
});
