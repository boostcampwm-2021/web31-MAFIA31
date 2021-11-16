import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JOB_DICT } from '@src/constants/job';
import { Image, ImageSizeList } from '../Image';

interface Props {
  job: string;
}

const RoleCard: FC<Props> = ({ job }) => (
  <div css={RoleCardStyle}>
    <div>{JOB_DICT[job].title}</div>
    <Image size={ImageSizeList.SMALL} src={JOB_DICT[job].imageSrc} />
    <div>{JOB_DICT[job].description}</div>
  </div>
);

const RoleCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px 0px;
  text-align: center;
`;

export default RoleCard;
