import {MapperContainer, SheetMapper} from '../../ui';
import {Sheet} from '../../entities';
import {EntityUI, SheetUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Sheet, SheetUI, SheetMapper> = {
    caption: '凭单',
    icon: 'wpforms',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
