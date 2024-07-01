import React, { useState } from "react";
import "./MultipleSelect.css";
import { TextInput } from "../FormComponents/FormComponents";
import { IoClose } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap-grid.css";

function Collections({ referenceArray, selectedItems, setSelectedItems, allowManual = true, variant = null }) {
	const [inputValue, setInputValue] = useState("");
	const [suggestedArray, setSuggestedArray] = useState([]);

	function onInputChange(e) {
		let { value } = e.target;
		setInputValue(value);
		if (value.length < 3) {
			return null;
		}
		const filtered = referenceArray.filter((refValue) => refValue.toLowerCase().includes(value.toLowerCase()));
		setSuggestedArray(filtered);
	}

	function isAlreayExisted(item) {
		const alreadySelected = selectedItems.some((value) => value.toLowerCase() === item.toLowerCase());
		if (alreadySelected) {
			window.alert("already selected");
			return true;
		}
		return false;
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			if (isAlreayExisted(inputValue)) return;
			if (!allowManual) return;
			setSelectedItems((prev) => [...prev, inputValue]);
			setInputValue("");
		}
	}

	function selectItem(item) {
		if (isAlreayExisted(item)) return;
		setSelectedItems((prev) => [...prev, item]);
	}

	function removeItem(index) {
		let updated = [...selectedItems];
		updated.splice(index, 1);
		setSelectedItems(updated);
	}

	return (
		<div className={`c-wrapper ${variant}`}>
			<ul className="selected-list">
				{selectedItems.map((value, index) => (
					<li key={index} className="d-flex align-items-center justify-content-center">
						<span>{value}</span>
						<span className="icon mt-2 ms-2" onClick={() => removeItem(index)}>
							<IoClose />
						</span>
					</li>
				))}
			</ul>
			<div className="i-s-wrapper">
				<TextInput label="collections:" name="inputValue" placeholder="search collection" value={inputValue} onChange={onInputChange} onKeyPress={handleKeyPress} />

				<ul className="suggestions">
					{suggestedArray.map((value, index) => (
						<li key={index} onClick={() => selectItem(value)}>
							{value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Collections;
