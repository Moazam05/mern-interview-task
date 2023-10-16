import React, { useState } from "react";
import { Box } from "@mui/material";
import { Heading, SubHeading } from "../../components/Heading";
import Search from "../../components/SearchBar";
import { useGetCountryQuery } from "../../redux/api/countryApiSlice";

const Dashboard = () => {
	const [searchText, setSearchText] = useState<any>("");

	const handleSearch = (event: any) => {
		let value = event.target.value.toLowerCase();
		setSearchText(value);
	};

	const { data: getCountry, isFetching: getCountryIsFetching } =
		useGetCountryQuery({
			countryName: searchText,
		});

	function getCurrencyKeys(currencyObject: any) {
		if (currencyObject) return Object?.keys(currencyObject);
	}

	const currency: any = getCurrencyKeys(
		getCountry?.data?.listOfOfficialCurrencies
	);

	function getEuroRate() {
		return getCountry?.data?.listOfOfficialCurrencies[currency]?.rate_with_EUR;
	}

	return (
		<>
			<Heading
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "20px 0",
				}}>
				Welcome
			</Heading>

			<SubHeading
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "20px 0",
				}}>
				Enter country name and hit Enter to see country details!
			</SubHeading>

			<Box
				sx={{
					margin: "25px 0",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Box sx={{ width: "50%" }}>
					<Search
						handleSearch={handleSearch}
						searchText={searchText}
						placeholder="Search Country by Name i.e pakistan"
					/>

					{getCountry === undefined ? (
						""
					) : (
						<>
							<Box
								sx={{
									margin: "50px 0",
									boxShadow: "0px 0px 33px 0px rgba(0,0,0,0.1)",
									padding: "20px",
									borderRadius: "5px",
									display: "flex",
									flexDirection: "column",
									gap: "10px",
									overflowX: "auto",
								}}>
								<Box sx={{ display: "flex" }}>
									<Box sx={{ minWidth: "150px" }}>Name</Box>
									<Box>{getCountry?.data?.fullName}</Box>
								</Box>
								<Box sx={{ display: "flex" }}>
									<Box sx={{ minWidth: "150px" }}>Population</Box>
									<Box>{getCountry?.data?.population}</Box>
								</Box>
								<Box sx={{ display: "flex" }}>
									<Box sx={{ minWidth: "150px" }}>Currency</Box>
									<Box>{currency}</Box>
								</Box>
								<Box sx={{ display: "flex" }}>
									<Box sx={{ minWidth: "150px" }}>Euro Price</Box>
									<Box>{getEuroRate()}</Box>
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Dashboard;
