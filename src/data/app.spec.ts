import {applyTimeExtent} from './app';

jest.mock('@arcgis/core/views/layers/support/FeatureFilter');

describe('app', () => {
    it('applies correct time filter', () => {
        const timeExtent = {
            start: new Date(2016, 0, 1),
            end: new Date(2020, 11, 31)
        } as any;
        const layerView = {
            filter: null
        } as any;
        const timeField = 'someField';

        applyTimeExtent(timeExtent, layerView, timeField);
        expect(layerView.filter.where).toBe("someField BETWEEN DATE '2016-01-01' AND DATE '2020-12-31'")
    })
})
