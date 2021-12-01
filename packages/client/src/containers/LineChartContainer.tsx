import { useState, useLayoutEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useUserInfo } from '@src/contexts/userInfo';
import LineChart from '@components/Chart/LineChart';
import apiClient from '../axios/apiClient';

const LineChartContainer = () => {
  const { userInfo } = useUserInfo();
  const [scores, setScores] = useState([]);
  const getScores = async () => {
    const { data } = await apiClient.get(`/users/${userInfo?.userName}/scores`);
    console.log(data);
    setScores(
      data.scores.map(({ score, date }: any) => ({
        x: date.slice(0, 10),
        y: score,
      })),
    );
  };

  useLayoutEffect(() => {
    getScores();
  }, []);

  return (
    <div css={containerStyle}>
      <LineChart data={[{ id: userInfo?.userName, color: 'hsl(247, 70%, 50%)', data: scores }]} />
    </div>
  );
};

const containerStyle = css`
  height: 35vh;
`;

export default LineChartContainer;
