import { Easing, SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export const useGetAnimatedStyle = ({ animatedValue, duration }: { animatedValue: SharedValue<number>, duration: number }) => {
    const animated_style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(animatedValue.value, {
                        duration: duration,
                        easing: Easing.bounce,
                    }),
                },
            ],
        };
    });
    return animated_style;
}