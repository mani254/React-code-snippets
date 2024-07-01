import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import GoogleSignIn from "./components/SignIn/GoogleSignIn";

import FormComponentUsage from "./components/FormComponents/FromComponentUsage.jsx";
import CollectionsUsage from "./components/MultipleSelect/MultipleSelectUsage.jsx";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/googlesignin" element={<GoogleSignIn />} />
				<Route path="/formcomponents" element={<FormComponentUsage />} />
				<Route path="/collections" element={<CollectionsUsage />} />
			</Routes>
		</div>
	);
}

export default App;
