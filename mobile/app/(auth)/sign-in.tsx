import AuthLayout from "@/components/AuthLayout";
import CustomButton from "@/components/CustomButton";
import LoginButton from "@/components/LoginButton";
import { useProfile } from "@/context/ProfileContext";
import loadIdentity from "@/lib/loadIdentity";
import saveDelegation from "@/lib/saveDelegation";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Text } from "react-native";

const SignIn = () => {
  const { loadUserData, profile } = useProfile();
  const params = useLocalSearchParams();
  async function handleRedirect() {
    if (params.delegation) {
      saveDelegation({ params });
      const identity = await loadIdentity();
      if (!identity.pubKey || !identity.delegation) {
        throw new Error("identity_not_loaded");
      }
      const data = await loadUserData();
      data
        ? router.replace("/(tabs)/home")
        : router.replace("/(auth)/profile-setup");
    }
  }

  useEffect(() => {
    handleRedirect();
  }, [router, params.delegation, loadUserData]);

  return (
    <AuthLayout>
      <Image
        source={require("@/assets/icons/ic-logo.png")}
        className="w-32 h-32 mb-4"
      />
      <Text className="font-Bold text-3xl text-center mb-4">
        Connect with Internet Identity
      </Text>
      <Text className="font-Regular text-lg text-center mb-12">
        Join our community of environmental advocates. Report and track
        ecological issues in your area to help create a greener future.
      </Text>
      <LoginButton />
      <CustomButton
        title="Explore Features First"
        textVariant="primary"
        onPress={() => router.replace("/(tabs)/home")}
        className="w-11/12"
      />
    </AuthLayout>
  );
};

export default SignIn;
