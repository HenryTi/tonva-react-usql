import {MapperContainer, HistoryMapper} from '../../ui';
import {History} from '../../entities';
import {EntityUI, HistoryUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<History, HistoryUI, HistoryMapper> = {
    caption: '流水账查询 - 仅开发时使用',
    icon: 'hand-o-right',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
