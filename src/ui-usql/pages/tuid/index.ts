import {MapperContainer,TuidMapper} from '../../ui';
import {Tuid} from '../../entities';
import {EntityUIO, TuidUIO} from '../../ui';
import {MainPage} from './mainPage';
import {EditPage} from './editPage';
import {ListPage} from './listPage';
import {GeneralTuidInput} from './input';
import {EntityLink} from '../entityLink';
import {SlaveInput} from './slaveInput';
import {BindSlaveInput} from './bindSlaveInput';

export * from './input';
export * from './dropDown';
export * from './radio';

export const mapperContainer:MapperContainer<Tuid, TuidUIO, TuidMapper> = {
    caption: '数据字典',
    icon: 'book',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
        editPage: EditPage,
        listPage: ListPage,
        input: {
            component: GeneralTuidInput,
        },
        slaveInput: SlaveInput,
        bindSlaveInput: BindSlaveInput,
    }
}
