import { Grid } from '@mui/material';

const GuestLayout = ({ children }) => {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      className='h-screen p-0'
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        xl={4}
        className='p-0 px-5'
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default GuestLayout;
