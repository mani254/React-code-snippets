import React, { useState } from "react";
import Collections from "./MultipleSelect.jsx";

import { animals } from "../../utils/index.js";
function CollectionsUsage() {
	const [selectedItems, setSelectedItems] = useState([]);
	return (
		<div className="center-container">
			<Collections referenceArray={animals} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
		</div>
	);
}

export default CollectionsUsage;
