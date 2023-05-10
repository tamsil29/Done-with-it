import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import ListingEditScreen from "./app/screens/ListingEditScreen";

export default function App() {
  const [category, setCategory] = useState({} as any);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("You need to enable permission for the library");
    }
  };

  useEffect(() => {
    // requestPermissions();
  }, []);

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
    <ListingEditScreen />

    // <ViewImageScreen/>
  );
}
