import DetailRow from "@/components/DetailRow";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Pokemon, usePokemonDetail } from "@/hooks/pokemonHooks";
import { useAppDispatch, useAppSelector } from "@/redux";
import { add, remove, selectFavorites } from "@/redux/favoriteSlice";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

const Detail = () => {
  const { url } = useLocalSearchParams<"/detail/[url]">();
  const { error, isLoading, detail } = usePokemonDetail(url);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite =
    favorites.filter((pokemon) => pokemon.url === url).length === 1;
  const pokemon: Pokemon = { name: detail?.name ?? "", url };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() =>
                isFavorite ? dispatch(remove(pokemon)) : dispatch(add(pokemon))
              }
            >
              {isFavorite ? (
                <TabBarIcon name="heart" color="red" />
              ) : (
                <TabBarIcon name="heart-outline" />
              )}
            </Pressable>
          ),
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        detail && (
          <ScrollView>
            <Image
              style={{
                height: Dimensions.get("screen").width,
                width: Dimensions.get("screen").width,
              }}
              source={{
                uri: detail.sprites.front_default,
              }}
            />
            <View style={styles.typeViewContainer}>
              {detail.types.map((pokemon) => (
                <View key={pokemon.type.url} style={styles.typeView}>
                  <Text style={{ padding: 5, textTransform: "capitalize" }}>
                    {pokemon.type.name}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{ padding: 8 }}>
              <DetailRow title="Name" description={detail.name}></DetailRow>
              <View style={styles.seperator} />
              <DetailRow
                title="Species"
                description={detail.species.name}
              ></DetailRow>
              <View style={styles.seperator} />
              <DetailRow
                title="Height"
                description={detail.height.toString()}
              ></DetailRow>
              <View style={styles.seperator} />
              <DetailRow
                title="Weight"
                description={detail.weight.toString()}
              ></DetailRow>
              <View style={styles.seperator} />
              <DetailRow
                title="Base Experience"
                description={detail.base_experience.toString()}
              ></DetailRow>
              <View style={styles.seperator} />
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Abilities
              </Text>
              {
                <View>
                  {detail.abilities.map((ability) => (
                    <View
                      key={ability.ability.url}
                      style={{
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          textTransform: "capitalize",
                        }}
                      >
                        - {ability.ability.name}
                      </Text>
                    </View>
                  ))}
                </View>
              }
            </View>
          </ScrollView>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  seperator: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  typeViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 6,
  },

  typeView: {
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    margin: 8,
    borderRadius: 20,
    borderColor: "black",
  },
});

export default Detail;
