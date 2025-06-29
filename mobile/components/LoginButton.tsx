import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import CustomButton from "./CustomButton";
import { Ed25519KeyIdentity } from "@dfinity/identity";

export async function goToLogin() {
  try {
    const sessionIdentity = Ed25519KeyIdentity.generate();
    await AsyncStorage.setItem(
      "identity-key",
      JSON.stringify(sessionIdentity.toJSON())
    );
    const publicKeyDer = sessionIdentity.getPublicKey().toDer();
    const publicKeyHex = Buffer.from(publicKeyDer).toString("hex");
    const scheme =
      process.env.EXPO_PUBLIC_SCHEME_URL || "greenspace://(auth)/sign-in";
    const url =
      process.env.EXPO_PUBLIC_LOGIN_URL ||
      "https://greenspace.hacktowin.systems/login";

    return Linking.openURL(
      `${url}?sessionKey=${publicKeyHex}&scheme=${scheme}`
    );
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export default function LoginButton() {
  return (
    <CustomButton
      onPress={goToLogin}
      title={"Sign in with Internet Identity"}
      bgVariant={"primary"}
      textVariant={"secondary"}
      IconLeft={() => (
        <Ionicons name="log-in" size={22} color={"white"} className="mr-2" />
      )}
      className="mb-4"
    />
  );
}
