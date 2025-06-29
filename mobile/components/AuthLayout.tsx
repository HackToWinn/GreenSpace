import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 h-full justify-center items-center bg-primary-50 px-4">
      {children}
    </SafeAreaView>
  );
}
