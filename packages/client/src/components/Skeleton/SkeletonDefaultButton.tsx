import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { grey2, primaryLight } from '@src/constants';
import { ButtonSizeList } from '@components/Button/Button.st';
import SkeletonKeyframeAnimation from './SkeletonKeyframeAnimation';

interface Props {
  size: ButtonSizeList;
}

const SkeletonDefaultButton: FC<Props> = ({ size }) => (
  <div css={[buttonStyle(size)]}>
    <div className="text" css={SkeletonKeyframeAnimation} />
  </div>
);

const buttonStyle = (size: ButtonSizeList) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;

  gap: 15px;
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);
  background-color: ${primaryLight};

  ${buttonSizeStyle[size]}
`;

const buttonSizeStyle = {
  SMALL: css`
    width: 150px;
    height: 60px;
    border-radius: 10px;
    font-size: 24px;
    line-height: 35px;

    .text {
      align-self: center;
      justify-self: center;
      width: 100px;
      height: 25px;
      background-color: ${grey2};
      border-radius: 10px;
    }
  `,
  MEDIUM: css`
    width: 300px;
    height: 80px;
    border-radius: 20px;
    font-size: 32px;
    line-height: 46px;
  `,
  LARGE: css`
    width: 500px;
    height: 100px;
    border-radius: 20px;
    font-size: 40px;
    line-height: 58px;
  `,
};

export default SkeletonDefaultButton;
