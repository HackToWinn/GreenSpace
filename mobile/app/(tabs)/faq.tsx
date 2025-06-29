import Layout from "@/components/Layout";
import { faqs } from "@/lib/exampleData";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="border-b border-gray-300/50">
      <TouchableOpacity
        className="flex-row items-center justify-between p-4"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-base text-gray-800 w-11/12">{question}</Text>
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color="gray"
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="p-4 pt-0">
          <Text className="text-gray-600">{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function HelpAndSupport() {
  return (
    <Layout>
      <View className="mt-10">
        <Pressable className="flex-row gap-2">
          <Link href={"/(tabs)/profile"}>
            <Ionicons name="arrow-back-outline" size={24} />
          </Link>
          <Text className="text-xl font-normal text-gray-800 mb-6 ">
            Help & Support
          </Text>
        </Pressable>
      </View>

      <ScrollView className="mx-4 bg-white/50 rounded-xl">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </ScrollView>
    </Layout>
  );
}
