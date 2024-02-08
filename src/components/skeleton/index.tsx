import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

interface Props {
  width: number | string;
  height: number | string;
  variant?: 'circle' | 'rect';
}

export const Skeleton: React.FC<Props> = ({
  height,
  width,
  variant = 'rect',
}) => {
  const opacity = useRef(new Animated.Value(0.3))

  let borderRadius = 0;

  if (variant === 'circle') {
    borderRadius = typeof height === 'string' ? parseInt(height) / 2 : height / 2;
  }

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity.current, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true
      })
    ])).start()
  }, [opacity])

  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          height,
          width,
          borderRadius
        },
        styles.skeleton
      ]}
    />
  )
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'gray'
  }
})