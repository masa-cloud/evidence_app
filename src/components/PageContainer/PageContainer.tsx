import { Box } from 'native-base';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/** @package */
export const PageContainer = (props: Props): JSX.Element => {
  return (
    <Box pt="4" px="4">
      {props.children}
    </Box>
  );
};
