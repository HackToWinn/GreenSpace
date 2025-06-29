import AuthLayout from "@/components/AuthLayout";
import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <AuthLayout>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="flex w-full items-end justify-end p-4"
      >
        <Text className="text-black text-md font-SemiBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        dot={
          <View className="mx-1 h-[8px] w-[8px] rounded-full bg-neutral-400"></View>
        }
        activeDot={
          <View className="mx-1 h-[8px] w-[32px] rounded-full bg-primary-500"></View>
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={index} className="flex-1 justify-center items-center p-1">
            <Image source={item.image} className="w-[300px] h-[300px]" />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="font-Bold text-3xl text-center mb-4">
                {item.title}
              </Text>
            </View>
            <Text className="font-Regular text-lg text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        bgVariant="primary"
        textVariant="secondary"
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-in")
            : swiperRef.current?.scrollBy(1)
        }
        className="mt-10 mb-12 w-11/12"
        IconLeft={() =>
          isLastSlide ? (
            <Ionicons
              name="rocket-outline"
              size={24}
              color="white"
              className="mr-2"
            />
          ) : null
        }
      />
    </AuthLayout>
  );
};

export default Onboarding;
