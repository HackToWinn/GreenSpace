import Layout from "@/components/Layout";
import { SafeAreaView, Text, View, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { rewards } from "@/lib/exampleData";

export default function reward() {
  return (
    <Layout>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="font-Bold text-4xl mb-2">Redeem Token</Text>

          {/* Balance Section */}
          <View
            className="rounded-xl p-6 shadow-sm border border-gray-200 mt-4"
            style={{ backgroundColor: "#B6F500" }}
          >
            <View
              className="rounded-full p-2 bg-white justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            >
              <Text className="text-2xl text-center font-Bold">
                Token Balance
              </Text>
            </View>

            <View className="items-center justify-center mt-4 flex-row space-x-2">
              <FontAwesome5
                className="mr-2"
                name="coins"
                size={30}
                color="#16610E"
              />
              <Text
                className="text-5xl font-bold text-center"
                style={{ color: "#16610E" }}
              >
                55
              </Text>
            </View>
          </View>

          {/* Rewards List - 2 items per row */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 24,
              paddingHorizontal: 4,
            }}
          >
            {rewards.map((item) => (
              <View
                key={item.id}
                style={{
                  width: "48%",
                  marginBottom: 16,
                  borderRadius: 12,
                  overflow: "hidden",
                  backgroundColor: "#1E4012",
                }}
              >
                <View className="items-center p-4">
                  <Image
                    source={item.image}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
                <View className="flex-row items-center justify-between px-4 py-2 bg-lime-400">
                  <View className="flex-row items-center">
                    <FontAwesome5 name="coins" size={16} color="#000" />
                    <Text className="ml-1 text-base font-semibold text-black">
                      {item.cost}
                    </Text>
                  </View>
                  <View className="bg-black rounded-full px-3 py-1">
                    <Text className="text-white text-sm">Redeem</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
