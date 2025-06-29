import LoadingPopup from "@/components/LoadingPopUp";
import { getUserBalance, getUserInfo, registerUser } from "@/lib/api";
import loadIdentity from "@/lib/loadIdentity";
import { ProfileContextProps, UserData } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View } from "react-native";

const getMimeType = (uri: string): string => {
  const extension = uri.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<number | null>(null);

  const getBalance = useCallback(async () => {
    try {
      setIsLoading(true);
      const identity = await loadIdentity();
      if (!identity.pubKey || !identity.delegation) {
        throw new Error("identity_not_loaded");
      }
      const formData = new FormData();
      formData.append("delegation", JSON.stringify(identity.delegation));
      formData.append("identity", JSON.stringify(identity.pubKey));
      const balanceData = await getUserBalance({ body: formData });
      if (!balanceData) {
        setUserBalance(null);
        return false;
      }
      const { balance } = balanceData;
      setUserBalance(balance);
      await AsyncStorage.setItem("user-balance", JSON.stringify(balance));
      return true;
    } catch (error) {
      console.error("Failed to load user balance:", error);
      setUserBalance(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const loadUserData = useCallback(async (): Promise<UserData | boolean> => {
    setIsLoading(true);
    try {
      const identity = await loadIdentity();
      if (!identity.pubKey || !identity.delegation) {
        throw new Error("identity_not_loaded");
      }

      const formData = new FormData();
      formData.append("delegation", JSON.stringify(identity.delegation));
      formData.append("identity", JSON.stringify(identity.pubKey));

      const profileData = await getUserInfo({ body: formData });

      if (!Array.isArray(profileData) || profileData.length === 0) {
        setProfile(null);
        return false;
      }

      const { pictureCid, username, email } = profileData[0];
      const newProfile = { pictureCid, username, email };
      setProfile(newProfile);
      await AsyncStorage.setItem("profile-data", JSON.stringify(newProfile));
      return true;
    } catch (error) {
      setProfile(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addUser = useCallback(
    async (userData: {
      imageUri: string;
      username: string;
      email: string;
    }): Promise<boolean> => {
      try {
        setIsLoading(true);
        const { imageUri, username, email } = userData;
        const identity = await loadIdentity();
        if (!identity.pubKey || !identity.delegation) {
          setIsLoading(false);
          throw new Error("identity_not_loaded");
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("delegation", JSON.stringify(identity.delegation));
        formData.append("identity", JSON.stringify(identity.pubKey));
        if (imageUri) {
          const mimeType = getMimeType(imageUri);
          const picture = {
            uri: imageUri,
            type: mimeType,
            name: `profile.${mimeType.split("/")[1]}`,
          };
          formData.append("picture", picture as any);
        }

        const response = await registerUser({ body: formData });

        const newProfile = {
          pictureCid: response.pictureCid || imageUri,
          username,
          email,
        };
        setProfile(newProfile);
        await AsyncStorage.setItem("profile-data", JSON.stringify(newProfile));
        return true;
      } catch (error) {
        console.error("Failed to add user:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const logoutUser = useCallback(async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("profile-data");
      await AsyncStorage.removeItem("delegation");
      await AsyncStorage.removeItem("identity-key");
      setProfile(null);
    } catch (error) {
      console.error("Failed to logout user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isLoading,
      setProfile,
      setIsLoading,
      loadUserData,
      addUser,
      logoutUser,
      userBalance,
      setUserBalance,
      getBalance,
    }),
    [
      profile,
      isLoading,
      loadUserData,
      addUser,
      setProfile,
      setIsLoading,
      logoutUser,
      userBalance,
      getBalance,
    ]
  );
  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("profile-data");
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Failed to load stored profile:", error);
      } finally {
        setIsInitialized(true);
      }
    };
    if (profile && (async () => await loadIdentity())) {
      getBalance();
    }
    initializeProfile();
  }, []);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPopup visible={true} text="Initializing profile..." />
      </View>
    );
  }
  return (
    <ProfileContext.Provider value={value}>
      {children}
      <LoadingPopup visible={isLoading} text="Loading.." />
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
