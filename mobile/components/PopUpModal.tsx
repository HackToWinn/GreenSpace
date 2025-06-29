import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

export interface ActionButton {
  text: string;
  onPress: () => void;
  style?: "primary" | "danger" | "default";
}

export interface ActionModalProps {
  visible: boolean;
  title: string;
  message: string;
  actions: ActionButton[];
  onClose?: () => void;
}

export default function ActionModal({
  visible,
  title,
  message,
  actions,
  onClose,
}: ActionModalProps) {
  const getButtonClass = (style: ActionButton["style"]) => {
    switch (style) {
      case "primary":
        return "bg-blue-600";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-gray-200";
    }
  };

  const getButtonTextClass = (style: ActionButton["style"]) => {
    return style === "primary" || style === "danger"
      ? "text-white"
      : "text-gray-800";
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 justify-center items-center bg-black/60 px-4"
      >
        <Pressable
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="p-6">
            <Text className="text-xl font-bold text-gray-800 text-center mb-2">
              {title}
            </Text>
            <Text className="text-base text-gray-600 text-center">
              {message}
            </Text>
          </View>

          <View className="flex-row border-t border-gray-200">
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.7}
                className={`flex-1 items-center justify-center py-4 ${
                  index > 0 ? "border-l border-gray-200" : ""
                }`}
              >
                <View
                  className={`px-4 py-2 rounded-lg ${getButtonClass(
                    action.style
                  )}`}
                >
                  <Text
                    className={`font-semibold text-base ${getButtonTextClass(
                      action.style
                    )}`}
                  >
                    {action.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
