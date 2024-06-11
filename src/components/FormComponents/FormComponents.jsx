import React, { useState } from "react";
import "./FormComponents.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function TextInput({ label, variant, name, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="text" id={name} name={name} {...props} />
		</div>
	);
}

function NumberInput({ label, variant, name, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="number" id={name} name={name} {...props} />
		</div>
	);
}

function SelectInput({ label, variant, name, options, defaultValue, ...props }) {
	return (
		<div className={`select-wrapper ${variant}`}>
			{label && <label htmlFor={name}>{label}</label>}
			<select id={name} name={name} defaultValue={defaultValue} {...props}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

function TextArea({ label, variant, name, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<textarea id={name} name={name} {...props}></textarea>
		</div>
	);
}

function TelInput({ label, variant, name, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="tel" id={name} name={name} {...props} />
		</div>
	);
}

function PasswordInput({ label, variant, name, ...props }) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={`password-input ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<span className="password-wrapper">
				<input type={`${showPassword ? "text" : "password"}`} id={name} name={name} {...props} />
				<span className="icon" onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</span>
		</div>
	);
}

function Checkbox({ label, variant, name, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<input type="checkbox" id={name} name={name} {...props} />
			<label htmlFor={name}>{label}</label>
		</div>
	);
}

function RadioButton({ label, variant, name, value, ...props }) {
	return (
		<div className={`input-wrapper ${variant}`}>
			<input type="radio" id={value} name={name} value={value} {...props} />
			<label htmlFor={value}>{label}</label>
		</div>
	);
}

export { TextInput, NumberInput, SelectInput, TextArea, TelInput, RadioButton, Checkbox, PasswordInput };
