import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/(auth)/onboarding"} />;
}
