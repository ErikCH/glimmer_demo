import Component, { tracked } from "@glimmer/component";

export default class Weather extends Component {
	@tracked weather;

	constructor(options) {
		super(options);
		this.loadWeather();
	}

	async loadWeather() {
		let zip = this.args.zip || 97239;
		let response = await fetch(`http://api.wunderground.com/api/625172310aff38a6/conditions/q/OR/Portland.json`
);
		this.weather = await response.json();
		setTimeout( () => { this.loadWeather(); }, 2000);
	}
};
