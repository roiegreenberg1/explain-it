import { Redirect } from "expo-router";

export default function Index() {
  let isAuth = true;
  return <Redirect href={isAuth ? "/(tabs)" : "/(auth)/login"} />;
}
