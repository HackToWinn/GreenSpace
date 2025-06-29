import Layout from "@/components/Layout";
import ProfilePicture from "@/components/ProfilePicture";
import { useProfile } from "@/context/ProfileContext";
import { ValidationErrors } from "@/lib/types";
import { router } from "expo-router";
import { JSX, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileSetup(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { addUser } = useProfile();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }
    try {
      await addUser({
        imageUri,
        username: username.trim(),
        email: email.trim(),
      });
      router.push("/(tabs)/home");
    } catch (error) {

      if (error instanceof Error && error.message === "identity_not_loaded") {
        router.push("/(auth)/sign-in");
        return;
      }
      console.error("Failed to add user:", error);
      return;
    }
  };

  const handleNameChange = (text: string): void => {
    setUsername(text);
    // Clear name error when user starts typing
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    // Clear email error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  return (
    <Layout disableHeader={true}>
      <SafeAreaView className="px-4">
        <Text className="font-bold text-4xl mb-2">Profile Setup</Text>
        <View className="items-center mt-10 mb-6">
          <ProfilePicture source={imageUri} externalSetUri={setImageUri} />
        </View>
        <View className="space-y-4">
          <View className="mb-5">
            <Text className="text-base font-medium mb-1">
              Name<Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={username}
              onChangeText={handleNameChange}
              placeholder="Enter your name"
              className={`border rounded-xl px-4 py-3 text-base bg-white ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.username}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-base font-medium mb-1">
              Email <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className={`border rounded-xl px-4 py-3 text-base bg-white ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            )}
          </View>
        </View>
        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-400 mt-8 rounded-xl py-3 items-center"
        >
          <Text className={`text-white font-semibold text-base`}>
            {isLoading ? "Loading..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Layout>
  );
}
