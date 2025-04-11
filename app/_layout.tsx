import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    
    // If we're not in the auth group and not on the index page, redirect to login
    if (!inAuthGroup && segments[0] !== "index") {
      router.replace("/");
    }
  }, [segments]);

  return <Slot />;
}
