import Layout from "@/components/Layout";
import { ReportsCardComponent } from "@/components/ReportCardComponent";
import { useProfile } from "@/context/ProfileContext";
import { useMyReports } from "@/hooks/useReports";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, View, Text } from "react-native";

const YourReports = () => {
  const {
    data: myReportsData = [],
    isLoading: isLoadingMyReports,
    isError: isErrorMyReports,
    error: errorMyReports,
  } = useMyReports();
  const { profile } = useProfile();

  if (isLoadingMyReports) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#3E9E45" />
      </Layout>
    );
  }

  if (isErrorMyReports) {
    return (
      <Text className="text-red-500">
        Error loading reports:{" "}
        {errorMyReports?.message ?? "An unknown error occurred"}
      </Text>
    );
  }

  return (
    <View className="flex-1 px-8 pt-4 bg-[#FBFDFC]">
      <View className="flex flex-col gap-y-4">
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          data={myReportsData.report}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <ReportsCardComponent
                id={item.id}
                onPress={() => router.push(`/reports/${item.id}`)}
                imageCid={{
                  uri: item.imageCid,
                }}
                userProfile={{
                  uri: profile?.pictureCid || "unknown",
                }}
                username={profile?.username || "unknown"}
                timestamp={new Date(
                  parseInt(item.timestamp) / 1000000
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                title={item.title}
                description={item.description}
                location={item.location.replace(/"/g, "")}
              />
            </>
          )}
        />
      </View>
    </View>
  );
};

export default YourReports;
