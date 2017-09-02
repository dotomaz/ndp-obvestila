import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	ListView,
	TouchableHighlight
} from 'react-native';
import { DrawerItems } from 'react-navigation';

import Icon from '@expo/vector-icons/Ionicons';



const Sidebar = (props) => (
	<View style={styles.container}>
		<View style={styles.header}>
			<Image style={styles.header_image} source={require("../img/logo-big.png")} resizeMode="contain"/>
		</View>
		
		<View style={styles.menu}>
			<DrawerItems {...props} />
		</View>
	</View>
);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f00",
	},

	header:{
		backgroundColor: "#cc0000",
		paddingTop: 30,
		paddingLeft: 0,
		paddingBottom: 20,
		alignItems: "center"
	},

	header_image:{
		width: "80%",
		height: 130,
	},

	menu:{
		flex: 1,
		backgroundColor: "#fff",
	},

	icon:{
		fontSize: 32,
	},

	row:{
		backgroundColor: "#ffffff",
		flexDirection: "row",
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: "center",
		alignItems: "center",

	},

	row_icon_wrapper:{
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center"
	},

	row_icon: {
		color: "#444",
	},

	row_text: {
		flex:1,
		paddingLeft: 15,
		height: 40,
		justifyContent: "center"
	},

	row_text_text: {
		fontSize: 18,
	}

});


export default Sidebar;