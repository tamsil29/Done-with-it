import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { RouteEnums } from "../navigation/routes";
import listingApi from "../api/listings";
import AppText from "../components/AppText";
import Button from "../components/Button";
import AppActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import { formatPrice } from "../utility/utilities";
import NoData from "../components/NoData";
import FilterPill from "../components/FilterPill";
import categoriesApi from "../api/category";

function ListingScreen() {
  const { navigate } = useRouteNavigation();
  const [appliedCategory, setAppliedCategory] = useState<any>();
  const {
    data: listings,
    isError,
    request: loadListings,
    isLoading,
  } = useApi(listingApi.getListings);

  useEffect(() => {
    getListings();
  }, [appliedCategory]);

  const getListings = () => {
    if (appliedCategory) loadListings({ categoryId: appliedCategory?._id });
    else loadListings();
  };

  const {
    data: categories,
    isError: categoryError,
    request: getCategories,
    isLoading: categoriesLoading,
  } = useApi(categoriesApi.getCategories);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen style={styles.screen}>
        {isError && (
          <>
            <AppText>Couldn't Retrieve the listings</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
        <View style={{ paddingVertical: 15 }}>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(category) => category?._id.toString()}
            renderItem={({ item }) => (
              <FilterPill
                name={item?.label}
                onPress={() =>
                  item?._id === appliedCategory?._id
                    ? setAppliedCategory(undefined)
                    : setAppliedCategory(item)
                }
                isSelected={appliedCategory?._id === item?._id}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"₹" + formatPrice(item.price)}
              image={item.images[0]}
              onPress={() => navigate(RouteEnums.LISTING_DETAILS, item)}
            />
          )}
          keyExtractor={(listing) => listing?._id.toString()}
          refreshing={isLoading}
          onRefresh={getListings}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoData value="Listings" isLoading={isLoading}/>}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingScreen;
