import AsyncStorage from "@react-native-async-storage/async-storage";

import { Film } from "@/types";

const FAVORITES_KEY = "favorites";

const parseFavorites = (favorites: string | null): Film[] => {
  return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = async (film: Film) => {
  try {
    const favorites = parseFavorites(await AsyncStorage.getItem(FAVORITES_KEY));

    return favorites.some(
      (favorite) => favorite.episode_id === film.episode_id
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const toggleFavorite = async (film: Film) => {
  try {
    const favorites = parseFavorites(await AsyncStorage.getItem(FAVORITES_KEY));

    const updatedFavorites = (await isFavorite(film))
      ? favorites.filter((favorite) => favorite.episode_id !== film.episode_id)
      : [...favorites, film];

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async () => {
  try {
    return parseFavorites(await AsyncStorage.getItem(FAVORITES_KEY));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteFavorite = async (film: Film) => {
  try {
    const favorites = parseFavorites(await AsyncStorage.getItem(FAVORITES_KEY));

    const updatedFavorites = favorites.filter(
      (favorite) => favorite.episode_id !== film.episode_id
    );

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.log(error);
  }
};
