import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const isIndex = segments[0] === "index";
    
    // Get the customerId from the URL if it exists
    const customerId = segments[1]?.split("?")[1]?.split("=")[1];
    
    // Only redirect if we're not in the auth group and not on the index page
    if (!inAuthGroup && !isIndex && segments[0] !== "home" && segments[0] !== "profile" && segments[0] !== "transactions" && segments[0] !== "settings") {
      router.replace("/");
    }
  }, [segments]);

  return <Slot />;
}
