import {MapperContainer, QueryMapper} from '../../ui';
import {Query} from '../../entities';
import {EntityUIO, QueryUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Query, QueryUI, QueryMapper> = {
    caption: '查询',
    icon: 'hand-o-right',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
