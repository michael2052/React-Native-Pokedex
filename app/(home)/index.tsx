import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import HomeRow from "@/components/HomeRow";
import FloatingActionButton from "@/components/FloatingActionButton";
import { usePokemons } from "@/hooks/pokemonHooks";
import { Link } from "expo-router";

export default function Index() {
  const { error, isLoading, pokemon, loadMore } = usePokemons();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        pokemon && (
          <FlatList
            data={pokemon}
            renderItem={({ item }) => <HomeRow item={item}></HomeRow>}
          ></FlatList>
        )
      )}
      <FloatingActionButton onPress={loadMore}></FloatingActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
