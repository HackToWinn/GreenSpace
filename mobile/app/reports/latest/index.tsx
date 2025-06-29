import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { ReportsCardComponent } from "@/components/ReportCardComponent";
import { useLatestReports } from "@/hooks/useReports";
import Layout from "@/components/Layout";
import { router } from "expo-router";

const LatestReports = () => {
  const {
    data: latestReportsData = [],
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
    error: errorLatest,
  } = useLatestReports();

  if (isLoadingLatest) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#3E9E45" />
      </Layout>
    );
  }

  if (isErrorLatest) {
    return (
      <Text className="text-red-500">
        Error loading reports:{" "}
        {errorLatest?.message ?? "An unknown error occurred"}
      </Text>
    );
  }

  return (
    <View className="flex-1 px-8 pt-4 bg-[#FBFDFC]">
      <View className="flex flex-col gap-y-4">
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          data={latestReportsData}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            isLoadingLatest ? null : (
              <Text className="text-gray-500 text-center">
                There&apos;s no reports yet.
              </Text>
            )
          }
          renderItem={({ item }) => (
            <ReportsCardComponent
              id={item.id}
              onPress={() => router.push(`/reports/${item.id}`)}
              imageCid={{
                uri: `https://gateway.ipfs.io/ipfs/${item.imageCid}`,
              }}
              userProfile={{
                uri: `https://gateway.ipfs.io/ipfs/${item.userProfile}`,
              }}
              username={item.username}
              timestamp={new Date(item.timestamp).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              title={item.title}
              category={item.category}
            />
          )}
        />
      </View>
    </View>
  );
};

export default LatestReports;
