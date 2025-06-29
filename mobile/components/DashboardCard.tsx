import { DashboardCardProps } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function DashboardCard({
  title,
  value,
  iconName,
  onPress,
  isLoading,
}: DashboardCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-4 bg-white rounded-2xl shadow-md shadow-neutral-400 flex flex-col justify-between mb-4"
      style={{
        flexBasis: "48%",
        height: 140,
        flexGrow: 0,
        flexShrink: 0,
      }}
    >
      <Ionicons name={iconName} size={32} color="black" />
      <View>
        <Text className="text-xl font-Bold">{title}</Text>
        <View className="w-full flex flex-row justify-between items-center">
          {isLoading ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <Text className="text-md text-primary-700/80 font-Medium">
              {value}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
