import { Heading } from "@/src/components/Heading";
import { Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useGetAllCarsQuery } from "../../redux/api/carApiSlice";

const AllCars = () => {
  // Redux
  const name = useSelector((state: any) => state?.auth?.user?.data?.user?.name);
  const router = useRouter();

  const { data: allCarsData, isLoading: allCarsDataLoading } =
    useGetAllCarsQuery({});

  return (
    <>
      <Heading
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
          fontWeight: "normal",
        }}
      >
        Welcome{" "}
        <span style={{ padding: "0 5px", fontWeight: "bold" }}>
          {name && name.toUpperCase()}
        </span>
      </Heading>
      <Box
        sx={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Heading
              sx={{
                fontSize: "35px",
                marginBottom: "15px",
              }}
            >
              Cars List
            </Heading>
            <Box>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ textTransform: "capitalize" }}
              >
                Add New Car
              </Button>
            </Box>
          </Box>

          {allCarsData?.data?.data?.map((car: any, index: string) => (
            <div key={car._id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>Car Model</Box>
                  <Box>{car.carModel}</Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>Price</Box>
                  <Box>$ {car.price}</Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>City</Box>
                  <Box>{car.city}</Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>Phone Number</Box>
                  <Box>{car.phoneNumber}</Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>Total Images</Box>
                  <Box>{car.maxPictures}</Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>Images</Box>
                  <Box>{car.images?.join(" | ")}</Box>
                </Box>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AllCars;
