import { useMemo } from 'react';

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
    scaleY: 0.8,
  },
  {
    scaleY: 0.95,
  },
  {
    scaleY: 0.65,
  },
];
