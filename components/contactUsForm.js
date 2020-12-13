import React, { Component } from "react";

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registrationDate: "2017-08-31T21:18:39Z",

			person: {
				firstName: "",
				lastName: "",
			},
			rating: {
				rating: "VIP",
			},
			sourceType: {
				sourceType: "Online Registration",
			},
			secondarySourceType: {
				secondarySourceType: "Landing Page",
			},
			firstName: "",
			lastName: "",

			emails: [
				{
					email: "",
					type: "Personal",
					primary: true,
				},
			],
			notes: [
				{
					note: "",
				},
			],
			lead: false,
		};
	}
	handleChange = (event) => {
		console.log(event.target.name);
		console.log(event.target.value);
		let time = new Date().toISOString();
		this.setState({ registrationDate: time });
		console.log(event.target.name == "Name");
		if (event.target.name === "Message") {
			this.setState({ notes: [{ note: event.target.value }] });
		} else if (event.target.name == "Name") {
			if (event.target.value.includes(" ")) {
				var firstName = event.target.value.split(" ")[0];
				var lastName = event.target.value.split(" ")[
					event.target.value.split(" ").length - 1
				];
			} else {
				firstName = event.target.value;
				lastName = event.target.value;
			}
			this.setState({
				firstName: firstName,
			});
			this.setState({ lastName: lastName });
		} else if (event.target.name == "Email") {
			console.log("Worked");
			this.setState({ emails: [{ email: event.target.value }] });
		} else {
			console.log("Failed");
		}
	};
	handleSubmit = (event) => {
		console.log(event.target);
		console.log(process.env.NEXT_PUBLIC_LASSO_SECRET);
		console.log(process.env.LASSO_SECRET);
		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			`Bearer eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjcyMjY1ODI0MDAsInRva2VuRGF0YSI6IntcbiAgXCJwcm9qZWN0SWRcIiA6IDEwNjA0LFxuICBcImNsaWVudElkXCIgOiAxNjM0LFxuICBcIm5hbWVcIiA6IFwibGFzc29MZWFkQ2FwdHVyZVwiXG59IiwiaXNzIjoiTGFzc29Ub2tlbiIsImF1ZCI6Ikxhc3NvIiwidG9rZW5JZCI6MTI5NDB9.cruCZebreoEYYEnoe89pXskueLDI7V8_FutNmaZ9gUS2FZyxUy_0uqpqsCTzK_9QN_VkOPG_6URIIMz_x4qBSG9DhZehK__0X-nsM_dvSCDX_db9rjNx9y1KmH3fszD1QL_PujTMqt4JkDSGgQ2VM2GAKtLj7d4RkTy10W7W2ye2XZ8hTruVdsJBXJME4SeSf4IqYmyo4HJJS29omtIgW8hs9M4CC8pdadPf5EsIfqnAF4_GdFKQgSUfwoqxPiCkhz43u6Kp2wNmlAbBFjkV5jHRwzkdsBdOiIs6_I25HagG7AZef4sL7Kv9fDJOauUaBRbIUbTl_MCBF8-r_jjP2w`
		);
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			registrationDate: this.state.registrationDate,
			person: this.state.person,
			rating: this.state.rating,
			sourceType: this.state.sourceType,
			secondarySourceType: this.state.secondarySourceType,
			emails: this.state.emails,
			notes: this.state.notes,
		});

		raw = JSON.stringify({
			registrationDate: new Date().toISOString(),
			person: {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			},
			rating: this.state.rating,
			sourceType: this.state.sourceType,
			secondarySourceType: this.state.secondarySourceType,
			emails: this.state.emails,
			notes: this.state.notes,
		});
		console.log(raw);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://cors-anywhere.herokuapp.com/https://api.lassocrm.com/v1/registrants/",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.then(this.setState({ lead: true }))
			.catch((error) => this.setState({ lead: "error" }));

		event.preventDefault();
	};
	render() {
		if (this.state.lead === false) {
			return (
				<form
					id="form"
					className="form bg-white shadow-xl p-2 text-left w-full mx-auto rounded-xl font-montserrat"
					style={{ top: "30rem" }}
					onSubmit={this.handleSubmit}
				>
					<div>
						<div className="whiteForm p-2 text-darkGray bg-lightGray rounded m-auto">
							<div className="grid gap-2 grid-cols-2">
								<div className="grid grid-cols-2">
									<div className="p-2 col-span-1">
										<input
											id="FirstName"
											name="First Name"
											required
											placeholder="First Name"
											type="text"
											onChange={this.handleChange}
										/>
									</div>
									<div className="p-2 col-span-1">
										<input
											id="LastName"
											name="Last Name"
											required
											placeholder="Last Name"
											type="text"
											onChange={this.handleChange}
											className=" bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="col-span-2 p-2">
										<input
											id="StreetAddress"
											name="Street Address"
											required
											placeholder="Street Address"
											type="text"
											onChange={this.handleChange}
											className="bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="p-2 col-span-1">
										<input
											id="City"
											name="City"
											required
											placeholder="City"
											type="text"
											onChange={this.handleChange}
											className=" bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="p-2 col-span-1">
										<input
											id="State"
											name="State"
											required
											placeholder="State"
											type="text"
											onChange={this.handleChange}
											className=" bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="p-2 col-span-1">
										<input
											id="ZIPCode"
											name="ZIP Code"
											required
											placeholder="ZIP Code"
											type="text"
											onChange={this.handleChange}
											className=" bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="p-2 col-span-1">
										<input
											id="RealEstateAgent"
											name="RealEstateAgent"
											required
											placeholder="Are you working with a Real Estate Agent?"
											type="text"
											onChange={this.handleChange}
											className=" bg-gray-200 p-2 rounded w-full"
										/>
									</div>
								</div>
								<div className="grid grid-cols-2">
									<div className="col-span-2 p-2">
										<input
											id="Phone"
											name="Phone"
											required
											placeholder="Phone"
											type="text"
											onChange={this.handleChange}
											className="bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="col-span-2 p-2">
										<input
											id="Email"
											name="Email"
											required
											placeholder="Email"
											type="text"
											onChange={this.handleChange}
											className="bg-gray-200 p-2 rounded w-full"
										/>
									</div>
									<div className="col-span-2 p-2">
										<input
											id="standard-basic"
											name="Message"
											required
											placeholder="Message"
											type="text"
											onChange={this.handleChange}
											className="w-full h-20 p-2 bg-gray-200 rounded"
										/>
									</div>

									<div className="col-span-2 p-2 ml-auto">
										<input
											value="Submit"
											type="submit"
											text="Submit"
											className="w-full cursor-pointer  p-4 bg-darkGray hover:bg-black rounded text-white font-semibold uppercase"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			);
		} else if (this.state.lead === true) {
			return (
				<form
					id="form"
					className="form bg-primary sticky p-4 text-left text-white w-full mx-auto rounded font-montserrat"
					style={{ top: "30rem" }}
					onSubmit={this.handleSubmit}
				>
					<div>
						<div className="header py-2 flex flex-col justify-between items-start p-4 text-darkGray bg-lightGray rounded m-auto shadow">
							<h1 className="text-2xl font-baskerville font-semibold">
								Thank You!
							</h1>
							<h2>Our Community Specialists will be in touch shortly.</h2>
						</div>
					</div>
				</form>
			);
		} else {
			return (
				<form id="form" className="form" onSubmit={this.handleSubmit}>
					<div>
						<div className="header">
							<h1>Have Questions?</h1>
							<h2>Our Community Specialists are here to help!</h2>
						</div>

						<div className="whiteForm flex justify-between items-start">
							{
								"We're sorry. Something went wrong. Please call (877) 999-2009 to speak with a community specialist."
							}
						</div>
					</div>
				</form>
			);
		}
	}
}
export default ContactForm;
