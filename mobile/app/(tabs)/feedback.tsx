import Layout from "@/components/Layout";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Feedback() {
  return (
    <Layout>
      <View className="mt-10">
        <Pressable className="flex-row gap-2">
          <Link href={"/(tabs)/profile"}>
            <Ionicons name="arrow-back-outline" size={24} />
          </Link>
          <Text className="text-xl font-normal text-gray-800 mb-6 ">
            Feedback
          </Text>
        </Pressable>
      </View>

      <View className="mx-4">
        <TextInput
          className="bg-white/70 p-4 rounded-lg h-40 text-base"
          placeholder="Tell us what you think..."
          multiline={true}
          textAlignVertical="top"
        />

        <TouchableOpacity
          className="bg-teal-500 mt-6 p-4 rounded-lg flex-row justify-center items-center"
          onPress={() => alert("Feedback Submitted! Thank you.")}
        >
          <FontAwesome name="send-o" size={20} color="white" />
          <Text className="text-white text-base font-semibold ml-3">
            Submit Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
