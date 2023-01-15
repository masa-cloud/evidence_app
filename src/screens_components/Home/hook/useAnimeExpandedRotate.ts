import { useMemo } from 'react';

type useAnimeExpandedRotateReturn = {
  position:
    | {
        rotate: string;
      }
    | undefined;
};

export const useAnimeExpandedRotate = (
  expanded: boolean,
): useAnimeExpandedRotateReturn => {
  const position = useMemo(() => positions[Number(expanded)], [expanded]);

  return {
    position,
  };
};

const positions = [
  {
    rotate: '0deg',
  },
  {
    rotate: '180deg',
  },
];
