import Layout from "@/components/Layout";
import TooltipContent from "@/components/TooltipContent";
import { CategoryData, ChartData, TrendData } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";
import Tooltip from "react-native-walkthrough-tooltip";

export default function Statistics() {
  const [showDetail, setShowDetail] = useState(false);
  const [filterTrend, setFilterTrend] = useState("daily");
  const [selectedDay, setSelectedDay] = useState("Jan");
  const [selectedYear, setSelectedYear] = useState("2024");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const chartFadeAnim = useRef(new Animated.Value(1)).current;

  // Available years
  const availableYears = ["2022", "2023", "2024"];

  // Data statistik bencana bulanan per tahun (dalam jumlah kejadian)
  const yearlyData = {
    "2024": [
      { value: 12, label: "Jan" },
      { value: 8, label: "Feb" },
      { value: 15, label: "Mar" },
      { value: 22, label: "Apr" },
      { value: 18, label: "Mei" },
      { value: 25, label: "Jun" },
      { value: 30, label: "Jul" },
      { value: 35, label: "Agu" },
      { value: 28, label: "Sep" },
      { value: 20, label: "Okt" },
      { value: 16, label: "Nov" },
      { value: 14, label: "Des" },
    ],
    "2023": [
      { value: 10, label: "Jan" },
      { value: 14, label: "Feb" },
      { value: 18, label: "Mar" },
      { value: 16, label: "Apr" },
      { value: 20, label: "Mei" },
      { value: 24, label: "Jun" },
      { value: 28, label: "Jul" },
      { value: 32, label: "Agu" },
      { value: 26, label: "Sep" },
      { value: 22, label: "Okt" },
      { value: 18, label: "Nov" },
      { value: 12, label: "Des" },
    ],
    "2022": [
      { value: 8, label: "Jan" },
      { value: 12, label: "Feb" },
      { value: 16, label: "Mar" },
      { value: 20, label: "Apr" },
      { value: 15, label: "Mei" },
      { value: 22, label: "Jun" },
      { value: 26, label: "Jul" },
      { value: 30, label: "Agu" },
      { value: 24, label: "Sep" },
      { value: 18, label: "Okt" },
      { value: 14, label: "Nov" },
      { value: 10, label: "Des" },
    ],
  };

  const categoryData: CategoryData[] = [
    {
      title: "Air Pollution",
      value: 30,
      chartData: [
        { value: 5 },
        { value: 3 },
        { value: 4 },
        { value: 6 },
        { value: 12 },
      ],
      changes: "+5",
    },
    {
      title: "Water Pollution",
      value: 15,
      chartData: [
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 1 },
      ],
      changes: "-2",
    },
    {
      title: "Deforestation",
      value: 25,
      chartData: [
        { value: 6 },
        { value: 5 },
        { value: 7 },
        { value: 4 },
        { value: 3 },
      ],
      changes: "+3",
    },
    {
      title: "Waste Management",
      value: 20,
      chartData: [
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 3 },
        { value: 2 },
      ],
      changes: "+1",
    },
  ];

  const trendsData: { [range: string]: TrendData[] } = {
    daily: [
      { value: 5 },
      { value: 3 },
      { value: 2 },
      { value: 1 },
      { value: 1 },
    ],
    weekly: [
      { value: 4 },
      { value: 3 },
      { value: 2 },
      { value: 1 },
      { value: 4 },
    ],
    monthly: [
      { value: 8 },
      { value: 6 },
      { value: 4 },
      { value: 1 },
      { value: 5 },
    ],
  };

  const detailData: {
    [year: string]: {
      [month: string]: ChartData[];
    };
  } = {
    "2024": {
      Jan: [
        { value: 5, label: "Flood" },
        { value: 3, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Feb: [
        { value: 4, label: "Flood" },
        { value: 2, label: "Landslide" },
        { value: 1, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Mar: [
        { value: 8, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Apr: [
        { value: 12, label: "Flood" },
        { value: 6, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Mei: [
        { value: 10, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jun: [
        { value: 15, label: "Flood" },
        { value: 7, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jul: [
        { value: 18, label: "Flood" },
        { value: 8, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Agu: [
        { value: 20, label: "Flood" },
        { value: 10, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Sep: [
        { value: 16, label: "Flood" },
        { value: 8, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Okt: [
        { value: 12, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Nov: [
        { value: 9, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Des: [
        { value: 8, label: "Flood" },
        { value: 3, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
    },
    "2023": {
      Jan: [
        { value: 4, label: "Flood" },
        { value: 3, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Feb: [
        { value: 7, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Mar: [
        { value: 10, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Apr: [
        { value: 9, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Mei: [
        { value: 12, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jun: [
        { value: 14, label: "Flood" },
        { value: 6, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jul: [
        { value: 16, label: "Flood" },
        { value: 8, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Agu: [
        { value: 18, label: "Flood" },
        { value: 9, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Sep: [
        { value: 15, label: "Flood" },
        { value: 7, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Okt: [
        { value: 13, label: "Flood" },
        { value: 6, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Nov: [
        { value: 11, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Des: [
        { value: 7, label: "Flood" },
        { value: 3, label: "Landslide" },
        { value: 1, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
    },
    "2022": {
      Jan: [
        { value: 3, label: "Flood" },
        { value: 2, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Feb: [
        { value: 6, label: "Flood" },
        { value: 3, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Mar: [
        { value: 9, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Apr: [
        { value: 11, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Mei: [
        { value: 8, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jun: [
        { value: 13, label: "Flood" },
        { value: 6, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Jul: [
        { value: 15, label: "Flood" },
        { value: 7, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Agu: [
        { value: 17, label: "Flood" },
        { value: 8, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 1, label: "Strong Wind" },
      ],
      Sep: [
        { value: 14, label: "Flood" },
        { value: 6, label: "Landslide" },
        { value: 3, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Okt: [
        { value: 10, label: "Flood" },
        { value: 5, label: "Landslide" },
        { value: 2, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Nov: [
        { value: 8, label: "Flood" },
        { value: 4, label: "Landslide" },
        { value: 1, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
      Des: [
        { value: 6, label: "Flood" },
        { value: 2, label: "Landslide" },
        { value: 1, label: "Earthquake" },
        { value: 1, label: "Fire" },
        { value: 0, label: "Strong Wind" },
      ],
    },
  };

  const monthNames: { [key: string]: string } = {
    Jan: "Januari",
    Feb: "Februari",
    Mar: "Maret",
    Apr: "April",
    Mei: "Mei",
    Jun: "Juni",
    Jul: "Juli",
    Agu: "Agustus",
    Sep: "September",
    Okt: "Oktober",
    Nov: "November",
    Des: "Desember",
  };

  const getCurrentYearData = () => {
    return (
      yearlyData[selectedYear as "2024" | "2023" | "2022"] || yearlyData["2024"]
    );
  };

  const toggleDetail = () => {
    if (!showDetail) {
      setShowDetail(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowDetail(false);
        setSelectedDay("Jan");
      });
    }
  };

  type Day =
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";

  const handleDayChange = (day: Day) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectedDay(day);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  type Year = "2024" | "2023" | "2022";

  const handleYearChange = (year: Year) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectedYear(year);
      setSelectedDay("Jan"); // Set to first month when changing year
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const getCurrentChartData = () => {
    return (
      detailData[selectedYear]?.[selectedDay] ||
      detailData[selectedYear]?.["Jan"] ||
      []
    );
  };

  const handleFilterChange = (filter: string) => {
    setFilterTrend(filter);
    Animated.timing(chartFadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(chartFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 100);
    });
  };

  const getTrendChartData = () => {
    return trendsData[filterTrend] || [];
  };

  const getTrendChartColor = () => {
    const data = trendsData[filterTrend];
    if (data && data.length >= 2) {
      const lastValue = data[data.length - 1].value;
      const previousValue = data[data.length - 2].value;

      if (lastValue > previousValue) {
        return "#10B981"; // Green for increase
      } else if (lastValue < previousValue || lastValue === previousValue) {
        return "#EF4444"; // Red for decrease
      }
    }

    return "#F59E0B"; // Yellow/amber
  };

  const getChartTitle = () => {
    return `${selectedYear} - ${monthNames[selectedDay]}`;
  };

  const [tooltipStep, setTooltipStep] = useState(0);

  useEffect(() => {
    setTooltipStep(1);
  }, []);

  return (
    <Layout className="pt-4 h-full">
      <Tooltip
        isVisible={tooltipStep === 1}
        placement="center"
        useReactNativeModal={true}
        contentStyle={{ height: 184 }}
        content={
          <TooltipContent
            title="Welcome to the Trends Page"
            description="This is where you can see the statistics of the reports you have made and trends of the reports."
            buttonText="Got it"
            onButtonPress={() => setTooltipStep(0)}
          />
        }
        onClose={() => setTooltipStep(0)}
      >
        <View />
      </Tooltip>
      {/* Konten scrollable */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 4 }}
        scrollEventThrottle={16}
        className="h-full"
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View id="trends">
          <View>
            <View className="px-8">
              <Text className="font-Bold text-4xl mb-2">Trends Metric</Text>

              <View className="flex-row items-center mb-4">
                <View className="bg-green-100 px-2 py-1 rounded-lg flex-row items-center">
                  <Text className="text-green-600 font-semibold text-sm mr-1">
                    ⬆
                  </Text>
                  <Text className="text-green-600 font-SemiBold text-sm">
                    5% Today
                  </Text>
                </View>
              </View>

              {/* Tabs */}
              <View className="flex-row justify-around">
                <TouchableOpacity
                  className={`px-6 py-2 rounded-full ${filterTrend === "daily" ? "bg-primary-800/10" : ""}`}
                  onPress={() => handleFilterChange("daily")}
                >
                  <Text
                    className={`font-SemiBold ${filterTrend === "daily" ? "text-black" : "text-gray-500"}`}
                  >
                    Daily
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-6 py-2 rounded-full ${filterTrend === "weekly" ? "bg-primary-800/10" : ""}`}
                  onPress={() => handleFilterChange("weekly")}
                >
                  <Text
                    className={`font-SemiBold ${filterTrend === "weekly" ? "text-black" : "text-gray-500"}`}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-6 py-2 rounded-full ${filterTrend === "monthly" ? "bg-primary-800/10" : ""}`}
                  onPress={() => handleFilterChange("monthly")}
                >
                  <Text
                    className={`font-SemiBold ${filterTrend === "monthly" ? "text-black" : "text-gray-500"}`}
                  >
                    Monthly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dummy Line Graph */}
            <View
              style={{
                height: 300,
                overflow: "hidden",
                borderRadius: 8,
                marginLeft: -32,
              }}
            >
              <Animated.View
                style={{
                  flex: 1,
                }}
              >
                <LineChart
                  data={getTrendChartData()}
                  thickness={3}
                  color={getTrendChartColor()}
                  hideDataPoints={true}
                  dataPointsRadius={4}
                  yAxisColor="transparent"
                  xAxisColor="transparent"
                  curved
                  animationDuration={800}
                  height={220}
                  initialSpacing={20}
                  spacing={100}
                  rulesColor="#E5E7EB"
                  isAnimated={true}
                  curveType={CurveType.QUADRATIC}
                  hideRules
                  hideYAxisText
                  animateOnDataChange={true}
                />
              </Animated.View>
            </View>

            {/* Trends Overview */}
            <View className="px-8">
              <Text className="font-Bold text-xl mb-1">Trends</Text>
              <Text className="text-gray-500 text-md font-Regular mb-3">
                Trends Overview
              </Text>

              <View className="flex-row flex-wrap justify-between">
                {categoryData.map((item, index) => (
                  <View
                    key={index}
                    className={`w-[48%] rounded-xl p-4 mb-3  bg-green-100/50`}
                  >
                    <Text className="font-SemiBold text-base">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 font-Regular mb-1">
                      {item.value}
                    </Text>
                    <View
                      style={{
                        overflow: "hidden",
                        marginLeft: -30,
                      }}
                    >
                      <LineChart
                        data={item.chartData}
                        thickness={2}
                        color="#10B981"
                        hideDataPoints={true}
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                        curved
                        animationDuration={800}
                        height={60}
                        initialSpacing={20}
                        spacing={30}
                        rulesColor="#E5E7EB"
                        isAnimated={true}
                        curveType={CurveType.QUADRATIC}
                        hideRules
                        hideYAxisText
                        animateOnDataChange={true}
                      />
                    </View>
                    <Text
                      className={`font-Regular ${item.changes.includes("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.changes}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View id="statistic" className="mt-10 px-8">
          <Text className="font-Bold text-4xl mb-4">Statistic</Text>
          {/* Line Chart Container */}
          <View className="mb-6 rounded-2xl shadow-sm shadow-neutral-400 overflow-hidden">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-Bold text-gray-800">
                  {showDetail ? getChartTitle() : `Statistics: ${selectedYear}`}
                </Text>
                {!showDetail && (
                  <View className="bg-red-100 px-3 py-1 rounded-full">
                    <Text className="text-red-600 text-sm font-Medium">
                      {getCurrentYearData().find(
                        (item) => item.label === selectedDay
                      )?.value || 0}{" "}
                      Accidents
                    </Text>
                  </View>
                )}
                <View className="flex-row items-center">
                  {showDetail && (
                    <View className="bg-red-100 px-3 py-1 me-1 ml-1 rounded-full">
                      <Text className="text-red-600 text-sm font-Medium">
                        {getCurrentYearData().find(
                          (item) => item.label === selectedDay
                        )?.value || 0}{" "}
                        Accidents
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${showDetail ? "bg-red-600" : "bg-green-600"}`}
                    onPress={toggleDetail}
                  >
                    <Text className="text-white font-Medium">
                      {showDetail ? "Kembali" : "Detail"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Year Selector - Show in both overview and detail mode */}
              <View className="mb-4">
                <Text className="text-sm font-Medium text-gray-600 mb-2">
                  Choose Year:
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 4 }}
                >
                  {availableYears.map((year) => (
                    <TouchableOpacity
                      key={year}
                      className={`px-4 py-2 rounded-full mr-2 ${selectedYear === year ? "bg-green-600" : "bg-gray-200"}`}
                      onPress={() => handleYearChange(year as Year)}
                    >
                      <Text
                        className={`font-Medium ${selectedYear === year ? "text-white" : "text-gray-700"}`}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Filter Buttons - Show only in detail mode */}
            {showDetail && (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0],
                      }),
                    },
                  ],
                }}
              >
                <Text className="text-sm font-Medium text-gray-600 mb-2">
                  Choose Month:
                </Text>
                <View className="mb-4">
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 4 }}
                  >
                    {/* Tombol Bulan */}
                    {getCurrentYearData().map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        className={`px-4 py-2 rounded-full mr-2 ${selectedDay === item.label ? "bg-red-600" : "bg-gray-200"}`}
                        onPress={() => handleDayChange(item.label as Day)}
                      >
                        <Text
                          className={`font-Medium ${selectedDay === item.label ? "text-white" : "text-gray-700"}`}
                        >
                          {monthNames[item.label]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Animated.View>
            )}

            {/* Chart Section - Fixed Container */}
            <View
              style={{
                height: 300,
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <Animated.View
                style={{
                  opacity: !showDetail ? chartFadeAnim : fadeAnim,
                  flex: 1,
                  paddingVertical: 8,
                }}
              >
                <LineChart
                  data={getCurrentChartData()}
                  thickness={3}
                  color="#EF4444"
                  hideDataPoints={true}
                  dataPointsRadius={4}
                  startFillColor="#FFFFFF"
                  endFillColor="#FFFFFF"
                  startOpacity={0.3}
                  endOpacity={0.05}
                  yAxisColor="transparent"
                  xAxisColor="transparent"
                  xAxisLabelTextStyle={{ color: "#6B7280", fontSize: 12 }}
                  yAxisTextStyle={{ color: "#6B7280", fontSize: 12 }}
                  curved
                  animationDuration={800}
                  height={220}
                  initialSpacing={20}
                  spacing={70}
                  rulesColor="#E5E7EB"
                  isAnimated={true}
                  curveType={CurveType.QUADRATIC}
                  hideRules
                  animateOnDataChange={true}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
