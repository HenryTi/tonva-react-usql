import * as React from 'react';
import { observer } from 'mobx-react';
import * as className from 'classnames';
import { List, LMR, FA } from 'tonva-react-form';
import { Page, nav } from 'tonva-tools';
import { Map } from '../../entities';
import { VmEntity } from '../VM';
import { CrMap, MapItem, MapKey, MapUI } from './crMap';

export class VmMapMain extends VmEntity<Map, MapUI> {
    protected coordinator: CrMap;
    private mapKey: MapKey[];

    async showEntry(param?:any) {
        this.openPage(this.view);
    }

    itemRender = (item:MapItem, index:number) => {
        return <this.ItemRow item={item} />;
    }

    private ItemRow = observer(({item}: {item:MapItem}) => {
        let {tuid, box, children, isLeaf, keyIndex} = item;
        let keyUI = this.coordinator.keyUIs[keyIndex];
        let {content:keyContent, none:keyNone} = keyUI;
        let add = <button className="btn btn-link btn-sm" onClick={()=>this.coordinator.addClick(item)}>
            <FA name="plus" />
        </button>;
        let remove = <button className="btn btn-link btn-sm" onClick={()=>this.coordinator.removeClick(item)}>
            <FA className="text-info" name="trash" />
        </button>;
        let right;
        if (isLeaf === false) {
            if (keyIndex === 0)
                right = add;
            else
                right = <>{remove} &nbsp; {add}</>;
        }
        else if (keyIndex > 0) {
            right = remove;
        }
        let content, border;
        if (isLeaf === true) {
            content = undefined; //<div className="ml-5">leaf</div>;
        }
        else {
            border = "border-bottom";
            let none = keyNone && keyNone();
            content = <List 
                className="ml-4" 
                items={children} 
                item={{onClick:undefined, render:this.itemRender}}
                none={none} />
        }
        return <div className="d-flex flex-column">
            <LMR className={className('px-2', 'py-1', border)} 
                left={<div className="py-1">{box.content(keyContent)}</div>}
                right={right}
            />
            {content}
        </div>;
    });

    protected get view() { return () => <Page header={this.label}>
            <List items={this.coordinator.items} item={{className:'my-2', onClick:undefined, render:this.itemRender}} />
        </Page>
    };
}
