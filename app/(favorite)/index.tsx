import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useAppSelector } from "@/redux";
import { selectFavorites } from "@/redux/favoriteSlice";
import HomeRow from "@/components/HomeRow";
import { selectFavoriteCount } from "@/redux/favoriteCountSlice";

const Favorite = () => {
  const favorites = useAppSelector(selectFavorites);
  const favoriteCount = useAppSelector(selectFavoriteCount);
  return (
    <>
      <Text style={styles.title}>
        Here all are my {favoriteCount} favorite Pokemons!
      </Text>
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
