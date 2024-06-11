import React, { useState } from "react";

import { TextInput, NumberInput, SelectInput, TextArea, TelInput, RadioButton, Checkbox, PasswordInput } from "./FormComponents";
import "./FormComponents.css";

const options = [
	{ value: "city-1", label: "city-1" },
	{ value: "city-2", label: "city-2" },
	{ value: "city-3", label: "city-3" },
];
function FromComponentUsage() {
	const [data, setData] = useState({ text: "", password: "", number: "", tel: "", city: "", gender: "" });
	const [selectedAnimals, setSelectedAnimals] = useState([]);

	function handleChange(e) {
		let { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	}

	function handleCheckbox(e) {
		const { name, checked } = e.target;

		setSelectedAnimals((prevSelected) => {
			if (checked) {
				return [...prevSelected, name];
			} else {
				return prevSelected.filter((animal) => animal !== name);
			}
		});
	}
	return (
		<div className="form-component-usage center-container">
			<TextInput placeholder="Text input" label="Text" name="text" onChange={handleChange} variant="var-1" value={data.text} />
			<PasswordInput placeholder="password" label="Password" name="password" onChange={handleChange} variant="var-1" value={data.password} />
			<NumberInput placeholder="Number" label="Number" name="number" onChange={handleChange} variant="var-1" value={data.number} />
			<TelInput placeholder="Tel" label="Tel" name="tel" onChange={handleChange} variant="var-1" value={data.tel} />
			<SelectInput label="Select City" name="city" options={options} onChange={handleChange} variant="var-1" value={data.city} />

			<RadioButton label="Male" variant="var-1" name="gender" value="male" onChange={handleChange} />
			<RadioButton label="Female" variant="var-1" name="gender" value="female" onChange={handleChange} defaultChecked />

			<Checkbox label="Dogs" variant="var-1" name="dogs" onChange={handleCheckbox} />
			<Checkbox label="Cats" variant="var-1" name="cats" onChange={handleCheckbox} />
			<Checkbox label="Birds" variant="var-1" name="birds" onChange={handleCheckbox} />
			<Checkbox label="Fish" variant="var-1" name="fish" onChange={handleCheckbox} />
		</div>
	);
}

export default FromComponentUsage;
