import { CenterApi as CenterApiBase } from 'tonva-tools';
//
export class CenterApi extends CenterApiBase {
    async userAppUnits(app) {
        return await this.get('tie/user-app-units', { app: app });
    }
}
export const centerApi = new CenterApi('tv/', undefined);
//# sourceMappingURL=centerApi.js.map