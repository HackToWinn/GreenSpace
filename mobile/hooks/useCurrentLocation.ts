import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { Region } from "react-native-maps";
import { LocationState } from "@/lib/types";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const { status }: Location.LocationPermissionResponse =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(
          "Location Permission",
          "Please enable location permission to use this feature",
          [{ text: "OK" }],
        );
        setLocation({
          latitude: -1.2654,
          longitude: 116.8312,
          address: "Balikpapan, Kalimantan Timur (Default)",
        });
        setLoading(false);
        return;
      }

      const currentPosition: Location.LocationObject =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const { latitude, longitude } = currentPosition.coords;

      try {
        const reverseGeocode: Location.LocationGeocodedAddress[] =
          await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
        if (reverseGeocode.length > 0) {
          const address: Location.LocationGeocodedAddress = reverseGeocode[0];
          const fullAddress: string = `${address.city || address.subregion || "Unknown City"}, ${
            address.region || "Unknown Region"
          }`;
          setLocation({
            latitude,
            longitude,
            address: fullAddress,
          });
        } else {
          setLocation({
            latitude,
            longitude,
            address: "Unknown Location",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (reverseError) {
        setLocation({
          latitude,
          longitude,
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Failed to get current location");
      Alert.alert(
        "Location Error",
        "Unable to get your current location. Using default location.",
        [{ text: "OK" }],
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshLocation = (): void => {
    getCurrentLocation();
  };

  const getMapRegion = (): Region => {
    return {
      latitude: location?.latitude || -1.2654,
      longitude: location?.longitude || 116.8312,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  };

  return {
    location,
    loading,
    errorMsg,
    refreshLocation,
    getMapRegion,
  };
};
