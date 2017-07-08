import Component, { tracked } from "@glimmer/component";

export default class TrackWeather extends Component {
	@tracked weather;
	@tracked area;

	constructor(options) {
		super(options);
		this.loadWeather();
	}

	onKeyUp(event) {
		this.addZip = event.target.value;
	}

	async loadWeather() {
		// let zip = this.args.zip || 97239;
		let response1 = await fetch(`http://api.wunderground.com/api/625172310aff38a6/geolookup/q/97239.json`);
		this.area = await response1.json();

		let city = this.area.location.city;
		let state = this.area.location.state;

		let response2 = await fetch(`http://api.wunderground.com/api/625172310aff38a6/conditions/q/${state}/${city}.json`);
		this.weather = await response2.json();
		console.log(this.weather.current_observation.temp_f);
		setTimeout( () => { this.loadWeather(); }, 10000);
	}
};
