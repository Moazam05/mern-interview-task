import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Heading, SubHeading } from "../../components/Heading";
import { useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import { CarSchema } from "./Components/validationSchema";
import { onKeyDown } from "../../utils";
import PrimaryInput from "@/src/components/PrimaryInput";
import { ISCarForm } from "./Components/typeInterface";
import PrimaryPhoneInput from "../../components/PhoneInput";
import SelectInput from "../..//components/SelectInput";
import { cityTypes, noOfCopiesTypes } from "../../utils/StaticValues";
import Errors from "../../components/Error";
import RadioGroupField from "../../components/RadioGroup";

const Dashboard = () => {
  // Redux
  const name = useSelector((state: any) => state?.auth?.user?.data?.user?.name);
  // States
  const [formValues, setFormValues] = useState<ISCarForm>({
    carModel: "",
    price: "",
    phoneNumber: "",
    city: "Lahore",
    noOfCopy: "",
  });

  const CarHandler = async (data: ISCarForm) => {
    const payload = {
      carModel: data.carModel,
      price: data.price,
      phoneNumber: data.phoneNumber,
    };

    console.log("payload", payload);
  };

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
          {name.toUpperCase()}
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
          <Heading
            sx={{
              fontSize: "35px",
              marginBottom: "15px",
            }}
          >
            Car Registration
          </Heading>
          <Box
            sx={{
              boxShadow: "0px 0px 33px 0px rgba(0,0,0,0.1)",
              padding: "20px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowX: "auto",
            }}
          >
            <Formik
              initialValues={formValues}
              onSubmit={(values: ISCarForm) => {
                CarHandler(values);
              }}
              validationSchema={CarSchema}
            >
              {(props: FormikProps<ISCarForm>) => {
                const { values, touched, errors, handleBlur, handleChange } =
                  props;

                return (
                  <Form onKeyDown={onKeyDown}>
                    <Box sx={{ marginBottom: "10px" }}>
                      <SubHeading sx={{ marginBottom: "5px" }}>
                        Car Model
                      </SubHeading>
                      <PrimaryInput
                        type="text"
                        label=""
                        name="carModel"
                        placeholder="Car Model"
                        value={values.carModel}
                        helperText={
                          errors.carModel && touched.carModel
                            ? errors.carModel
                            : ""
                        }
                        error={
                          errors.carModel && touched.carModel ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ marginBottom: "10px" }}>
                      <SubHeading sx={{ marginBottom: "5px" }}>
                        Price
                      </SubHeading>
                      <PrimaryInput
                        type="number"
                        label=""
                        name="price"
                        placeholder="Price"
                        value={values.price}
                        helperText={
                          errors.price && touched.price ? errors.price : ""
                        }
                        error={errors.price && touched.price ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ marginBottom: "10px" }}>
                      <SubHeading sx={{ marginBottom: "5px" }}>
                        Mobile Number
                      </SubHeading>
                      <PrimaryPhoneInput
                        value={values.phoneNumber}
                        name="phoneNumber"
                        formik={props}
                        variant="outlined"
                        label=""
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ marginBottom: "10px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          City
                        </SubHeading>
                        <RadioGroupField
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>

                      <Box sx={{ marginBottom: "10px", width: "50%" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          No of Copies
                        </SubHeading>
                        <SelectInput
                          styles={{ width: "100%" }}
                          name="noOfCopy"
                          value={values.noOfCopy}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.noOfCopy && touched.noOfCopy ? true : false
                          }
                          label="No of Copies"
                          data={noOfCopiesTypes}
                          options={noOfCopiesTypes?.map(
                            (copyType: any, index: number) => ({
                              ...copyType,
                              id: copyType.id,
                              value: copyType.value,
                              label: copyType.name,
                            })
                          )}
                        >
                          {errors.noOfCopy && (
                            <Errors
                              sx={{
                                fontSize: "12px",
                                color: "#d32f2f",
                                margin: "3px 0",
                              }}
                            >
                              {errors.noOfCopy && touched.noOfCopy
                                ? errors.noOfCopy
                                : ""}
                            </Errors>
                          )}
                        </SelectInput>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        //   disabled={loadingLoginUser}
                        sx={{
                          padding: "5px 30px",
                          textTransform: "capitalize",
                        }}
                      >
                        Add Car
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
