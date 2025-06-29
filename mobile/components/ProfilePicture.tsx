import { useImagePicker } from "@/hooks/useImagePicker";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";

const ProfilePicture = ({
  externalSetUri,
  source,
}: {
  externalSetUri?: (uri: string) => void;
  source: string;
}) => {
  const {
    imageUri,
    pickFromGallery,
    takePhoto,
    modalVisible,
    setModalVisible,
  } = useImagePicker();
  useEffect(() => {
    if (imageUri) {
      fetch(imageUri)
        .then((res) => res.blob())
        .then((blob) => {
          const sizeInBytes = blob.size;
          const sizeInKB = (sizeInBytes / 1024).toFixed(2);
          const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        })
        .catch((err) => {
          console.log("Failed to get image file size:", err);
        });
    }
  }, [imageUri]);

  useEffect(() => {
    if (externalSetUri && imageUri !== null) {
      externalSetUri(imageUri);
    }
  }, [imageUri, externalSetUri]);

  return (
    <>
      <View className="relative">
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : source && source.startsWith("http")
              ? { uri: source }
              : require("@/assets/images/profile/profil_gg.jpg")
          }
          className="w-24 h-24 rounded-full mb-4"
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-4 right-0 bg-primary-500 w-6 h-6 rounded-full items-center justify-center"
        >
          <Ionicons name="pencil-outline" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center">
          <View className="bg-white rounded-xl p-4 w-3/4">
            <CustomButton title="Take a Photo" onPress={takePhoto} />
            <CustomButton
              title="Choose from Gallery"
              onPress={pickFromGallery}
            />
            <CustomButton
              title="Cancel"
              onPress={() => setModalVisible(false)}
              textVariant="danger"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfilePicture;
