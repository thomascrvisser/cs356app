import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";

export default function ScoreCardItem({ title, navigation }) {
    const onPress = () => {
        alert(`You tapped ${title}`)
        navigation.navigate('Create')
    }
    return (
        <Card
            style={styles.container}
            title={title}
            iconName="bookmark"
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightgray"
    },
  });
