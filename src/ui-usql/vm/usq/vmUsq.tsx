import React from "react";
import { List, Muted } from "tonva-react-form";
import { VmEntityLink, VmLink } from "../link";
import { CrUsq } from "./crUsq";
import { Entity } from "../../entities";

export class VmUsq {
    protected crUsq: CrUsq;
    protected isSysVisible = false;
    protected vmTuidLinks: VmEntityLink[];
    protected vmMapLinks: VmEntityLink[];
    protected vmSheetLinks: VmEntityLink[];
    protected vmActionLinks: VmEntityLink[];
    protected vmQueryLinks: VmEntityLink[];
    protected vmBookLinks: VmEntityLink[];

    constructor(crUsq: CrUsq) {
        this.crUsq = crUsq;
        let {tuidArr, mapArr, sheetArr, actionArr, queryArr, bookArr} = crUsq.entities;
        this.vmTuidLinks = tuidArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crTuidMain(v)));
        this.vmMapLinks = mapArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crMap(v)));
        this.vmSheetLinks = sheetArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crSheet(v)));
        this.vmActionLinks = actionArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crAction(v)));
        this.vmQueryLinks = queryArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crQuery(v)));
        this.vmBookLinks = bookArr.filter(v => this.isVisible(v)).map(v => new VmEntityLink(this.crUsq.crBook(v)));
    }
    protected isVisible(entity: Entity):boolean {
        return entity.sys !== true || this.isSysVisible;
    }
    render() {
        if (this.view === undefined) return <div>??? viewModel 必须定义 view ???</div>
        return React.createElement(this.view);
    }

    protected view = () => {
        let {res, api} = this.crUsq;
        let linkItem = {
            render: (vmLink:VmEntityLink, index:number):JSX.Element => vmLink.render(), 
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
            <div className="px-3 py-1 small">{res.usq || api}</div>
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
