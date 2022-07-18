import { IHelpIndexList } from '@core/service-api';
import { ISupportIndexProps } from '.';
export interface IArtBlockProps extends ISupportIndexProps {
    data?: IHelpIndexList[];
}
declare function ArtBlock({ data, onTitleClick, onMoreClick }: IArtBlockProps): JSX.Element;
export default ArtBlock;
