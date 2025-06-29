import { TooltipProps } from "@/lib/types";
import { View, Text } from "react-native";
import CustomButton from "./CustomButton";

const TooltipContent = ({
  title,
  description,
  buttonText,
  onButtonPress,
}: TooltipProps) => {
  return (
    <View className="p-4">
      <Text className="font-Bold text-lg mb-1">{title}</Text>
      <Text className="font-Regular text-md mb-6">{description}</Text>
      <CustomButton
        title={buttonText}
        textVariant="primary"
        onPress={onButtonPress}
        className="self-end"
      />
    </View>
  );
};

export default TooltipContent;
