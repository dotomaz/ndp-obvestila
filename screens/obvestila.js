import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	ListView,
	ActivityIndicator,
	TouchableHighlight
} from 'react-native';

import { Header, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {observer} from "mobx-react";

@observer class ObvestilaScreen extends React.Component {

	static navigationOptions = {
	    drawerLabel: "",
	    drawerIcon: ({ tintColor }) => (
	      <Icon style={[styles.icon, {color: tintColor}]} name="ios-football" />
	    ),
	  };


	constructor () {
		super()
		this.state = {
			selectedIndex: 0
		}
		this.updateGroupIndex = this.updateGroupIndex.bind(this)
	}  

	componentWillMount() {
		
		// load default from server
		this.props.screenProps.store.loadObvestila();

		ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

	}

	componentWillUpdate(){

	}

	componentWillReact() {
		const {store} = this.props.screenProps;
		const {state} = this.props.navigation;

		if( store.selekcija != state.routeName.toLowerCase() ){
			store.setSelekcija(state.routeName);
		}

	}

	_onPressButton(icon)
	{
		this.props.navigation.navigate('DrawerClose');
	}

	updateGroupIndex(index){
		const {store} = this.props.screenProps;

		if( store.selectedGroupId !== index){
			store.setSelectedGroupId(index);
		}
	}

	renderRow(rowData){


		const getLoading = ( rowData ) => {
			return (
				<View style={styles.loading}>
					<ActivityIndicator size="large" />
					<Text style={styles.loadingText}>{rowData.text}</Text>
				</View>
			);
		}

		const getNoData = ( rowData ) => {
			return (
				<View style={styles.noData}>
					<Text style={styles.noDataText}>{rowData.text}</Text>
				</View>
			);
		}
		
		const getError = ( rowData ) => {
			return (
				<View>
					<Text style={{color: "red"}}>{rowData.text}</Text>
				</View>
			);
		}

		const getRow= ( rowData ) => {
			return (
				<View style={styles.row}>
					<View style={styles.rowTextContainer}>
						<View style={styles.rowTextContainer2}>
							<View style={styles.rowTextTyprContainer}>
								<Image style={styles.rowTextTypeImage} source={require("../img/icon-80.png")} resizeMode="contain"/>
								<Text style={styles.rowTextType}>{rowData.type.toUpperCase()}</Text>
							</View>
							<Text style={styles.rowText}>{rowData.content}</Text>

						</View>
					</View>
				</View>
			);
		}

		const getTekmaRow= ( rowData ) => {

			let tEkipi = rowData.ekipi.split(":");
			let domaci = tEkipi[0].trim();
			let gosti = tEkipi[1].trim();
			let headerStyle = function(domaci){
				return ( domaci.toLowerCase().indexOf("polzela") >= 0) ? styles.tekmaHeaderDoma: styles.tekmaHeaderVGosteh;
			}
			let tekmaStyle = function(domaci){
				return ( domaci.toLowerCase().indexOf("polzela") >= 0) ? styles.tekmaContainer2Doma: styles.tekmaContainer2VGosteh;
			} 

			return (
				<View style={styles.tekma}>
					<View style={styles.tekmaContainer}>
						<View style={styles.tekmaHeader}>
							<Text style={styles.tekmaHeaderTxt}>{rowData.selekcija.replace(/u/gi, "U - ")+" : "+rowData.igrisce}</Text>
						</View>	
						<View style={styles.tekmaContainer2}>
							<View style={styles.tekmaDoma}>
								<Text style={styles.txtRight}>{domaci}</Text>
							</View>
							<View style={styles.tekmaVs}>
								<Text style={styles.txtLeft}>:</Text>
							</View>
							<View style={styles.tekmaGosti}>
								<Text style={styles.txtLeft}>{gosti}</Text>
							</View>
						</View>
					</View>
				</View>
			);
		}

		const getHeader= ( rowData ) => {
			return (
				<View style={styles.row}>
					<View style={styles.rowDateContainer}>
						<Text style={styles.rowDate}>{rowData.text}</Text>
					</View>
				</View>
			);
		}


		if(rowData.type === "loading"){
			return getLoading(rowData);
		}else if(rowData.type === "no-data"){
			return getNoData(rowData);
		}else if(rowData.type === "error"){
			return getError(rowData);
		}else if(rowData.type === "header"){
			return getHeader(rowData);
		}else if(rowData.type === "tekma"){
			return getTekmaRow(rowData);
		}else{
			return getRow(rowData);
		}
	}


	render(){
		const {store} = this.props.screenProps;
		const titles = {
			"Vsi": "Vsa obvestila",
			"U7": "Obvestila za U7",
			"U9": "Obvestila za U9",
			"U11": "Obvestila za U11",
			"U13": "Obvestila za U13",
			"U15": "Obvestila za U15",
		};

		const { selectedIndex } = this.state;

		return (



			<View style={styles.container}>
				<Header 
					backgroundColor="#f00"
					leftComponent={{ 
						icon: 'menu', 
						color: '#fff', 
						onPress:() => {
							this.props.navigation.navigate("DrawerOpen"); 
						} 
					}}
					
					
					centerComponent={
						<ButtonGroup
					      onPress={this.updateGroupIndex}
					      selectedIndex={store.selectedGroupId}
					      buttons={["Obvestila","Tekme"]}
					      containerStyle={{height: 22, width: 250, backgroundColor: "#f11"}}
					      textStyle={{ color: "#fff"}}
					      selectedBackgroundColor="#fff"
					      disableSelected={true}
					       />
					}
					


					rightComponent={{ 
						icon: 'autorenew', 
						color: '#fff', 
						onPress:() => {
							const {store} = this.props.screenProps;
							store.reload();
						} 
					}}
				/>

				<ListView style={styles.contents} dataSource={store.obvestilaDS} renderRow={ this.renderRow } enableEmptySections={true} {...this.props}/>
			</View>
		);
	}
};

export default ObvestilaScreen;


const styles = StyleSheet.create({

	container: {
		backgroundColor: "#fcc",
		flex:1,
		padding: 0,
		flexDirection:"column"
	},

	icon:{
		fontSize: 30,
	},

	contents: {
		marginTop: 67,
		flex:1,
		backgroundColor: "#fff",
	},

	loading:{
		padding: 50,
		alignItems: "center",
		justifyContent:"center"
	},

	loadingText:{
		fontSize: 20,
		marginTop: 30
	},

	noData:{
		padding: 50,
		alignItems: "center",
		justifyContent:"center"
	},

	noDataText:{
		fontSize: 20
	},

	row:{
		backgroundColor: "#eee",
		padding: 5
	},

	rowDateContainer:{
		backgroundColor: "#eee",
		paddingBottom: 0,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10
	},

	rowDate:{
		fontSize: 15,
		fontWeight: "bold",
		color: "#757575"

	},

	infoIcon:{
		fontSize: 40,
		color: "#f00",
		marginRight: 10
	},

	rowText:{
		fontSize: 16,
		color: "#444",
	},

	rowTextTypeImage:{
		width: 40,
		height: 40,
		marginRight: 10,
	},

	rowTextTyprContainer:{
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10

	},

	rowTextType:{
		fontSize: 18,
		color: "#444",
		fontWeight: "bold",
		
	},

	rowTextContainer2:{
		flex:1,
		paddingBottom: 20,
		paddingTop: 20
	},

	rowTextContainer:{
		backgroundColor: "#fff",
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: "row",
		alignItems: "center"

	},


	tekma: { margin:5 },
	tekmaContainer: {},
	tekmaHeader: { paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 10},
	tekmaHeaderTxt: { textAlign: "left", fontSize:16},
	tekmaContainer2: { flexDirection: "row"},
	tekmaDoma: { flex: 1,  paddingTop: 10, paddingBottom: 20, paddingRight: 10 },
	tekmaGosti: { flex:1, paddingTop: 10, paddingBottom: 20, paddingLeft: 10 },
	tekmaVs: { flex:0, paddingTop: 10, paddingBottom: 20 },
	txtRight: {textAlign: "right", fontWeight: "bold", fontSize: 18},
	txtLeft: {textAlign: "left", fontWeight: "bold", fontSize: 18},
	tekmaSelekcija: {paddingTop: 10},
	txtSelekcija: {textAlign: "center", fontSize: 18}
	
})