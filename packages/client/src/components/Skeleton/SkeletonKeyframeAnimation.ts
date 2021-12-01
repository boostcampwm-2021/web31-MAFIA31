/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { grey1, grey2 } from '@src/constants/colors';

const SkeletonKeyframeAnimation = css`
  animation: skeleton-gradient 1.8s infinite ease-in-out;

  @keyframes skeleton-gradient {
    0% {
      background-color: ${grey2};
    }

    50% {
      background-color: ${grey1};
    }

    100% {
      background-color: ${grey2};
    }
  }
`;
export default SkeletonKeyframeAnimation;
