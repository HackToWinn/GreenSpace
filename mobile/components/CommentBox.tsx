import { ReportComments } from "@/lib/types";
import { View, Image, Text } from "react-native";

const CommentBox = ({
  userProfile,
  username,
  date,
  comment,
}: ReportComments) => {
  return (
    <View className="mb-6">
      <View className="flex flex-col gap-y-2">
        <View className="flex flex-row items-center gap-x-2">
          <Image source={userProfile} className="w-8 h-8 rounded-full" />
          <View className="flex flex-col">
            <Text className="text-sm text-gray-900 font-Bold">{username}</Text>
            <Text className="text-sm">{new Date(date).toLocaleString()}</Text>
          </View>
        </View>
        <View>
          <Text className="text-md font-Medium">{comment}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentBox;
