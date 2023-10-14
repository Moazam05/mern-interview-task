import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import BottomLogo from "../../../public/bottomLogo.svg";
import { Heading, SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput";
import { Form, Formik, FormikProps } from "formik";
import { onKeyDown } from "../../utils";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

interface ISLoginForm {
	email: string;
	password: string;
}

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required")
		.nullable(),
	password: Yup.string().required("Password is required").nullable(),
});

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [formValues, setFormValues] = useState<ISLoginForm>({
		email: "",
		password: "",
	});

	const hideShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const LoginHandler = async (data: ISLoginForm) => {
		const payload = {
			email: data.email,
			password: data.password,
		};

		console.log("payload", payload);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					height: "100vh",
					position: "relative",
				}}>
				<Box
					sx={{
						position: "fixed",
						bottom: "0",
						right: "-175px",
						"@media (max-width: 576px)": {
							display: "none",
						},
					}}>
					<Image
						src={BottomLogo}
						alt="logo"
						layout="fixed"
						height={200}
						style={{ transform: "rotate(-6deg)" }}
					/>
				</Box>

				<Box
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "row",
						"@media (max-width: 768px)": {
							flexDirection: "column-reverse",
						},
					}}>
					<Box
						sx={{
							flex: 1,
							backgroundColor: "#fff",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}>
						<Box
							sx={{
								width: "100%",
								padding: "0 100px",
								"@media (min-width: 1500px)": {
									padding: "0 50px",
									width: "550px",
								},
								"@media (min-width: 768px) and (max-width: 991px)": {
									padding: "0 45px",
								},
								"@media (min-width: 576px) and (max-width: 767px)": {
									padding: "0 50px",
									width: "550px",
								},
							}}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
								}}>
								<Heading
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}>
									Login
								</Heading>

								<Formik
									initialValues={formValues}
									onSubmit={(values: ISLoginForm) => {
										LoginHandler(values);
									}}
									validationSchema={loginSchema}>
									{(props: FormikProps<ISLoginForm>) => {
										const {
											values,
											touched,
											errors,
											handleBlur,
											handleChange,
										} = props;

										return (
											<Form onKeyDown={onKeyDown}>
												<Box sx={{ marginBottom: "10px" }}>
													<SubHeading sx={{ marginBottom: "5px" }}>
														Email
													</SubHeading>
													<PrimaryInput
														type="text"
														label=""
														name="email"
														placeholder="Email"
														value={values.email}
														helperText={
															errors.email && touched.email ? errors.email : ""
														}
														error={errors.email && touched.email ? true : false}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</Box>
												<Box sx={{ marginBottom: "10px" }}>
													<SubHeading sx={{ marginBottom: "5px" }}>
														Password
													</SubHeading>
													<PrimaryInput
														type={showPassword ? "text" : "password"}
														label=""
														name="password"
														placeholder="Password"
														value={values.password}
														helperText={
															errors.password && touched.password
																? errors.password
																: ""
														}
														error={
															errors.password && touched.password ? true : false
														}
														onChange={handleChange}
														onBlur={handleBlur}
														onClick={hideShowPassword}
														endAdornment={
															showPassword ? (
																<VisibilityOff color="disabled" />
															) : (
																<Visibility color="disabled" />
															)
														}
													/>
												</Box>
												<Box
													sx={{
														display: "flex",
														justifyContent: "end",
														marginTop: "20px",
													}}>
													<Button
														type="submit"
														variant="contained"
														sx={{
															padding: "5px 30px",
															textTransform: "capitalize",
														}}>
														Log In
													</Button>
												</Box>
											</Form>
										);
									}}
								</Formik>
							</Box>
						</Box>
					</Box>
					<Box
						sx={{
							flex: 1,
							backgroundColor: "#4158D0",
							backgroundImage:
								"linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Box sx={{ position: "relative", margin: "0 auto" }}>
							<Box
								sx={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%,-50%)",
									width: "100vh",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									textAlign: "center",
									color: "#fff",
								}}>
								<Heading sx={{ fontSize: "45px", color: "#fff" }}>
									Welcome Back
								</Heading>
								<SubHeading
									sx={{
										color: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "5px",
									}}>
									New here?
									<Box
										sx={{
											fontWeight: "bold",
											"&:hover": {
												textDecoration: "underline",
											},
										}}>
										<Link href="/signup" passHref>
											Create a new account
										</Link>
									</Box>
								</SubHeading>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Login;
