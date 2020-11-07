import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";

export default function ScoreCardItem(props) {
    return (
        <Card
            title={props.title}
            
        />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
