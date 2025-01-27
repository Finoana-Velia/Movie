import { View,Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

function FavoriteList(props) {

    // const showListStore = () => {
    //     console.log();
    //     console.log("Props favorite :");
    //     console.log(props.favorites);
    //     console.log();
    // }
    return (
        // <View>
           
        // </View>
        <FlatList
            style={styles.list}
            data={props.favorites}
            renderItem={(item) => {
                <TouchableOpacity>
                    <View global >
                        <View image>

                        </View>
                        <View content>
                            <View header>
                                <Text>Title</Text>
                            </View>
                            <View description></View>
                            <View date></View>
                        </View>
                    </View>
                </TouchableOpacity>
            }}
        />
    )
}

const styles = StyleSheet.create({
    list : {
        flex : 1,
        marginTop : 20
    }
})

const mapStateToProps = state => {
    return {
        favorites : state.favorites
    }
}

// export default FavoriteList;*
export default connect(mapStateToProps)(FavoriteList);