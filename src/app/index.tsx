import { Redirect } from "expo-router";

export default function Index() {
  let isAuth = false;
  return <Redirect href={isAuth ? "/(tabs)" : "/(auth)/login"} />;
}
