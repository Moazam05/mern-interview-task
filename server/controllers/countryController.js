const catchAsync = require("../utils/catchAsync");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const key = process.env.FIXER_API_KEY;

const countryURL = (country) =>
	`https://restcountries.com/v3.1/name/${country}?fullText=true`;

const currencyRateURL = (date) =>
	`http://data.fixer.io/api/${date}?access_key=${key}`;

const getTodaysDate = () => {
	const date = new Date();
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const allCountries = {};
let allCountriesRatesWithEUR = {};
let RatesAPICallingDate = getTodaysDate();
let callOnce = false;

const shouldWeUpdateCurrencyRates = () => {
	const currentDate = getTodaysDate();

	if (RatesAPICallingDate !== currentDate) {
		RatesAPICallingDate = currentDate;
		return true;
	}
	return false;
};

const updateCurrencyRates = async () => {
	await fetch(currencyRateURL(getTodaysDate()))
		.then((res) => res.json())
		.then((data) => {
			allCountriesRatesWithEUR = data.rates;
		})
		.catch((err) => console.log(err));
};

const updateCurrencyRatesOfCurrentCountriesWeHave = async () => {
	Object.keys(allCountries).forEach((country) => {
		let listOfOfficialCurrencies =
			allCountries[country].listOfOfficialCurrencies;
		Object.keys(listOfOfficialCurrencies).forEach((symbol) => {
			listOfOfficialCurrencies[symbol].rate_with_EUR =
				allCountriesRatesWithEUR[symbol];
		});
	});
};

const getCountry = async (country) => {
	if (!callOnce || shouldWeUpdateCurrencyRates()) {
		callOnce = true;
		await updateCurrencyRates();
		await updateCurrencyRatesOfCurrentCountriesWeHave();
	}

	if (allCountries[country]) {
		return allCountries[country];
	}

	const countryObj = {};

	await fetch(countryURL(country))
		.then((res) => res.json())
		.then((data) => {
			let fullName = data[0].name.official;
			let population = data[0].population;
			let listOfOfficialCurrencies = data[0].currencies;
			countryObj.fullName = fullName;
			countryObj.population = population;

			Object.keys(listOfOfficialCurrencies).forEach((symbol) => {
				listOfOfficialCurrencies[symbol].rate_with_EUR =
					allCountriesRatesWithEUR[symbol];
			});

			countryObj.listOfOfficialCurrencies = listOfOfficialCurrencies;
			allCountries[country] = countryObj;
		})
		.catch((err) => console.log(err));

	return allCountries[country];
};

exports.country = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: "success",
		data: await getCountry(req.params.name),
	});
});
