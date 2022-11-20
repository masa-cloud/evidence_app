import React, { FC } from 'react';

type Props = {
  children: (arg0: number) => unknown;
  numTimes: number;
};

/** @package */
export const Repeat: FC<Props> = (props) => {
  const items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <>{items}</>;
};
