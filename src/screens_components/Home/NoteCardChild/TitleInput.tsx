// import { FC, useMemo, useState } from 'react';
// import { StyleSheet } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { TextArea } from 'tamagui';

// import { useColors } from '~/lib/constants';
// import { updateTitle } from '~/slices/noteSlice';
// import { AppDispatch } from '~/store';

// type TitleInputProps = {
//   ids: number[];
//   storeTitle: string;
// };

// /** @package */
// export const TitleInput: FC<TitleInputProps> = (props) => {
//   const dispatch: AppDispatch = useDispatch();
//   const [title, setTitle] = useState<string>(props.storeTitle);
//   const { colors } = useColors();
//   const styles = useMemo(
//     () =>
//       StyleSheet.create({
//         focusTitleStyle: {
//           borderColor: colors.text,
//           borderRadius: 4,
//           borderStyle: 'dashed',
//           borderWidth: 2,
//           paddingVertical: 0,
//         },
//         titleTextInputStyle: {
//           alignItems: 'center',
//           color: colors.text,
//           flex: 1,
//           fontSize: 18,
//           fontWeight: 'bold',
//           paddingVertical: 4,
//         },
//       }),
//     [],
//   );
//   return (
//     <TextArea
//       style={styles.titleTextInputStyle}
//       focusStyle={styles.focusTitleStyle}
//       bg={colors.primary}
//       py={2}
//       px={4}
//       bw={0}
//       value={title ?? ''}
//       multiline={true}
//       onChangeText={(title) => setTitle(title)}
//       autoCapitalize="none"
//       onEndEditing={() => dispatch(updateTitle({ title, ids: props.ids }))}
//     />
//   );
// };
