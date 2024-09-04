import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
// import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

const MealDetailScreen = ({ route, navigation }) => {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  /**
   * //contextAPI
   * const favoriteMealsCtx = useContext(FavoritesContext);
   * const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
   * const changeFavoriteStatusHandler = () => {
   *   !mealIsFavorite
   *     ? favoriteMealsCtx.addFavorite(mealId)
   *     : favoriteMealsCtx.removeFavorite(mealId);
   * };
   */

  /**
   * Redux
   */
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const mealIsFavorite = favoriteMealsIds.includes(mealId);
  const dispatch = useDispatch();

  const changeFavoriteStatusHandler = () => {
    !mealIsFavorite
      ? dispatch(addFavorite({ id: mealId }))
      : dispatch(removeFavorite({ id: mealId }));
  };

  /** */

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>

      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listInnerContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listInnerContainer: {
    width: "80%",
  },
});
