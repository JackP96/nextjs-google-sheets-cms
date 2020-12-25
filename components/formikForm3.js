// Render Prop

import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

const Basic = (props) => {
	const [step, setStep] = useState(1);
	const [showAgent, setShowAgent] = useState(false);
	const [leadStatus, setLeadStatus] = useState(false);

	return (
		<div>
			<Formik
				initialValues={{
					email: "",
					firstName: "",
					lastName: "",
					streetAddress: "",
					city: "",
					state: "",
					zipCode: "",
					phone: "",
					realtor: "",
					howHeard: "",
					homebuyer: "",
					contactPreference: "",
					age: "",
					price: "",
					intentions: "",
					bedrooms: "",
					preapproved: "",
					ownOrRent: "",
					bathrooms: "",
					initials: "",
				}}
				validate={(values) => {
					if (values.realtor == "242075") {
						setShowAgent(true);
						console.log("It's working");
					} else {
						setShowAgent(false);
					}
					const errors = {};

					if (!values.email) {
						errors.email = "Required";
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = "Invalid email address";
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setStep((step) => step + 1);

					var valuesFormatted = {
						clientId: "1634",
						project: {
							name: props.community,
							projectId: props.id,
						},
						person: {
							firstName: values.firstName,
							lastName: values.lastName,
							contactPreference: values.contactPreference,
						},
						emails: [
							{
								email: values.email,
								type: "Primary",
								primary: true,
							},
						],
						phones: [
							{
								phone: values.phone,

								primary: true,
							},
						],
						addresses: [
							{
								address: values.streetAddress,
								city: values.city,
								state: values.state,
								zipCode: values.zipCode,
								country: "United States",
								type: "Home",
								primary: true,
							},
						],
						notes: [
							{
								note: "",

								_links: {
									delete: "",
								},
							},
						],
						sourceType: {
							sourceTypeId: "7214633",
							sourceType: "Walk In",
						},
						secondarySourceType: {
							secondarySourceType: "iPad Form",
						},
						sendSalesRepAssignmentNotification: true,

						questions: [
							{
								questionId: "59704",
								type: "checkbox",
								name: "How Heard",
								answers: [],
							},
							{
								questionId: "59705",
								type: "text",
								name: "Working with a Realtor",

								answers: [],
							},
							{
								questionId: "59706",
								type: "text",
								name: "Agent Name",
								answers: values.agentName,
							},
							{
								questionId: "59707",
								type: "text",
								name: "Agent Phone",
								answers: values.agentPhone,
							},
							{
								questionId: "59708",
								type: "text",
								name: "Agent Company",
								answers: values.agentCompany,
							},
							{
								questionId: "59709",
								type: "single",
								name: "First Time Home Buyer",
								answers: values.homebuyer,
							},
							{
								questionId: "59710",
								type: "single",
								name: "Own or Rent",
								answers: values.ownOrRent,
							},
							{
								questionId: "59711",
								type: "single",
								name: "Pre Approved",
								answers: values.preapproved,
							},
							{
								questionId: "59712",
								type: "single",
								name: "Contact Preference",
								answers: values.contactPreference,
							},
							{
								questionId: "59713",
								type: "single",
								name: "Age",
								answers: values.age,
							},
							{
								questionId: "59714",
								type: "single",
								name: "Price Range",
								answers: values.price,
							},
							{
								questionId: "59715",
								type: "single",
								name: "Buying Intentions",
								answers: values.intentions,
							},
							{
								questionId: "59716",
								type: "single",
								name: "Number of Bedrooms",
								answers: values.bedrooms,
							},
							{
								questionId: "59717",
								type: "single",
								name: "Number of Bathrooms",
								answers: values.bathrooms,
							},
							{
								questionId: "62359",
								type: "text",
								name: "Initials",
								answers: values.initials,
							},
						],
					};
					try {
						values.howHeard.map((answer) => {
							valuesFormatted.questions[0].answers.push({ answerId: answer });
						});
					} catch (e) {
						valuesFormatted.questions[0].answers.push({ answerId: "" });
					}
					step > 1
						? setTimeout(() => {
								//alert(JSON.stringify(values, null, 2));

								setSubmitting(true);
						  }, 400)
						: console.log("failed");
					step != 2 ? setSubmitting(false) : "";
					if (step > 1) {
						var myHeaders = new Headers();
						var formdata = new FormData();
						formdata.append("FirstName", values.firstName);
						formdata.append("LastName", values.lastName);
						formdata.append("Emails[Primary]", values.email);
						formdata.append("Phones[Cell]", values.phone);
						formdata.append("Address", values.streetAddress);
						formdata.append("City", values.city);
						formdata.append("PostalCode", values.zipCode);
						formdata.append("Country", "US");
						formdata.append("ContactPreference", values.contactPreference);
						formdata.append("PostalCode", values.zipCode);
						formdata.append("Question[59705]", values.realtor);
						formdata.append("AgentName", values.agentName);
						formdata.append("AgentCompany", values.agentCompany);
						formdata.append("AgentPhone", values.agentPhone);
						formdata.append("Question[59704]", values.howHeard);
						formdata.append("AgentPhone", values.agentPhone);
						formdata.append("ProjectID", "10362");
						formdata.append("ClientID", "1634");
						formdata.append("LassoUID", "Qi}zDkqwcF");
						console.log(valuesFormatted);
						var requestOptions = {
							method: "POST",
							headers: myHeaders,
							body: formdata,
							redirect: "follow",
						};

						fetch(
							"https://cors-anywhere.herokuapp.com/https://app.lassocrm.com/registrant_signup/",
							requestOptions
						)
							.then((response) => response.text())
							.then((result) => console.log(result))
							.then(setLeadStatus(true))
							.catch((error) => setLeadStatus("Error"));

						event.preventDefault();
					}
				}}
			>
				{({ isSubmitting }) =>
					leadStatus == false ? (
						step == 1 ? (
							<Form className="bg-white rounded-xl p-4 grid gap-4 grid-cols-2 md:grid-cols-4">
								<div className="ml-auto bg-primary rounded-full p-2 text-white uppercase font-semibold tracking-widest col-span-2 md:col-span-4">
									{step}/2
								</div>
								<div className="col-span-2 grid md:grid-cols-2 gap-4">
									<div className="col-span-1">
										<label htmlFor="firstName">First Name*</label>
										<Field
											className="p-2"
											type="text"
											name="firstName"
											required
										/>
										<ErrorMessage name="firstName" component="div" />
									</div>
									<div className="col-span-1">
										<label htmlFor="lastName">Last Name*</label>
										<Field
											className="p-2"
											type="text"
											name="lastName"
											required
										/>
										<ErrorMessage name="lastName" component="div" />
									</div>
									<div className="md:col-span-2">
										<label htmlFor="streetAddress">Street Address</label>
										<Field className="p-2" type="text" name="streetAddress" />
										<ErrorMessage name="streetAddress" component="div" />
									</div>
									<div className="col-span-1">
										<label htmlFor="city">City</label>
										<Field className="p-2" type="text" name="city" />
										<ErrorMessage name="city" component="div" />
									</div>
									<div className="col-span-1">
										<label htmlFor="state">State</label>
										<Field className="p-2" type="text" name="state" />
										<ErrorMessage name="state" component="div" />
									</div>
									<div className="col-span-1">
										<label htmlFor="zipCode">ZIP Code</label>
										<Field className="p-2" type="text" name="zipCode" />
										<ErrorMessage name="zipCode" component="div" />
									</div>
									<div className="col-span-1">
										<div id="realtor">
											Are you working with a real estate agent?
										</div>
										<div
											role="group"
											aria-labelledby="realtor"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													type="radio"
													name="realtor"
													value="242075"
													className="w-0 mr-2"
												/>
												Yes
											</label>
											<label>
												<Field
													type="radio"
													name="realtor"
													value="No"
													className="mr-2 w-0"
												/>
												No
											</label>
										</div>
										<ErrorMessage name="realtor" component="div" />
									</div>
									{showAgent == false ? (
										""
									) : (
										<>
											<div className="col-span-1">
												<label htmlFor="agentName">Agent Name</label>
												<Field className="p-2" type="text" name="agentName" />
												<ErrorMessage name="agentName" component="div" />
											</div>
											<div className="col-span-1">
												<label htmlFor="agentPhone">Agent Phone</label>
												<Field className="p-2" type="tel" name="agentPhone" />
												<ErrorMessage name="agentPhone" component="div" />
											</div>
											<div className="col-span-1">
												<label htmlFor="agentCompany">Agent Company</label>
												<Field
													className="p-2"
													type="text"
													name="agentCompany"
												/>
												<ErrorMessage name="agentCompany" component="div" />
											</div>
										</>
									)}
								</div>
								<div className="col-span-2 grid grid-cols-2 gap-4">
									<div className="col-span-2 md:col-span-1">
										<label htmlFor="phone">Phone</label>
										<Field className="p-2" type="tel" name="phone" />
										<ErrorMessage name="phone" component="div" />
									</div>
									<div className="col-span-2 md:col-span-1">
										<label htmlFor="email" required>
											Email*
										</label>
										<Field className="p-2" type="email" name="email" required />
										<ErrorMessage name="email" component="div" />
									</div>
									<div className="col-span-2">
										<div id="checkbox-group">How did you hear about us?</div>
										<div
											role="group"
											aria-labelledby="checkbox-group"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="242072"
												/>
												Broker/Agent
											</label>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="242071"
												/>
												Internet Search
											</label>

											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="242070"
												/>
												Referral
											</label>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="245811"
												/>
												MLS
											</label>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="245810"
												/>
												Zillow
											</label>

											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="245812"
												/>
												Signage
											</label>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="howHeard"
													value="242074"
												/>
												Other
											</label>
										</div>
									</div>

									<button
										className="bg-darkGray col-start-2 hover:bg-black transition hover:shadow-lg duration-150 text-white p-2 rounded uppercase tracking-wider font-semibold"
										type="submit"
										disabled={isSubmitting}
									>
										{step > 1 ? "Submit" : "Next"}
									</button>
								</div>
							</Form>
						) : (
							<Form className="bg-white rounded-xl p-4 grid gap-4 grid-cols-2 md:grid-cols-4">
								<div className="ml-auto bg-primary rounded-full p-2 text-white uppercase font-semibold tracking-widest col-span-2 md:col-span-4">
									{step}/2
								</div>
								<div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="md:col-span-2">
										<div id="homebuyer">Are you a first time homebuyer?</div>
										<div
											role="group"
											aria-labelledby="homebuyer"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													type="radio"
													name="homebuyer"
													value="242076"
													className="w-0 mr-2"
												/>
												Yes
											</label>
											<label>
												<Field
													type="radio"
													name="homebuyer"
													value="242077"
													className="mr-2 w-0"
												/>
												No
											</label>
										</div>
										<ErrorMessage name="homebuyer" component="div" />
									</div>
									<div className="col-span-2">
										<div id="ownOrRent">Do you own or rent your home?</div>
										<div
											role="group"
											aria-labelledby="ownOrRent"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													type="radio"
													name="ownOrRent"
													value="242078"
													className="w-0 mr-2"
												/>
												Own
											</label>
											<label>
												<Field
													type="radio"
													name="ownOrRent"
													value="242079"
													className="mr-2 w-0"
												/>
												Rent
											</label>
											<label>
												<Field
													type="radio"
													name="ownOrRent"
													value="242080"
													className="mr-2 w-0"
												/>
												Neither
											</label>
										</div>
										<ErrorMessage name="ownOrRent" component="div" />
									</div>
									<div className="col-span-2">
										<div id="preapproved">Have you been preapproved?</div>
										<div
											role="group"
											aria-labelledby="preapproved"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													type="radio"
													name="preapproved"
													value="242081"
													className="w-0 mr-2"
												/>
												Yes
											</label>
											<label>
												<Field
													type="radio"
													name="preapproved"
													value="242082"
													className="mr-2 w-0"
												/>
												No
											</label>
										</div>
										<ErrorMessage name="preapproved" component="div" />
									</div>
									<div className="col-span-2 flex flex-col">
										<label htmlFor="bedrooms">Number of Bedrooms Desired</label>
										<Field
											as="select"
											name="bedrooms"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select" />
											<option value="242102" label="2" />
											<option value="242103" label="3" />
											<option value="242104" label="4" />
											<option value="242105" label="5" />
											<option value="242106" label="6+" />
										</Field>
									</div>
								</div>
								<div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="col-span-2 flex flex-col">
										<label htmlFor="contactPreference">
											How do you prefer to be contacted?
										</label>
										<Field
											as="select"
											name="contactPreference"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select One" />
											<option value="242083" label="Phone Call" />
											<option value="242084" label="Email" />
										</Field>
									</div>
									<div className="col-span-2 flex flex-col">
										<label htmlFor="age">Age Range</label>
										<Field
											as="select"
											name="age"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select One" />
											<option value="242085" label="Under 25" />
											<option value="242086" label="25-34" />
											<option value="242087" label="35-49" />
											<option value="242088" label="50-64" />
											<option value="242089" label="65+" />
										</Field>
									</div>
									<div className="col-span-2 flex flex-col">
										<label htmlFor="price">Preferred Price Range</label>
										<Field
											as="select"
											name="price"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select One" />
											<option value="242090" label="$100k-150k" />
											<option value="242091" label="$150-$200k" />
											<option value="242092" label="$200k-250k" />
											<option value="242093" label="$250k-300k" />
											<option value="242094" label="$300k-350k" />
											<option value="242095" label="$350k-500k" />
											<option value="242096" label="$500k+" />
										</Field>
									</div>
									<div className="col-span-2 flex flex-col">
										<label htmlFor="intentions">Buying Intentions</label>
										<Field
											as="select"
											name="intentions"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select One" />
											<option
												value="242097"
												label="Buy now or within 3 months"
											/>
											<option value="242098" label="Buy within 6 months" />
											<option value="242099" label="Buy within 1 year" />
											<option
												value="242100"
												label="Buy when current home sells"
											/>
											<option
												value="242101"
												label="No definite plans; just looking"
											/>
										</Field>
									</div>
									<div className="col-span-2 flex flex-col">
										<label htmlFor="bathrooms">
											Number of Bathrooms Desired
										</label>
										<Field
											as="select"
											name="bathrooms"
											className="w-full md:w-2/3 bg-gray-200 p-2 rounded"
										>
											<option value="" label="Select" />
											<option value="242107" label="2" />
											<option value="242108" label="2.5" />
											<option value="242109" label="3" />
											<option value="242110" label="3.5" />
											<option value="242111" label="4+" />
										</Field>
									</div>
								</div>
								<div className="col-span-2 md:col-span-4 flex flex-wrap w-full">
									<div id="privacy-checkbox-group" className="w-full">
										Consent*
										<div
											role="group"
											aria-labelledby="privacy-checkbox-group"
											className="flex flex-wrap flex-col"
										>
											<label className="items-center flex">
												<Field
													className="items-center flex w-0 mr-2 rounded"
													type="checkbox"
													name="consent"
													required
												/>
												I agree to the privacy policy.
											</label>
										</div>
										<div className="border rounded w-full p-2 text-sm">
											I acknowledge that Davidson Homes represents the seller,
											and has explained the RECAD (Real Estate Agency Consumer
											Agency Disclosure).
										</div>
									</div>
									<div className="flex flex-row flex-wrap w-full pt-2">
										<div className="mr-auto pb-2 md:pb-0">
											<label htmlFor="initials">Initials*</label>
											<Field
												className="p-2"
												type="text"
												name="initials"
												required
											/>
											<ErrorMessage name="initials" component="div" />
										</div>
										{step == 2 ? (
											<button
												className="bg-darkGray ml-auto mr-2 hover:bg-black transition hover:shadow-lg duration-150 text-white p-2 rounded uppercase tracking-wider font-semibold"
												onClick={() => setStep(1)}
											>
												Previous
											</button>
										) : (
											""
										)}
										<button
											className="bg-darkGray hover:bg-black transition hover:shadow-lg duration-150 text-white p-2 rounded uppercase tracking-wider font-semibold"
											type="submit"
											disabled={isSubmitting}
										>
											{step > 1 ? "Submit" : "Next"}
										</button>
									</div>
								</div>
							</Form>
						)
					) : (
						<div className="bg-white rounded p-2 text-center">
							Thanks for submitting!
						</div>
					)
				}
			</Formik>
		</div>
	);
};

export default Basic;
