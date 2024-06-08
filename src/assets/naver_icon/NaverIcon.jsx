import { Box, Icon } from '@mui/material';
import naver_button from './naver_button.svg';

const NaverIcon = () => {
  return (
    <Icon
      sx={{
        marginTop: '-2px',
        width: '20px',
        height: '30px',
      }}
    >
      <Box
        component="img"
        src={naver_button}
        sx={{
          width: '15px',
          height: '15px',
        }}
      />
    </Icon>
  );
};

export default NaverIcon;
