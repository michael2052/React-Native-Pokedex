import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { selectFavorites } from "@/redux/favoriteSlice";
import HomeRow from "@/components/HomeRow";
import { selectFavoriteCount } from "@/redux/favoriteCountSlice";
import { Stack } from "expo-router";

const Favorite = () => {
  const favorites = useAppSelector(selectFavorites);
  const favoriteCount = useAppSelector(selectFavoriteCount);
  const dispatch = useAppDispatch();
  const handleResetConfirmation = () => {
    Alert.alert(
      "Reset Favorites",
      "Are you sure you want to reset your favorite Pokemon?",
      [
        {
          text: "No",
          onPress: () => console.log("Reset canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch({ type: "favorite/reset" }),
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight:
            favoriteCount > 0
              ? () => (
                  <Pressable onPress={handleResetConfirmation}>
                    <Text
                      style={{
                        marginRight: 12,
                        color: "red",
                        fontSize: 16,
                        opacity: 0.8,
                      }}
                    >
                      Reset
                    </Text>
                  </Pressable>
                )
              : undefined,
        }}
      />
      {favoriteCount === 0 ? (
        <Text style={styles.title}>You have no favorite Pokemons yet!</Text>
      ) : (
        <Text style={styles.title}>
          Here all are my {favoriteCount} favorite Pokemons!
        </Text>
      )}
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => <HomeRow item={item}></HomeRow>}
        ></FlatList>
      </View>
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontSize: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
