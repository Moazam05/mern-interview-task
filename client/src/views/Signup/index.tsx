// React Imports
import React, { useState } from "react";
// Next Imports
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// MUI Imports
import { Box, Button } from "@mui/material";
// Formik
import { Form, Formik, FormikProps } from "formik";
// MUI Icons
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Utils
import { onKeyDown } from "../../utils";
// Redux API
import { useRegisterMutation } from "../../redux/api/authApiSlice";
// Custom
import { Heading, SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput";
import ToastAlert from "../../components/Toast";
import { SignUpSchema } from "./Components/validationSchema";
import { IsSignUpForm } from "./Components/typeInterface";
// Images
import NextWhiteLogo from "../../../public/nexCenterLogo.svg";

const Signup = () => {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
	const [toast, setToast] = useState({
		message: "",
		appearence: false,
		type: "",
	});
	const [formValues, setFormValues] = useState<IsSignUpForm>({
		fullName: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const hideShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const hideShowConfirmPassword = () => {
		setConfirmPasswordShow(!confirmPasswordShow);
	};

	const handleCloseToast = () => {
		setToast({ ...toast, appearence: false });
	};

	const [registerUser, { isLoading: registeringUser }] = useRegisterMutation();

	const SignUpHandler = async (data: IsSignUpForm) => {
		const payload = {
			name: data.fullName,
			email: data.email,
			password: data.password,
			passwordConfirm: data.passwordConfirm,
		};

		try {
			const user: any = await registerUser({
				body: payload,
			});

			if (user?.data?.status) {
				router.push("/login");
			}

			if (user?.error) {
				setToast({
					...toast,
					message: user?.error?.data?.message,
					appearence: true,
					type: "error",
				});
			}
		} catch (error) {
			setToast({
				...toast,
				message: "Something went wrong",
				appearence: true,
				type: "error",
			});
		}
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
						left: "-110px",
						"@media (max-width: 576px)": {
							display: "none",
						},
					}}>
					<Image src={NextWhiteLogo} alt="logo" layout="fixed" height={200} />
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
									Get Started
								</Heading>
								<SubHeading
									sx={{
										color: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "5px",
									}}>
									Already have an account ?
									<Box
										sx={{
											fontWeight: "bold",
											"&:hover": {
												textDecoration: "underline",
											},
										}}>
										<Link href="/login" passHref>
											Login
										</Link>
									</Box>
								</SubHeading>
							</Box>
						</Box>
					</Box>
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
									Create an Account
								</Heading>
								<Formik
									initialValues={formValues}
									onSubmit={(values: IsSignUpForm) => {
										SignUpHandler(values);
									}}
									validationSchema={SignUpSchema}>
									{(props: FormikProps<IsSignUpForm>) => {
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
														Full Name
													</SubHeading>
													<PrimaryInput
														type="text"
														label=""
														name="fullName"
														placeholder="Full Name"
														value={values.fullName}
														helperText={
															errors.fullName && touched.fullName
																? errors.fullName
																: ""
														}
														error={
															errors.fullName && touched.fullName ? true : false
														}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</Box>
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
												<Box sx={{ marginBottom: "10px" }}>
													<SubHeading sx={{ marginBottom: "5px" }}>
														Confirm Password
													</SubHeading>
													<PrimaryInput
														type={confirmPasswordShow ? "text" : "password"}
														label=""
														name="passwordConfirm"
														placeholder="Confirm Password"
														value={values.passwordConfirm}
														helperText={
															errors.passwordConfirm && touched.passwordConfirm
																? errors.passwordConfirm
																: ""
														}
														error={
															errors.passwordConfirm && touched.passwordConfirm
																? true
																: false
														}
														onChange={handleChange}
														onBlur={handleBlur}
														onClick={hideShowConfirmPassword}
														endAdornment={
															confirmPasswordShow ? (
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
														disabled={registeringUser}
														sx={{
															padding: "5px 30px",
															textTransform: "capitalize",
														}}>
														Sign Up
													</Button>
												</Box>
											</Form>
										);
									}}
								</Formik>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			<ToastAlert
				appearence={toast.appearence}
				type={toast.type}
				message={toast.message}
				handleClose={handleCloseToast}
			/>
		</>
	);
};

export default Signup;
