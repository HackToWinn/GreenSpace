import { useProfile } from "@/context/ProfileContext";
import loadIdentity from "./loadIdentity";

export default async function checkAuth() {
  const { profile } = useProfile();
  const { pubKey, delegation } = await loadIdentity();
  const profileData = profile;
  // Check if pubKey, delegation, and profileData are all available
  if (pubKey && delegation && profileData) {
    return true;
  }
  return false;
}
