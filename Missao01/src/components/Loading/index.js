import { React }from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "./styles";

function Loading({ color = '#1888f8', text = 'Carregando...', size = 'large' }) {
    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}>{text}</Text>
            <ActivityIndicator color={color} size={size} />
        </View>
    );
}

export default Loading;
