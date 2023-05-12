import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "./app/components/Button";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import Screen from "./app/components/Screen";
import { Image } from "react-native";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";

export default function App() {
  const [imageUris, setImageUris] = useState([] as string[]);

  const handleAdd = (uri: string) => {
    setImageUris([...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setImageUris(imageUris.filter((image) => image !== uri));
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
    <ListingEditScreen />
    // <Screen>
    //   <ImageInputList
    //     imageUris={imageUris}
    //     onRemoveImage={handleRemove}
    //     onAddImage={handleAdd}
    //   />
    // </Screen>

    // <ViewImageScreen/>
  );
}
