import { Avatar, Stack } from '@mui/material';
import React from 'react';

const UserInfoAvatar = ({ userInfo }) => {
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      className='pt-10 pb-5'
      gap={2}
    >
      <Avatar />
      {userInfo?.name}
    </Stack>
  );
};

export default UserInfoAvatar;
