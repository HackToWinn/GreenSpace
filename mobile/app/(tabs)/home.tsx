import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LeafletView } from "react-native-leaflet-view";
import Tooltip from "react-native-walkthrough-tooltip";

import CustomButton from "@/components/CustomButton";
import DashboardCard from "@/components/DashboardCard";
import Layout from "@/components/Layout";
import TooltipContent from "@/components/TooltipContent";
import { dashboardCards as initialDashboardCards } from "@/constants";
import { useCamera } from "@/context/CameraContext";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import {
  getMostReportedCategories,
  getReports,
  getWeekReports,
} from "@/lib/api";
import { eventBus } from "@/lib/eventBus";
import { tooltipContents } from "@/lib/exampleData";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export default function Home() {
  const { location, loading, errorMsg, refreshLocation } = useCurrentLocation();
  const [dashboardCards, setDashboardCards] = useState(initialDashboardCards);
  const { openCameraModal } = useCamera();
  const [tooltipStep, setTooltipStep] = useState(1);
  const tooltipVisible =
    tooltipStep > 0 && tooltipStep <= tooltipContents.length;
  const [webViewContent, setWebViewContent] = useState<string | null>(null);

  // Queries
  const { data: reportsData, refetch: refetchReports } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });
  const { data: weekReportsData, refetch: refetchWeekReports } = useQuery({
    queryKey: ["week-reports"],
    queryFn: getWeekReports,
  });
  const { data: mostCategoryData, refetch: refetchMostCategory } = useQuery({
    queryKey: ["most-category-reports"],
    queryFn: getMostReportedCategories,
  });

  // Refetch reports on report created
  useEffect(() => {
    const handler = () => {
      refetchReports();
      refetchWeekReports();
      refetchMostCategory();
    };
    eventBus.on("report:created", handler);
    return () => eventBus.off("report:created", handler);
  }, [refetchMostCategory, refetchReports, refetchWeekReports]);

  // Update dashboard cards
  useEffect(() => {
    if (weekReportsData && reportsData) {
      const reports = reportsData.reports ? reportsData.reports.length : 0;
      const reportsThisWeek = weekReportsData.reports
        ? weekReportsData.reports.length
        : 0;
      const mostCategory = mostCategoryData?.category || "Unknown";

      setDashboardCards((prev) =>
        prev.map((card) => {
          if (card.title === "Total Reports") {
            return { ...card, value: reports, isLoading: false };
          }
          if (card.title === "Reports This Week") {
            return { ...card, value: reportsThisWeek, isLoading: false };
          }
          if (card.title === "Most Reported Category") {
            return { ...card, value: mostCategory, isLoading: false };
          }
          return card;
        })
      );
    }
  }, [weekReportsData, reportsData, mostCategoryData]);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert("Error loading HTML", JSON.stringify(error));
        console.error("Error loading HTML:", error);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!webViewContent) {
    return <ActivityIndicator size="large" color="green" />;
  }

  return (
    <Layout>
      <Tooltip
        isVisible={tooltipVisible}
        placement="center"
        useReactNativeModal
        contentStyle={{ height: 170 }}
        content={
          tooltipVisible ? (
            <TooltipContent
              title={tooltipContents[tooltipStep - 1].title}
              description={tooltipContents[tooltipStep - 1].description}
              buttonText={tooltipContents[tooltipStep - 1].buttonText}
              onButtonPress={() =>
                setTooltipStep(
                  tooltipStep < tooltipContents.length ? tooltipStep + 1 : 0
                )
              }
            />
          ) : undefined
        }
        onClose={() => setTooltipStep(0)}
      >
        <View />
      </Tooltip>

      <View className="flex flex-col items-start gap-y-4">
        <Text className="font-Bold text-4xl">Dashboard</Text>

        {/* Location Section */}
        <View className="flex flex-row items-start gap-x-2">
          <Ionicons
            name="location-outline"
            size={24}
            color="#3E9E45"
            className="mt-1"
          />
          <View className="flex flex-col pr-8">
            <View className="w-full flex flex-row items-center justify-between">
              <Text className="font-SemiBold text-md text-primary-600">
                Your Location
              </Text>
              <TouchableOpacity
                onPress={refreshLocation}
                className="p-1"
                disabled={loading}
              >
                <Ionicons
                  name={loading ? "refresh" : "refresh-outline"}
                  size={18}
                  color="#3E9E45"
                />
              </TouchableOpacity>
            </View>
            {loading ? (
              <View className="flex flex-row items-center gap-x-2">
                <ActivityIndicator size="small" color="#3E9E45" />
                <Text className="font-Medium text-sm text-gray-500">
                  Getting location...
                </Text>
              </View>
            ) : (
              <Text
                className="font-Bold text-md"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location?.address || "Location not available"}
              </Text>
            )}
            {errorMsg && (
              <Text className="font-Medium text-xs text-red-500">
                {errorMsg}
              </Text>
            )}
          </View>
        </View>

        {/* Map Section */}
        <View
          style={{ width: "100%", height: 160 }}
          className="rounded-2xl overflow-hidden border border-gray-200 mb-2"
        >
          {loading ? (
            <View className="flex-1 justify-center items-center bg-gray-100">
              <ActivityIndicator size="large" color="#3E9E45" />
              <Text className="mt-2 text-gray-600">Loading map...</Text>
            </View>
          ) : location ? (
            <>
              <LeafletView
                renderLoading={() => (
                  <ActivityIndicator size="large" color="green" />
                )}
                mapCenterPosition={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
                zoom={16}
                zoomControl
                attributionControl={false}
                mapMarkers={[
                  {
                    id: "current-location",
                    position: {
                      lat: location.latitude,
                      lng: location.longitude,
                    },
                    icon: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                    size: [24, 36],
                    iconAnchor: [16, 41],
                    title: "Clicked Location",
                  },
                ]}
                doDebug={false}
                source={{ html: webViewContent }}
              />
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/full-map-screen")}
                className="mt-2 mr-2 self-end p-2 bg-white rounded-lg"
              >
                <Ionicons name="scan-outline" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </>
          ) : (
            <View className="flex-1 justify-center items-center bg-gray-100">
              <Ionicons name="location-outline" size={40} color="#9CA3AF" />
              <Text className="mt-2 text-gray-600">Unable to load map</Text>
            </View>
          )}
        </View>

        {/* Dashboard Cards */}
        <View className="flex flex-row flex-wrap justify-between w-full">
          {dashboardCards.map((item, idx) => (
            <DashboardCard
              key={idx}
              {...item}
              isLoading={item.title === "Reports This Week" && loading}
            />
          ))}
        </View>

        {/* Action Button */}
        <View className="w-full">
          <CustomButton
            title="Report an Issue"
            bgVariant="primary"
            textVariant="secondary"
            IconLeft={() => (
              <Ionicons
                name="clipboard-outline"
                size={24}
                color="white"
                className="mr-2"
              />
            )}
            onPress={openCameraModal}
          />
        </View>
      </View>
    </Layout>
  );
}
