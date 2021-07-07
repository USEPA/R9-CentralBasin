import {initFeatureTable, initWidgets, toggleFeatureTable} from './widgets';

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
            watch() {
            },
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
    })
    it('removes table and toggles label when not checked', () => {
    	const e = {checked: false} as any;
        toggleFeatureTable(e);
        expect(spyRemove).toHaveBeenCalled();
    });
    it('add table and toggles label when not checked', () => {
    	const e = {checked: true} as any;
        toggleFeatureTable(e);
        expect(spyRemove).toHaveBeenCalled();
    });
});
