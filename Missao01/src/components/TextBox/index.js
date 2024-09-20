import { View, Text, TextInput } from "react-native"
import styles from "./styles"

export default function TextBox(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword}
                onChangeText={(texto) => props.onChangeText(texto)}
                value={props.value}
            />
        </View>
    )
}