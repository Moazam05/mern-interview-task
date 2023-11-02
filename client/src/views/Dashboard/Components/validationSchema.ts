import * as Yup from "yup";

export const CarSchema = Yup.object().shape({
  carModel: Yup.string().required("Car model is required").nullable(),
  price: Yup.number().required("Car price is required").nullable(),
  phoneNumber: Yup.string()
    .required("Please enter a valid Mobile Number")
    .min(13, "Please enter a valid Mobile Number")
    .nullable(),
  city: Yup.string().required("City is required").nullable(),
  noOfCopy: Yup.string().required("No of Copy is required").nullable(),
  files: Yup.array().min(1, "Please upload at least one file"),
});
