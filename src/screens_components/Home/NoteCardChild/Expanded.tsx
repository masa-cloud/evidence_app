// import { SimpleLineIcons } from '@expo/vector-icons';
// import { useTheme } from '@react-navigation/native';
// import { FC, useCallback, useState } from "react";
// import { useDispatch } from 'react-redux';
// import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types';
// import { Stack } from "tamagui";

// import { updateEmoji } from '~/slices/noteSlice';
// import { AppDispatch } from '~/store';

// type ExpandedProps = {
//   ids: number[];
//   storeExpanded: string | undefined;
// };

// /** @package */
// export const Expanded: FC<ExpandedProps> = (props) => {
//   const { colors } = useTheme();
//   const dispatch: AppDispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const handlePick = useCallback(
//     (emojiObject: EmojiType): void => {
//       // setEmoji(emojiObject.emoji)
//       dispatch(updateEmoji({ emoji: emojiObject.emoji, ids: props.ids }));
//     },
//     [props.ids],
//   );

//   return (
//     <>
//         <Stack boc={colors.primary}>
//           {expanded ? (
//             <SimpleLineIcons
//               onPress={() => {
//                 setExpanded((prevExpanded) => !prevExpanded);
//                 fadeIn();
//               }}
//               name="arrow-up"
//               size={20}
//               color={colors.text}
//               px={12 - 4 * (note.level + 1)}
//             />
//           ) : (
//             <SimpleLineIcons
//               onPress={() => {
//                 setExpanded((prevExpanded) => !prevExpanded);
//                 fadeOut();
//               }}
//               name="arrow-down"
//               size={20}
//               color={colors.text}
//               px={12 - 4 * (note.level + 1)}
//             />
//           )}
//         </Stack>
//     </>
//   )
// }
