import { ProfileMenuItemProps } from "@/lib/types";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function ProfileMenuItem({
  onPress,
  icon,
  label,
  labelClassName = "text-gray-700",
  rightIconColor = "gray",
}: ProfileMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row justify-between items-center py-4 border-b border-gray-200"
    >
      <View className="flex-row gap-4 items-center ">
        {icon}
        <Text className={`text-base font-Regular ${labelClassName}`}>
          {label}
        </Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color={rightIconColor} />
    </Pressable>
  );
}
