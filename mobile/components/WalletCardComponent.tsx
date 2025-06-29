import { useProfile } from "@/context/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";
import LoginButton from "./LoginButton";

const WalletCardComponent = () => {
  const { profile, userBalance } = useProfile();
  return (
    <View className="w-full bg-white p-6 rounded-xl shadow-md shadow-neutral-400 mb-6">
      {profile !== null ? (
        <>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-SemiBold text-gray-700">
              GreenSpace Token
            </Text>
          </View>
          <View>
            <Text className="text-4xl font-Bold text-gray-900 mb-6">
              {userBalance ?? 0} Token
            </Text>
            <CustomButton
              title={"Redeem Your Token"}
              bgVariant={"outline"}
              textVariant={"primary"}
              onPress={() => router.push("/(tabs)/Reward")}
              IconLeft={() => (
                <Ionicons
                  name="wallet-outline"
                  size={22}
                  color={"#4CAF50"}
                  className="mr-2"
                />
              )}
              className="mb-4"
            />
          </View>
        </>
      ) : (
        <View>
          <Text className="text-2xl text-center font-Bold text-gray-900 mb-6">
            Sign In To Continue
          </Text>
          <LoginButton />
        </View>
      )}
    </View>
  );
};

export default WalletCardComponent;
