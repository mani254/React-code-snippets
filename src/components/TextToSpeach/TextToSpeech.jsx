import React, { useState, useEffect } from "react";

function TextToSpeech() {
	const [text, setText] = useState("I'm Echlon, How can I help you?");
	const [voices, setVoices] = useState([]);
	const [selectedVoice, setSelectedVoice] = useState(null);

	useEffect(() => {
		const synth = window.speechSynthesis;
		const fetchVoices = () => {
			const availableVoices = synth.getVoices();
			setVoices(availableVoices);
			if (availableVoices.length > 0) {
				console.log(availableVoices);
				setSelectedVoice(availableVoices[8]);
			}
		};

		if (speechSynthesis.onvoiceschanged !== undefined) {
			speechSynthesis.onvoiceschanged = fetchVoices;
		} else {
			fetchVoices();
		}
	}, []);

	const speakText = () => {
		if (window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance(text);
			if (selectedVoice) {
				utterance.voice = selectedVoice;
			}
			window.speechSynthesis.speak(utterance);
		} else {
			alert("Speech synthesis is not supported in your browser.");
		}
	};

	return (
		<div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
			<div>
				<h1>Text-to-Speech</h1>
				<button className="btn px-3 py-2 mt-3 d-block m-auto" style={{ cursor: "pointer" }} onClick={speakText}>
					Say Intro
				</button>
			</div>
		</div>
	);
}

export default TextToSpeech;
