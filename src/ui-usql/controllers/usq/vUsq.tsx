import React from "react";
import { List, Muted } from "tonva-react-form";
import { CLink } from "../link";
import { CUsq } from "./cUsq";
import { Entity } from "../../entities";
import { View } from "tonva-tools";

export class VUsq extends View<CUsq> {
    //protected crUsq: CUsq;
    protected isSysVisible = false;
    protected vmTuidLinks: CLink[];
    protected vmMapLinks: CLink[];
    protected vmSheetLinks: CLink[];
    protected vmActionLinks: CLink[];
    protected vmQueryLinks: CLink[];
    protected vmBookLinks: CLink[];

    constructor(crUsq: CUsq) {
        super(crUsq);
        //this.crUsq = crUsq;
        let {tuidArr, mapArr, sheetArr, actionArr, queryArr, bookArr} = crUsq.entities;
        this.vmTuidLinks = tuidArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crTuidMain(v)));
        this.vmMapLinks = mapArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crMap(v)));
        this.vmSheetLinks = sheetArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crSheet(v)));
        this.vmActionLinks = actionArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crAction(v)));
        this.vmQueryLinks = queryArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crQuery(v)));
        this.vmBookLinks = bookArr.filter(v => this.isVisible(v)).map(v => new CLink(this.controller.crBook(v)));
    }
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }
    render(param?:any) {
        if (this.view === undefined) return <div>??? viewModel 必须定义 view ???</div>
        return React.createElement(this.view);
    }

    protected view = () => {
        let {res, usq} = this.controller;
        let linkItem = {
            render: (vmLink:CLink, index:number):JSX.Element => vmLink.render(), 
            onClick: undefined, //(vmLink:VmLink) => vmLink.onClick() 
        };
        let lists = [
            {
                header: res.tuid || 'TUID',
                items: this.vmTuidLinks,
            },
            {
                cn: 'my-2',
                header: res.map || 'MAP',
                items: this.vmMapLinks,
            },
            {
                cn: 'my-2',
                header: res.sheet || 'SHEET',
                items: this.vmSheetLinks
            },
            {
                cn: 'my-2',
                header: res.action || 'ACTION',
                items: this.vmActionLinks
            },
            {
                cn: 'my-2',
                header: res.query || 'QUERY',
                items: this.vmQueryLinks
            },
            {
                cn: 'mt-2 mb-4',
                header: res.book || 'BOOK',
                items: this.vmBookLinks
            }
        ];
        return <>
            <div className="px-3 py-1 small">{res.usq || usq}</div>
            {lists.map(({cn, header, items},index) => items.length > 0 && <List
                key={index}
                className={cn}
                header={<div className="px-3 py-1 bg-light"><Muted>{header}</Muted></div>}
                items={items}
                item={linkItem} />
            )}
        </>;
    }
}
