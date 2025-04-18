import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useGetAnimatedStyle } from "./lib/useGetAnimatedStyle";


export default function AnimatedStyleUpdateExample() {
  const top = useSharedValue(-1000);
  const textTop = useSharedValue(1000);


  const buttonTop = useSharedValue(-60);
  const buttonScale = useSharedValue(1);

  const btnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: buttonTop.value,
        },
        {
          scale: withSpring(buttonScale.value),
        },
      ],
    };
  });

  const style1 = useGetAnimatedStyle({ animatedValue: top, duration: 1000 });
  const style2 = useGetAnimatedStyle({ animatedValue: top, duration: 1200 });
  const style3 = useGetAnimatedStyle({ animatedValue: top, duration: 1400 });
  const style4 = useGetAnimatedStyle({ animatedValue: top, duration: 1600 });
  const style5 = useGetAnimatedStyle({ animatedValue: textTop, duration: 1800 });


  const animateStack = () => {
    buttonScale.value = withTiming(0, {
      duration: 300,
      easing: Easing.circle,
    }, () => {
      top.value = 0
      textTop.value = 0;
    });
  };

  const revertStack = () => {
    textTop.value = 1000;
    top.value = -1000;
    buttonScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bounce,
    });
  };

  return (
    <View
      style={styles.container}
    >

      <Pressable onPress={revertStack} style={{ left: 20 }}>
        <Animated.View
          style={[
            styles.box,
            { left: 20 },
            style4,
          ]}
        />

        <Animated.View
          style={[
            styles.box,
            { left: 5 },
            style3,
          ]}
        />

        <Animated.View
          style={[
            styles.box,
            { left: -15 },
            style2,
          ]}
        />

        <Animated.View
          style={[
            styles.box,
            { left: -30 },
            style1,
          ]}
        />

      </Pressable>
      <Animated.View style={style5}>
        <Text style={styles.textStackoverflow}>
          StackOverFlow.com
        </Text>
      </Animated.View>


      <Animated.View style={btnStyle}>
        <Pressable onPress={animateStack}>
          <Text style={styles.textPressMe}>
            Press Me
          </Text>
        </Pressable>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 16,
    width: 130,
    backgroundColor: "hsl(27, 89%, 48%)",
    marginBottom: 5,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  textStackoverflow: { fontSize: 20, color: "black", marginTop: 10, fontWeight: "800", fontFamily: "courier" },
  textPressMe: { fontSize: 30, color: "navy", marginTop: 20, fontWeight: "600" }
});
