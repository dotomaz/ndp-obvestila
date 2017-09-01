import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	ListView,
	TouchableHighlight
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';


class SidebarItems extends React.Component {

	componentWillMount() {
		ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		//console.log(this.props.items);
		this.state = {
			ds: ds.cloneWithRows(this.props.items)
		}
	}

	_onPressButton(icon)
	{
		console.log("You touched: "+ icon);
		this.props.navigation.navigate('DrawerClose');
	}

	renderRow(rowData){
		return(
			<TouchableHighlight onPress={() => this._onPressButton.apply(this,[rowData.icon])}>
				<View style={ styles.row }>
					<View style={ styles.row_icon_wrapper }>
						<Icon style={[styles.icon, styles.row_icon]} name={rowData.icon} />
					</View>
					<View style={ styles.row_text }>
						<Text style={styles.row_text_text}>{rowData.title}</Text>
					</View>
					<Icon style={[styles.icon]} name="ios-arrow-forward" />
				</View>
			</TouchableHighlight>	
		);
	}


	render(){
		return (
			<ListView dataSource={this.state.ds} renderRow={ this.renderRow.bind(this) } enableEmptySections={true} {...this.props}/>
		);
	}
};

export default class Sidebar extends React.Component {
	state = {
    	fontLoaded: false,
  	};

	componentWillMount() {
		this.setState({
			items: [
				{
					id: "vsi",
					title: "Vsa obvestila",
					icon: 'ios-football',
				},
				{
					id: "u7",
					title: "U-7",
					icon: 'ios-football-outline',
				},
				{
					id: "u9",
					title: "U-9",
					icon: 'ios-football-outline',
				},
				{
					id: "u11",
					title: "U-11",
					icon: 'ios-football-outline',
				},
				{
					id: "u13",
					title: "U-13",
					icon: 'ios-football-outline',
				},
				{
					id: "u15",
					title: "U-15",
					icon: 'ios-football-outline',
				},
			]
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image style={styles.header_image} source={require("../img/logo-big.png")} />
					<Text style={styles.header_h1}>Nogometno društvo Polzela</Text>
				</View>
				
				<View style={styles.menu}>
					<SidebarItems items={this.state.items} {...this.props}/>
				</View>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header:{
		backgroundColor: "#8db916",
		paddingTop: 30,
		paddingLeft: 20,
		paddingBottom: 20,
	},

	header_image:{
	},

	header_h1:{
		marginTop:10,
		fontWeight: "700",
		fontSize: 45,
		color: "#26007d",
		marginLeft: 40,
	},

	header_h2:{
		fontWeight: "400",
		fontSize: 20,
		color: "#fff",
		marginLeft: 40,		
	},

	menu:{
		flex: 1,
		backgroundColor: "#fff",
	},

	footer:{
		backgroundColor:"#f9662a",
		paddingTop: 5,
		paddingRight: 15,
		paddingBottom: 5,
		paddingLeft: 15,
		flexDirection: "row",
		alignItems: "center"
	},

	footer_icon:{
		fontSize: 32,
		color: "#fff",
		marginRight: 20
	},

	footer_txt:{
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
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