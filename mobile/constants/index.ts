import "react-native-get-random-values";
import { DashboardCardProps } from "@/lib/types";
import { router } from "expo-router";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import onboarding4 from "@/assets/images/onboarding4.png";
import report1 from "@/assets/images/reports/report1.png";
import profile from "@/assets/images/profile/profil_gg.jpg";

const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  onboarding4,
  report1,
  profile,
};

export const onboarding = [
  {
    id: 1,
    title: "Welcome to GreenSpace",
    description:
      "Explore smarter ways to care for the environment with the power of AI and technology.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Analyze Your Environment",
    description:
      "Use your camera to capture and analyze aspects of your surroundings — air, waste, greenery, and more.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Store & Share with the World",
    description:
      "Save environmental data securely to IPFS and contribute to global awareness.",
    image: images.onboarding3,
  },
  {
    id: 4,
    title: "Be Part of the Change",
    description:
      "Join a growing community that takes action for a cleaner, greener planet.",
    image: images.onboarding4,
  },
];

export const dashboardCards: DashboardCardProps[] = [
  {
    onPress: () => router.push("/(tabs)/report"),
    title: "Total Reports",
    value: 0,
    iconName: "newspaper-outline",
    CTAIcon: true,
  },
  {
    onPress: () => router.push("/(tabs)/report"),
    title: "Reports This Week",
    value: 0,
    iconName: "calendar-outline",
    CTAIcon: true,
  },
  {
    title: "Most Reported Category",
    value: "Air Pollution",
    iconName: "people-outline",
  },
  {
    title: "Unique Locations",
    value: 45,
    iconName: "navigate-outline",
  },
];
