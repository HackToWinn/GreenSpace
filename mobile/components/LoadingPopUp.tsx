import { ActivityIndicator, Modal, Text, View } from "react-native";

export default function LoadingPopup({
  visible,
  text,
}: {
  visible: boolean;
  text?: string;
}) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center justify-center shadow-lg shadow-black">
          <ActivityIndicator animating={true} size="large" color="#74C490" />
          {text && (
            <Text className="mt-4 text-base text-primary">{text}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
