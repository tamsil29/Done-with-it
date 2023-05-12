import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "./app/components/Button";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import Screen from "./app/components/Screen";
import { Image } from "react-native";
import ImageInput from "./app/components/ImageInput";

export default function App() {
  const [category, setCategory] = useState({} as any);
  const [imageUri, setImageUri] = useState(null as any);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("You need to enable permission for the library");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log("an error occurred", error);
    }
  };

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
    // <ListingEditScreen />
    <Screen>
      <ImageInput imageUri={imageUri} onChangeImage={uri => setImageUri(uri)}/>
    </Screen>

    // <ViewImageScreen/>
  );
}
