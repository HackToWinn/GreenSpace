import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, UnknownOutputParams } from "expo-router";

export default function saveDelegation(
  { params }: { params: UnknownOutputParams } = { params: {} }
) {
  if (params.delegation) {
    const saveDelegation = async () => {
      try {
        const delegationParam = params.delegation;
        await AsyncStorage.setItem(
          "delegation",
          JSON.stringify(delegationParam)
        );
      } catch (e) {
        console.error("Failed to save delegation:", e);
        return;
      }
    };
    saveDelegation();
  }
}
