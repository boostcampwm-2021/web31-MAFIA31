import { DefaultButton } from '@src/components/Button';
import { ButtonSizeList, ButtonThemeList } from '@src/components/Button/IconButton';
import Header from '@src/templates/Header';

const Waiting = () => {
  console.log(ButtonSizeList.MEDIUM);
  return (
    <>
      <Header />
      <DefaultButton text="READY" size={ButtonSizeList.MEDIUM} theme={ButtonThemeList.LIGHT} />
    </>
  );
};
export default Waiting;
