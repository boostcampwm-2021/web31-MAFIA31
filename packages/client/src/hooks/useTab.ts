import { ReactElement, useState } from 'react';

export interface Tab {
  name: string;
  content: ReactElement;
}

const useTab = (initialIndex: number, allTabs: Tab[]) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return {
    currentTab: allTabs[currentIndex].content,
    changeTab: setCurrentIndex,
  };
};

export default useTab;
