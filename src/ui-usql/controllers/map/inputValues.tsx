import * as React from 'react';
import { VEntity } from "../VM";
import { MapUI, CMap } from "./cMap";
import { Map } from "../../entities";
import { Page } from "tonva-tools";

export class VInputValues extends VEntity<Map, MapUI, CMap> {
    async showEntry(param?:any) {
        this.controller.form.reset();
        this.openPageElement(<this.view />);
    }

    private view = () => {
        return <Page>
            {this.controller.form.render()}
        </Page>
    }
}