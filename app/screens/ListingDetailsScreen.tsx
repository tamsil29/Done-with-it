import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import ContactSellerForm from "../components/ContactSellerForm";
import AppText from "../components/AppText";
import useAuth from "../auth/useAuth";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { formatPrice, getUserImage } from "../utility/utilities";
import ProfileScreen from "./ProfileScreen";
import listingApi from "../api/listings";
import useApi from "../hooks/useApi";
import AppActivityIndicator from "../components/ActivityIndicator";

function ListingDetailsScreen() {
  const {
    data: listing,
    isError,
    request: loadListings,
    isLoading,
  } = useApi(listingApi.getOneListing);

  const { user } = useAuth();
  const navigation = useRouteNavigation();
  const route = useRoute();
  const listingId = route.params as any;
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(()=>{
    loadListings(listingId?._id)
  }, [listingId])

 
  return (
    <ScrollView>
      <AppActivityIndicator visible={isLoading}/>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      >
        <Image
          source={{
            uri: listing?.images[0],
          }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing?.title}</Text>
          {listing?.description && <AppText>{listing?.description}</AppText>}
          <Text style={styles.price}>₹{formatPrice(listing?.price)}</Text>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            title={listing?.createdBy?.name}
            subTitle={`${listing?.createdBy?.numberofListings} Listings`}
            image={getUserImage(listing?.createdBy?.imageId)}
            onPress={() => setProfileModalVisible(true)}
          />
        </View>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          style={styles.goBack}
          size={30}
          onPress={() => navigation.goBack()}
        />
        {user._id !== listing?.createdBy?._id && (
          <ContactSellerForm listing={listing} />
        )}
      </KeyboardAvoidingView>
      <ProfileScreen
        user={listing?.createdBy}
        visible={isProfileModalVisible}
        isSelf={false}
        onClose={() => setProfileModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 10,
    color: "white",
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 10,
  },
  title: { fontSize: 24, fontWeight: "500" },
  userContainer: {
    marginVertical: 15,
  },
});

export default ListingDetailsScreen;
