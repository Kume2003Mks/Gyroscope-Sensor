import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import Animal from './Animal.json';
import Frame from './Frame';

const App = () => {
  const [randomAnimal, setRandomAnimal] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let sensor;

    const startShakeDetection = async () => {
      sensor = Gyroscope.addListener(({ x, y, z }) => {
        const shakeThreshold = 1.5;

        if (!isShaking && (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold || Math.abs(z) > shakeThreshold)) {
          fetchRandomAnimal();
          setIsShaking(true);
        }
      });

      Gyroscope.setUpdateInterval(500);
    };

    const fetchRandomAnimal = async () => {
      const randomIndex = Math.floor(Math.random() * Animal.length);
      const selectedAnimal = Animal[randomIndex];
      setRandomAnimal(selectedAnimal);
    };

    const stopShakeDetection = () => {
      sensor && sensor.remove();
    };

    startShakeDetection();

    return () => {
      stopShakeDetection();
    };
  }, [isShaking]);

  const handleShakeAgain = () => {
    setIsShaking(false);
  };


  return (
    <SafeAreaView style={styles.container}>
        {randomAnimal ? (
          <>
            <Frame {...randomAnimal}/>

            <TouchableOpacity style={styles.TextButton} onPress={handleShakeAgain}>
              <Text style={styles.Textstyle}>Shake Again</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.Textstyle}>เขย่าเพื่อสุ่ม </Text>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextButton:{
    width: '90%',
    height: 'auto',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth:1,
    marginVertical: 10,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  Textstyle: {
    fontSize: 28,
    fontWeight: 'bold',
},
});

export default App;
