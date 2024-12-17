import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera,CameraView } from "expo-camera";
import axios from 'axios';

import { getProductByBarcode , fetchData } from "../../controllers/barcodeController";

export default function BarcodeScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [barcode, setBarcode] = useState(null);


  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    
    /*Alert.alert(
      "Barcode Scanned",
      `Type: ${type}\nData: ${data}`,
      [
        {
          text: "Ok",
          onPress: () => console.log("Ok is pressed" + " barcode: " + data ),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );*/
    setBarcode( getProductByBarcode(data));

    
    


  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Grant Permission"
          onPress={() => Camera.requestCameraPermissionsAsync()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.cameraWrapper}>
      <CameraView
        ref={(ref) => setCameraRef(ref)}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          
        barcodeTypes: [ 
         'aztec' , 
         'ean13' , 
         'ean8' , 
         'qr' , 
         'pdf417' ,
         'upc_e' ,
         'datamatrix' ,
         'code39' ,
         'code93' ,
         'itf14' ,
         'codabar' ,
         'code128' ,
         'upc_a',
  
         ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      </View>
      {scanned && (
        <View style={styles.buttonContainer}>
         <Button title="Tap to Scan Again" onPress={() => setScanned(false)} color="#ffffff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    width: "80%", // Adjust width (percentage or fixed value, e.g., 300)
    height: 300, // Adjust height (fixed value)
    overflow: "hidden", // Ensures the camera view stays within bounds
    borderRadius: 10, // Optional: Rounded corners
    borderWidth: 2, // Optional: Add border
    borderColor: "#000", // Optional: Border color
    marginBottom:30,
  },
  buttonContainer: {
    width: "60%", // Button width (adjust as needed)
    borderRadius: 8, // Rounded corners for the button container
    overflow: "hidden", // Ensures the button stays within bounds
    backgroundColor: "#007bff", // Button background color
    elevation: 5, // Add shadow (for Android)
    shadowColor: "#000", // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
});
