import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '~/components/Button';
import { PageContainer } from '~/components/PageContainer';
import { LogoutScreenNavigationProps } from '~/screens/Auth/LogoutScreen';
import { logout } from '~/slices/userSlice';
import { AppDispatch } from '~/store';

type Props = {
  navigation: LogoutScreenNavigationProps;
};

/** @package */
export const Logout: FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const cognitoLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);
  const logoutSubmit = useCallback(async () => {
    try {
      await cognitoLogout();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <PageContainer>
      <Button
        onPress={() => {
          void (async () => {
            await logoutSubmit();
          })();
        }}
      >
        ログアウト
      </Button>
    </PageContainer>
  );
};
