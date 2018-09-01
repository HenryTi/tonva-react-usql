import * as React from 'react';
import { FA } from "tonva-react-form";

export function vmLinkIcon(cls:string, faName:string) {
    return <FA className={cls} size="lg" name={faName} fixWidth={true} />;
}
