import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { Pokemon, usePokemonSprite } from "@/hooks/pokemonHooks";
import { Link } from "expo-router";

interface IHomeProps {
  item: Pokemon;
}

export default function HomeRow({ item }: IHomeProps) {
  const { error, isLoading, sprite } = usePokemonSprite(item.url);
  return (
    <Link
      href={{
        pathname: "/detail/[url]",
        params: {
          url: item.url,
        },
      }}
      asChild
      key={item.url}
    >
      <Pressable>
        <View style={styles.card} key={item.url}>
          {isLoading ? (
            <ActivityIndicator style={styles.tinyLogo} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            sprite && <Image source={{ uri: sprite }} style={styles.tinyLogo} />
          )}
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardText: { textTransform: "capitalize", marginLeft: 16 },
  tinyLogo: { width: 50, height: 50 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: "#ccc",
    marginBottom: 8,
  },
});
