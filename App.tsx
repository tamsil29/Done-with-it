import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import Card from "./app/components/Card";
import AccountScreen from "./app/screens/AccountScreen";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import ListingScreen from "./app/screens/ListingScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return (
    // <WelcomeScreen />
    //   <View
    //   style={{ backgroundColor: "lightgrey", height: "100%", paddingVertical: 70, paddingHorizontal: 10, gap: 20  }}
    // >
    //   <Card
    //     title="Red Jacket"
    //     subTitle="$100"
    //     image="https://i0.pickpik.com/photos/241/235/620/mountain-hiking-adventure-landscape-preview.jpg"
    //   />
    // </View>
    // <ListingDetailsScreen/>

      // <MessagesScreen />
      // <AccountScreen/>
      <ListingScreen/>

    // <ViewImageScreen/>
  );
}
