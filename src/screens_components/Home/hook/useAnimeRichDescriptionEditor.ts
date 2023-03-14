import { useMemo } from 'react';
import { _HEIGHT } from '~/lib/constants';

type useAnimeRichDescriptionEditorReturn = {
  position:
    | {
        scaleY: number;
      }
    | undefined;
};

export const useAnimeRichDescriptionEditor = (
  snapPointNumber: number,
): useAnimeRichDescriptionEditorReturn => {
  const position = useMemo(
    () => positions[Number(snapPointNumber)],
    [snapPointNumber],
  );

  return {
    position,
  };
};

const positions = [
  {
    height: _HEIGHT * 0.8,
  },
  {
    height: _HEIGHT * 0.95,
  },
  {
    height: _HEIGHT * 0.65,
  },
];
