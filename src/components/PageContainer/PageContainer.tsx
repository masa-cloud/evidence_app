import { Box } from 'native-base';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/** @package */
export const PageContainer: FC<Props> = (props) => {
  return (
    <Box pt="4" px="4">
      {props.children}
    </Box>
  );
};
