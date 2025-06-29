import { getLatestReports, getMyReports } from "@/lib/api";
import loadIdentity from "@/lib/loadIdentity";
import { useQuery } from "@tanstack/react-query";

export const useLatestReports = () => {
  return useQuery({
    queryKey: ["latestReports"],
    queryFn: getLatestReports,
  });
};

export const useMyReports = () => {
  return useQuery({
    queryKey: ["myReports"],
    queryFn: async () => {
      const { pubKey, delegation } = await loadIdentity();
      const formData = new FormData();
      formData.append("delegation", JSON.stringify(delegation));
      formData.append("identity", JSON.stringify(pubKey));
      return getMyReports({ body: formData });
    },
  });
};
