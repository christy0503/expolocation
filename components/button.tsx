import React from 'react';
import { Text, StyleSheet, Pressable, ButtonProps} from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

export default function Button(props:ButtonProps) {
  const { onPress, title = '1' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    },
  text: {
    fontSize: 25,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily:"RobotoCondensed_700Bold",
  },
});
