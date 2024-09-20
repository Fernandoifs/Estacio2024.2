import { Text,  TouchableOpacity } from "react-native"
import styles from "./styles"

function Button(props) {
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}
export default Button;