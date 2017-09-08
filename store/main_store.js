import {observable, computed, action, runInAction} from "mobx";
import { ListView } from 'react-native';

class MainStore{
	
	ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	
	static URL = "https://nogomet-polzela.si/api/json/obvestila";

	cache = {};

	@observable obvestila = []
	@observable state = "done"
	@observable error = ""
	@observable selekcija = "vsi"

	@action reload(){
		this.cache = {};
		this.loadObvestila();
	}


	@computed get obvestilaDS(){
		switch(this.state){
			case "pending": 
				return this.ds.cloneWithRows([{
					type:"loading",
					text: "Nalagam podatke ..."
				}]);
			break;
			case "error": 
				return this.ds.cloneWithRows([{
					type:"error",
					text: this.error
				}]);
			break;

			default:

				let tt = this.obvestila.slice();

				if (tt.length == 0){
					return this.ds.cloneWithRows([{
						type:"no-data",
						text: "Ni obvestil."
					}]);
				}else{
					return this.ds.cloneWithRows(this.prepareForDS(tt));
				}



		}
		
	}

	prepareForDS(list){
		let out = [];
		if(list && list.length > 0){

			// first row is header
			let dd = this.getCompareSateString(list[0].date);
			out = [
				{
					type: "header",
					text: this.formatDate(list[0].date)
				}
			]

			list.forEach((el, i)=>{
				let td = this.getCompareSateString(el.date);
				console.log(td, dd);
				if( td != dd){
					// insert header row for all notifications on the same day
					out.push({
						type: "header",
						text: this.formatDate(el.date)
					});

					dd = td;
				}

				out.push(el);
			});
		}

		return out;

	}

	getCompareSateString(date){

		const d = this.str2Date(date);
		const m = d.getMonth()+1;
		const dd = d.getDate();

		return ""+d.getFullYear() + (m<10 ? "0"+m : m ) + (dd<10 ? "0"+dd : dd )

	}

	formatDate( date ) {
		const dan = ["nedelja","ponedeljek","torek","sreda","črtrtek","petek","sobota"];
		const mesec = ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"];

		const d = this.str2Date(date);		

		return dan[d.getDay()]+", "+ d.getDate()+". "+ mesec[d.getMonth()]+ " " + d.getFullYear();
	}

	str2Date(date){
		const tt = date.split(" ");
		const tt0 = tt[0].split("-");
		const tt1 = tt[1].split(":");

		return  new Date(
			parseInt(tt0[0],10),
			parseInt(tt0[1],10)-1,
			parseInt(tt0[2],10),
			parseInt(tt1[0],10),
			parseInt(tt1[1],10),
			parseInt(tt1[2],10)
		);
	}

	@action setSelekcija(selekcija){
		this.selekcija = selekcija.toLowerCase();
		this.loadObvestila();
	}

	@action loadObvestila(){
		this.state = "pending";
		this.obvestila = [];

		// read from cache

		if( typeof this.cache[this.selekcija] !== "undefined" ){
			// update data -> mobix will update the component
			this.obvestila = this.cache[this.selekcija];
			this.state = "done";
			return;
		}

		// Get the correct endpoint

		let url = MainStore.URL;
		if(this.selekcija.length == 0 || this.selekcija !== "vsi"){
			url += "/"+ this.selekcija;
		}

		// Fetch data from network

		fetch(url)
		.then((response)=>response.json())
		.then(
			(responseJson)=> {
				runInAction(() => {
					// save to cache
					this.cache[this.selekcija] = responseJson.data;
					// update data -> mobix will update the component
					this.obvestila = responseJson.data;
                    this.state = "done";
                });
			},
			(error)=>{
				runInAction(() => {
					this.error = error;
                });
			}
		);
			 
		
	}
}

export default new MainStore();