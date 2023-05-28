import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
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

function ListingDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const listing = route.params as any;

  const img1 =
    "https://i0.pickpik.com/photos/241/235/620/mountain-hiking-adventure-landscape-preview.jpg";
  const img2 =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";
  return (
    <ScrollView>
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
          <Text style={styles.price}>₹{listing?.price}</Text>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            title={listing?.createdBy?.name}
            subTitle={`${listing?.createdBy?.numberofListings || 1} Listings`}
            image={img2}
            onPress={() => {}}
          />
        </View>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          style={styles.goBack}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <ContactSellerForm listing={listing} />
      </KeyboardAvoidingView>
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
