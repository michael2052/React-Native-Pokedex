import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Pokedex" }} />
      <Stack.Screen
        name="detail/[url]"
        options={{ headerTitle: "Pokemon Detail" }}
      />
    </Stack>
  );
}
