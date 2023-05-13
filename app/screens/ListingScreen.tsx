import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { ScrollView } from "react-native-gesture-handler";
import { RouteEnums } from "../navigation/routes";
import listingApi from "../api/listings";
import AppText from "../components/AppText";
import Button from "../components/Button";

function ListingScreen() {
  const { navigate } = useRouteNavigation();
  const [listings, setListings] = useState([] as any);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setIsLoading(true);
    const response = await listingApi.getListings();
    setIsLoading(false);
    if (!response.ok) return setError(true);
    setError(false);
    setListings(response?.data?.data as any);
    console.log(response);
  };

  return (
    // <ScrollView>
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't Retrieve the listings</AppText>
          <Button title="Retry" onPress={loadListings} />
        </>
      )}
      <ActivityIndicator animating={isLoading} />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"₹" + item.price}
            image={item.imageId}
            onPress={() => navigate(RouteEnums.LISTING_DETAILS, item)}
          />
        )}
        keyExtractor={(listing) => listing?._id.toString()}
      />
    </Screen>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingScreen;
