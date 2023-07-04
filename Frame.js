import { StyleSheet, Text, View,Image } from 'react-native';

const Frame = (props) => {
    return(
        <View style={Styles.container}>
            <Image style={Styles.ImageView} source={{ uri: props.image }}/>
            <Text style={Styles.Textstyle}>{props.name}</Text>
        </View>
    );

};

const Styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 'auto',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B3F3FF',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15
    },
    Textstyle: {
        marginTop: 15,
        fontSize: 20,
    },
    ImageView:{
        width: '100%',
        height: undefined,
        aspectRatio: 4/3,
        resizeMode: 'cover',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15
    }
});

export default Frame;