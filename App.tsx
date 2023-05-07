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
import Screen from './app/components/Screen'
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";

const categories = [
  {label: 'Furniture', value: 1},
  {label: 'Clothing', value: 2},
  {label: 'Camera', value: 3},
]

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
      // <ListingScreen/>
      <Screen>
        <AppPicker items={categories} placeholder="Category" icon="apps"/>
        <AppTextInput placeholder="example@email.com" icon="email"/>
      </Screen>

    // <ViewImageScreen/>
  );
}
