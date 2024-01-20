import { Box } from '@mui/material';
import NotFoundImg from '../../assets/page-not-found.svg';
const NotFound = () => {
  return (
    <Box width={'100%'}>
      <img src={NotFoundImg} alt='404'></img>
    </Box>
  );
};

export default NotFound;
