import { useProfile } from "@/context/ProfileContext";
import { ReportCardProps } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ReportsPageCardComponent = ({
  onPress,
  imageCid,
  userProfile,
  username,
  timestamp,
  title,
  category,
  description,
  location,
  comments,
}: ReportCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[320px] h-[350px] p-4 flex flex-col gap-y-6 bg-[#FBFDFC] rounded-2xl border border-gray-300 shadow-md shadow-neutral-400"
    >
      <Image
        source={imageCid}
        className="w-full h-[12rem] bg-gray-300 rounded-lg"
      />
      <View className="flex flex-col gap-y-2">
        <View className="flex flex-row items-center gap-x-2">
          <Image
            source={userProfile}
            className="w-6 h-6 rounded-full bg-gray-300"
          />
          <Text
            className="text-md text-primary-600 font-SemiBold"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {username}
          </Text>
          <Text className="text-md text-gray-500 font-SemiBold">•</Text>
          <Text className="text-md text-gray-500 font-SemiBold">
            {timestamp}
          </Text>
        </View>
        <Text className="text-lg font-Bold" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-md font-Regular" numberOfLines={1}>
          {description}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row flex-shrink items-center gap-x-1 max-w-[55%]">
          <Ionicons name="location-outline" size={20} color="#3E9E45" />
          <Text className="text-md font-SemiBold" numberOfLines={1}>
            {location}
          </Text>
        </View>
        <View className="flex-row flex-shrink items-center gap-x-4">
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="chatbubble-outline" size={20} color="#3E9E45" />
            <Text
              className="text-md font-SemiBold max-w-[50%]"
              numberOfLines={1}
            >
              {comments?.length ?? 0}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-1">
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={24}
              color="#3E9E45"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReportsCardComponent = ({
  onPress,
  imageCid,
  userProfile,
  username,
  timestamp,
  title,
  category,
}: ReportCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full p-4 bg-white rounded-2xl border border-gray-200 shadow-md shadow-neutral-400"
    >
      <View className="flex flex-row gap-x-4 items-center">
        <Image source={imageCid} className="w-24 h-24 rounded-lg bg-gray-200" />
        <View className="flex-1 flex-col gap-y-3">
          <Text className="text-xl font-Bold" numberOfLines={2}>
            {title}
          </Text>
          <View className="flex flex-row justify-between items-center">
            <View className="max-w-[45%] flex-1 flex-row gap-x-2">
              <Image
                source={userProfile}
                className="w-6 h-6 rounded-full bg-gray-200"
              />
              <Text
                className="text-md text-primary-600 font-SemiBold"
                numberOfLines={1}
              >
                {username}
              </Text>
            </View>
            <Text
              className="max-w-[50%] text-md text-gray-500 font-SemiBold"
              numberOfLines={1}
            >
              {timestamp}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { ReportsPageCardComponent, ReportsCardComponent };
