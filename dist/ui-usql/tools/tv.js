import * as React from 'react';
import { observer } from 'mobx-react';
import { PureJSONContent } from '../controllers';
function boxIdContent(bi, templet, x) {
    let { id, _$tuid, _$com } = bi;
    let t = _$tuid;
    if (t === undefined) {
        if (templet !== undefined)
            return templet(bi, x);
        return PureJSONContent(bi, x);
    }
    let com = templet || _$com;
    if (com === undefined) {
        com = bi._$com = t.getTuidContent();
    }
    let val = t.valueFromId(id);
    if (typeof val === 'number')
        val = { id: val };
    if (templet !== undefined)
        return templet(val, x);
    return React.createElement(com, val);
}
const Tv = observer(({ tuidValue, ui, x, nullUI }) => {
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return React.createElement(React.Fragment, null,
                    ttv,
                    "-",
                    tuidValue);
            else
                return ui(tuidValue, x);
        case 'undefined':
            if (nullUI === undefined)
                return React.createElement(React.Fragment, null, "null");
            return nullUI();
        case 'object':
            if (tuidValue === null) {
                if (nullUI === undefined)
                    return React.createElement(React.Fragment, null, "null");
                return nullUI();
            }
            return boxIdContent(tuidValue, ui, x);
        case 'number':
            return React.createElement(React.Fragment, null,
                "id...",
                tuidValue);
    }
});
export const tv = (tuidValue, ui, x, nullUI) => {
    return React.createElement(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
//# sourceMappingURL=tv.js.map