import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import AuthSignIn from '../../components/auth/AuthSignIn';

const SignIn = () => {
  const [value, setValue] = useState(0);

  const tabChangeHandelr = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={tabChangeHandelr}>
        <Tab label='Admin Login'></Tab>
        <Tab label='Employee Login'></Tab>
      </Tabs>
      <AuthSignIn
        hidden={value !== 0}
        id={`tabpanel-0`}
        aria-labelledby={`tab-0`}
        role='tabpanel'
        type='admin'
        title={'Admin Login'}
      />
      <AuthSignIn
        hidden={value !== 1}
        id={`tabpanel-1`}
        type='employee'
        aria-labelledby={`tab-1`}
        title={'Employee Login'}
      />
    </>
  );
};

export default SignIn;
