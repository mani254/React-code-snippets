import React, { useState, useEffect, useRef } from "react";
import { fetchImageFromUrl, getPreviewUrl } from "./utils";
import "./imageComponent.css";

function ImageComponent() {
	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);

	const [showUrlInput, setShowUrlInput] = useState(false);
	const [url, setUrl] = useState("");

	const coverImageRefs = useRef([]);
	const urlInputRef = useRef(null);

	const setCoverImageHeight = () => {
		coverImageRefs.current.forEach((ref) => {
			if (ref) {
				const width = ref.offsetWidth;
				ref.style.height = `${width}px`;
			}
		});
	};

	useEffect(() => {
		setCoverImageHeight();
		window.addEventListener("resize", setCoverImageHeight);

		return () => {
			window.removeEventListener("resize", setCoverImageHeight);
		};
	}, [previewImages, images]);

	useEffect(() => {
		if (showUrlInput && urlInputRef.current) {
			urlInputRef.current.focus();
		}
	}, [showUrlInput]);

	async function handleAddUrl(imgUrl) {
		if (!imgUrl) return;
		try {
			const image = await fetchImageFromUrl(imgUrl);
			if (image) {
				setImages((prev) => [...prev, image]);
				let previewUrl = getPreviewUrl(image);
				setPreviewImages((prev) => [...prev, previewUrl]);
				setUrl("");
				setShowUrlInput(false);
			}
		} catch (err) {
			window.alert("Can't load the image");
		}
	}

	async function handleFileChange(event) {
		const files = Array.from(event.target.files);
		const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

		for (const file of files) {
			if (validTypes.includes(file.type)) {
				try {
					const image = await fetchImageFromUrl(URL.createObjectURL(file));
					setImages((prev) => [...prev, image]);
					const previewUrl = getPreviewUrl(image);
					setPreviewImages((prev) => [...prev, previewUrl]);
				} catch (err) {
					console.error("Error loading file:", err);
				}
			} else {
				window.alert("Invalid file type: " + file.name);
			}
		}
	}

	function handleDelete(index) {
		const newPreviewImages = previewImages.filter((_, i) => i !== index);
		const newImages = images.filter((_, i) => i !== index);

		setPreviewImages(newPreviewImages);
		setImages(newImages);
	}

	return (
		<div style={{ paddingTop: "300px", maxWidth: "600px", margin: "auto" }}>
			<div className="image-container">
				<div className="image-grid">
					{previewImages.length == 0 ? (
						<div className="empty-state">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60px" height="60px">
								<path d="M 31.306641 8.3085938 C 25.940641 8.3085938 21.574219 12.672062 21.574219 18.039062 L 21.574219 79.574219 C 21.574219 84.940219 25.940641 89.306641 31.306641 89.306641 L 74.841797 89.306641 C 80.208797 89.306641 84.574219 84.941172 84.574219 79.576172 L 84.574219 29.556641 C 84.574219 29.291641 84.46925 29.037609 84.28125 28.849609 L 64.035156 8.6015625 C 63.848156 8.4135625 63.594125 8.3085938 63.328125 8.3085938 L 31.306641 8.3085938 z M 31.306641 10.306641 L 62.574219 10.306641 L 62.574219 20.792969 C 62.574219 26.039969 66.843844 30.306641 72.089844 30.306641 L 82.574219 30.306641 L 82.574219 79.574219 C 82.574219 83.837219 79.105797 87.306641 74.841797 87.306641 L 31.306641 87.306641 C 27.043641 87.306641 23.574219 83.838219 23.574219 79.574219 L 23.574219 18.039062 C 23.574219 13.776062 27.042641 10.306641 31.306641 10.306641 z M 63.574219 10.966797 L 81.912109 29.306641 L 72.089844 29.306641 C 67.393844 29.306641 63.574219 25.487969 63.574219 20.792969 L 63.574219 10.966797 z M 35.232422 15.265625 C 33.621422 15.265625 32.077578 15.767797 30.767578 16.716797 C 28.767578 18.164797 27.574219 20.497078 27.574219 22.955078 L 27.574219 75.617188 C 27.574219 79.856187 31.009422 83.306641 35.232422 83.306641 L 70.917969 83.306641 C 75.139969 83.306641 78.574219 79.856188 78.574219 75.617188 L 78.574219 57.806641 C 78.574219 57.530641 78.350219 57.306641 78.074219 57.306641 C 77.798219 57.306641 77.574219 57.530641 77.574219 57.806641 L 77.574219 75.619141 C 77.574219 79.307141 74.588969 82.308594 70.917969 82.308594 L 35.232422 82.308594 C 31.561422 82.308594 28.574219 79.307141 28.574219 75.619141 L 28.574219 22.955078 C 28.574219 20.817078 29.613516 18.789344 31.353516 17.527344 C 32.492516 16.702344 33.834422 16.265625 35.232422 16.265625 C 35.508422 16.265625 35.732422 16.041625 35.732422 15.765625 C 35.732422 15.489625 35.508422 15.265625 35.232422 15.265625 z M 38.007812 36.306641 C 35.562813 36.306641 33.574219 38.295234 33.574219 40.740234 L 33.574219 67.099609 C 33.510112 67.238141 33.506224 67.396237 33.574219 67.53125 L 33.574219 72.873047 C 33.574219 75.318047 35.563812 77.306641 38.007812 77.306641 L 44.880859 77.306641 C 44.8829 77.306666 44.884678 77.308594 44.886719 77.308594 C 44.889424 77.308594 44.891828 77.306685 44.894531 77.306641 L 69.140625 77.306641 C 71.585625 77.306641 73.574219 75.317047 73.574219 72.873047 L 73.574219 40.740234 C 73.574219 38.295234 71.584625 36.306641 69.140625 36.306641 L 38.007812 36.306641 z M 38.007812 37.306641 L 69.140625 37.306641 C 71.034625 37.306641 72.574219 38.847234 72.574219 40.740234 L 72.574219 62.611328 L 63.425781 49.101562 C 63.332781 48.963562 63.177719 48.880859 63.011719 48.880859 C 62.885719 48.893859 62.688703 48.965469 62.595703 49.105469 L 51.044922 66.585938 L 43.730469 56.494141 C 43.640469 56.371141 43.500609 56.294109 43.349609 56.287109 C 43.197609 56.271109 43.050219 56.341078 42.949219 56.455078 L 34.574219 65.925781 L 34.574219 40.740234 C 34.574219 38.847234 36.113813 37.306641 38.007812 37.306641 z M 45.574219 39.306641 C 42.265219 39.306641 39.574219 41.997641 39.574219 45.306641 C 39.574219 48.615641 42.265219 51.306641 45.574219 51.306641 C 48.882219 51.306641 51.574219 48.615641 51.574219 45.306641 C 51.574219 41.997641 48.883219 39.306641 45.574219 39.306641 z M 45.574219 40.306641 C 48.331219 40.306641 50.574219 42.549641 50.574219 45.306641 C 50.574219 48.063641 48.331219 50.306641 45.574219 50.306641 C 42.817219 50.306641 40.574219 48.063641 40.574219 45.306641 C 40.574219 42.549641 42.817219 40.306641 45.574219 40.306641 z M 78.074219 44.306641 C 77.798219 44.306641 77.574219 44.530641 77.574219 44.806641 L 77.574219 47.806641 C 77.574219 48.082641 77.798219 48.306641 78.074219 48.306641 C 78.350219 48.306641 78.574219 48.082641 78.574219 47.806641 L 78.574219 44.806641 C 78.574219 44.530641 78.350219 44.306641 78.074219 44.306641 z M 78.074219 49.306641 C 77.798219 49.306641 77.574219 49.530641 77.574219 49.806641 L 77.574219 55.806641 C 77.574219 56.082641 77.798219 56.306641 78.074219 56.306641 C 78.350219 56.306641 78.574219 56.082641 78.574219 55.806641 L 78.574219 49.806641 C 78.574219 49.530641 78.350219 49.306641 78.074219 49.306641 z M 63.015625 50.279297 L 72.535156 64.337891 C 72.545653 64.353466 72.562374 64.361015 72.574219 64.375 L 72.574219 72.873047 C 72.574219 74.766047 71.034625 76.308594 69.140625 76.308594 L 45.818359 76.308594 L 63.015625 50.279297 z M 43.285156 57.585938 L 50.455078 67.476562 L 44.619141 76.308594 L 38.007812 76.308594 C 36.113812 76.308594 34.574219 74.766047 34.574219 72.873047 L 34.574219 67.435547 L 43.285156 57.585938 z" />
							</svg>
							<p>Upload images, drag and drop, or add from a URL.</p>

							<div className="action-buttons">
								<div className="file-upload">
									<button>Add Files</button>
									<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />
								</div>
								<button className="url-toggle" onClick={() => setShowUrlInput(!showUrlInput)}>
									Add From Url
								</button>
							</div>
						</div>
					) : (
						<div className="image-items">
							{previewImages.map((value, index) => {
								return (
									<div className="cover-image-wrapper" key={index} ref={(el) => (coverImageRefs.current[index] = el)}>
										<img src={value} alt="product-image" id={index} />
										<div className="delete" onClick={() => handleDelete(index)}>
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 255.99556 255.99556" width="16px" height="16px" fillRule="nonzero">
												<g fillOpacity="0.98039" fill="#bd3d21" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
													<g transform="scale(10.66667,10.66667)">
														<path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z" />
													</g>
												</g>
											</svg>
										</div>
									</div>
								);
							})}
							<div className="cover-image-wrapper add-block" ref={(el) => coverImageRefs.current.push(el)}>
								<div className="file-upload">
									<button>Add Files</button>
									<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />
								</div>
								<button className="url-toggle" onClick={() => setShowUrlInput(!showUrlInput)}>
									Add From Url
								</button>
							</div>
						</div>
					)}

					{showUrlInput && (
						<div className="url-input">
							<input
								type="text"
								placeholder="Enter URL"
								ref={urlInputRef}
								onChange={(e) => setUrl(e.target.value)}
								value={url}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										handleAddUrl(url);
									}
								}}
							/>
							<button onClick={() => handleAddUrl(url)}>Add Image</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ImageComponent;
