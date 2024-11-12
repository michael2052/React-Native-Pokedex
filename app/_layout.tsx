import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { persistor, store } from "@/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { ActivityIndicator, View } from "react-native";

// Initialize the QueryClient outside of the component
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          }
        >
          <Tabs
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen
              name="(home)"
              options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="(favorite)"
              options={{
                title: "Favorite",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "heart" : "heart-outline"}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
