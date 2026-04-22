import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  //CAMERA
  const openCamera = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //GALLERY
  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //SAVE TO GALLERY
  const saveToGallery = async () => {
    if (!image) {
      alert("Tidak ada gambar untuk disimpan!");
      return;
    }

    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission is required!");
      return;
    }

    await MediaLibrary.saveToLibraryAsync(image);
    alert("Gambar berhasil disimpan ke gallery!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Benedict Bryan - 00000094709</Text>

      <View style={styles.button}>
        <Button title="OPEN CAMERA" onPress={openCamera} />
      </View>

      <View style={styles.button}>
        <Button title="OPEN GALLERY" onPress={openGallery} />
      </View>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.button}>
            <Button title="SAVE TO GALLERY" onPress={saveToGallery} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { marginBottom: 10 },
  button: { marginVertical: 5, width: 150 },
  image: { width: 250, height: 200, marginTop: 20 },
});
