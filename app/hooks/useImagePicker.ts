import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
    const [image, setSelectedImage] = useState('')
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("You need to enable permission for the library");
    }
  };

  const unselectImage = () => {
    setSelectedImage('')
  }

  const selectImage = async () => {
    console.log('>>>>>>>>>.')
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,
      });
      if (!result.canceled) setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.log("an error occurred", error);
    }
  };
  return { selectImage, image, unselectImage};
};

export default useImagePicker;
