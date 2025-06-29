import { ButtonProps } from "@/lib/types";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-gray-500";
    case "outline":
      return "bg-transparent border border-primary-500 border-2";
    case "success":
      return "bg-emerald-500";
    case "danger":
      return "bg-rose-500";
    default:
      return "bg-transparent";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-500";
    case "secondary":
      return "text-gray-100";
    case "success":
      return "text-emerald-500";
    case "danger":
      return "text-rose-500";
    default:
      return "text-gray-900";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "default",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`p-4 w-full flex flex-row justify-center items-center rounded-full ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text
      className={`text-lg font-SemiBold ${getTextVariantStyle(textVariant)}`}
    >
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
