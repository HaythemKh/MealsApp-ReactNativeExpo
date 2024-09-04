import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";
import MealsList from "../components/MealsList/MealsList";
// import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

const FavoritesScreen = () => {
  /** Context API
   * const favoriteMealsCtx = useContext(FavoritesContext);
     const FavoritesMeals = MEALS.filter((meal) =>
       favoriteMealsCtx.ids.includes(meal.id)
  );
   */

  /**
    Redux
   */
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
  const FavoritesMeals = MEALS.filter((meal) =>
    favoriteMealsIds.includes(meal.id)
  );

  /** */

  if (FavoritesMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favourite meals yet.</Text>
      </View>
    );
  }
  return <MealsList items={FavoritesMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
