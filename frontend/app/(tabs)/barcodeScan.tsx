import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera,CameraView, CameraType, BarcodeScanningResult } from "expo-camera";
import { canDismiss } from "expo-router/build/global-state/routing";

export default function BarcodeScan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    //Alert.alert("Barcode Scanned", `Type: ${type}\nData: ${data}`,);
    Alert.alert('Barcode Scanned', `Type: ${type}\nData: ${data}`, [
      {
        text: 'Ok',
        onPress: () => console.log("Ok is pressed") ,
        style: 'cancel',
      },
      
    ],
      { 
      cancelable: true,
      },
     );
//console.log('Cancel Pressed')
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
        <Button title="Grant Permission" onPress={() => Camera.requestCameraPermissionsAsync()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
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
});
