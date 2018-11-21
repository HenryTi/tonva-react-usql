import * as React from 'react';
import { BoxId } from "../entities";
import { observer } from 'mobx-react';

interface Props {
    tuidValue: number|BoxId, 
    ui?: (values?:any, x?:any)=>JSX.Element,
    x?: any,
    nullUI?: ()=>JSX.Element
}

const Tv = observer(({tuidValue, ui, x, nullUI}:Props) => {
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return <>{ttv}-{tuidValue}</>;
            else
                return ui(tuidValue, x);
        case 'undefined':
            if (nullUI === undefined) return <>null</>;
            return nullUI();
        case 'object':
            if (tuidValue === null) {
                if (nullUI === undefined) return <>null</>;
                return nullUI();
            }
            return (tuidValue as BoxId).content(ui, x);
        case 'number':
            return <>id...{tuidValue}</>;
    }
});

export const tv = (tuidValue:number|BoxId, ui?:(values?:any, x?:any)=>JSX.Element, x?:any, nullUI?:()=>JSX.Element):JSX.Element => {
    return <Tv tuidValue={tuidValue} ui={ui} x={x} nullUI={nullUI} />;
};
