import { ReactElement, useState } from 'react';

export interface Tab {
  name: string;
  content: ReactElement;
}

const useTab = (initialIndex: number, allTabs: Tab[]) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(initialIndex);

  return {
    currentTab: allTabs[currentTabIndex],
    changeTab: setCurrentTabIndex,
  };
};

export default useTab;
