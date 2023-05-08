import Screen from "./app/components/Screen";
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";
import { useState } from "react";
import LoginScreen from "./app/screens/LoginScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import ListingScreen from "./app/screens/ListingScreen";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";

export default function App() {
  const [category, setCategory] = useState({} as any);
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

    <MessagesScreen />
    // <AccountScreen/>
    // <ListingScreen/>
    // <Screen>
    //   <AppPicker
    //     selectedItem={category}
    //     onSelectItem={(item) => setCategory(item)}
    //     items={categories}
    //     placeholder="Category"
    //     icon="apps"
    //   />
    //   <AppTextInput placeholder="example@email.com" icon="email" />
    // </Screen>
    // <LoginScreen/>
    // <ListingEditScreen/>

    // <ViewImageScreen/>
  );
}
