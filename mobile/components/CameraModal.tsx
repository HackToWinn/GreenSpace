import { useProfile } from "@/context/ProfileContext";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { createReport } from "@/lib/api";
import { eventBus } from "@/lib/eventBus";
import loadIdentity from "@/lib/loadIdentity";
import { CameraModalProps } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraModal({ visible, onClose }: CameraModalProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getBalance } = useProfile();
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);
  const { location } = useCurrentLocation();

  // Reset state on modal close
  const handleClose = () => {
    setCapturedImage(null);
    onClose();
  };

  const toggleCameraFacing = () =>
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  const toggleFlash = () => setFlash((prev) => (prev === "off" ? "on" : "off"));

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: false,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
        console.error("Error taking picture:", error);
      }
    }
  };

  const savePicture = async () => {
    setIsLoading(true);

    const { pubKey, delegation } = await loadIdentity();
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Media library permission is required to save photos."
      );
      return;
    }
    if (capturedImage) {
      try {
        const asset = await MediaLibrary.createAssetAsync(capturedImage);
        const metadata = await MediaLibrary.getAssetInfoAsync(asset.id);


        const fileUri = metadata.localUri || metadata.uri || "";
        const extension = fileUri.split(".").pop()?.toLowerCase() || "jpg";
        let mimeType = "image/jpeg";

        if (extension === "png") mimeType = "image/png";
        else if (extension === "webp") mimeType = "image/webp";

        const formData = new FormData();
        formData.append("image", {
          uri: fileUri,
          name: `photo.${extension}`,
          type: mimeType,
        } as any);
        formData.append("location", JSON.stringify(location));
        formData.append("delegation", JSON.stringify(delegation));
        formData.append("identity", JSON.stringify(pubKey));

        const response = await createReport({ body: formData });
        if (!response) {
          Alert.alert("Error", "Failed to save photo to the server.");
          return;
        }
        eventBus.emit("report:created");
        setCapturedImage(null);
        getBalance();
        onClose();
      } catch (error) {
        console.error("Error saving photo:", error);
        Alert.alert("Error", "An error occurred while saving the photo.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const retakePicture = () => setCapturedImage(null);

  // Permission loading fallback
  if (!permission) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" statusBarTranslucent>
        <SafeAreaView className="flex-1 bg-black">
          <View className="flex-1 justify-center items-center p-5 bg-white">
            <Ionicons name="camera-outline" size={80} color="#666" />
            <Text className="text-2xl font-bold mt-5 mb-2 text-center">
              Camera Permission Required
            </Text>
            <Text className="text-lg text-gray-500 text-center mb-5">
              We need access to your camera to take photos
            </Text>
            <TouchableOpacity
              className="bg-blue-500 px-5 py-2 rounded-full mb-2"
              onPress={requestPermission}
            >
              <Text className="text-white text-lg font-bold">
                Grant Permission
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-2" onPress={handleClose}>
              <Text className="text-gray-500 text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  // Main Camera Modal
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView className="flex-1">
        {isLoading && (
          <View className="absolute z-50 top-0 left-0 right-0 bottom-0 bg-black/70 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4 text-lg">Send...</Text>
          </View>
        )}
        {capturedImage ? (
          <View className="flex-1">
            <Image source={{ uri: capturedImage }} className="flex-1 w-full" />
            <View className="flex-row justify-around items-center py-5 bg-black/80">
              <ModalButton
                icon="refresh-outline"
                label="Retake"
                onPress={retakePicture}
              />
              <ModalButton
                icon="download-outline"
                label="Send"
                onPress={savePicture}
              />
              <ModalButton
                icon="close-outline"
                label="Close"
                onPress={handleClose}
              />
            </View>
          </View>
        ) : (
          <CameraView
            ref={cameraRef}
            className="flex-1"
            facing={facing}
            style={{ height: "100%" }}
            flash={flash}
          >
            <SafeAreaView className="flex-1 justify-between bg-transparent">
              <View className="flex-row justify-between items-center px-5 py-2 bg-black/50">
                <TouchableOpacity
                  className="w-10 h-10 justify-center items-center"
                  onPress={handleClose}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Camera</Text>
                <TouchableOpacity
                  className="w-10 h-10 justify-center items-center"
                  onPress={toggleFlash}
                >
                  <Ionicons
                    name={flash === "on" ? "flash" : "flash-off"}
                    size={24}
                    color={flash === "on" ? "#FFD700" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <View className="self-center w-48 h-48 border-2 border-white rounded-lg" />
              <View className="flex-row justify-between items-center px-5 py-2 bg-black/80">
                <TouchableOpacity
                  className="w-12 h-12 justify-center items-center"
                  onPress={toggleCameraFacing}
                >
                  <Ionicons
                    name="camera-reverse-outline"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-16 h-16 rounded-full bg-white/30 justify-center items-center border-4 border-white"
                  onPress={takePicture}
                >
                  <View className="w-12 h-12 rounded-full bg-white" />
                </TouchableOpacity>
                <View className="w-12 h-12" />
              </View>
            </SafeAreaView>
          </CameraView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

// Extracted button for clarity
function ModalButton({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity className="items-center p-2" onPress={onPress}>
      <Ionicons name={icon} size={24} color="white" />
      <Text className="text-white text-xs mt-1">{label}</Text>
    </TouchableOpacity>
  );
}
