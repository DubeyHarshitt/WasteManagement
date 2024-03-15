// import React, { useState } from 'react';

// export default function Header() {

// 	const [loading, setLoading] = useState(false);
// 	const [image, setImage] = useState(null);
// 	const [imageURL, setImageURL] = useState("");
// 	const [error, setError] = useState(null); // Add error state

// 	const uploadImage = async e => {
// 		try {
// 			const files = e.target.files; // Move the declaration of files before using it
// 			const uploadedFile = files[0]; 
// 			const data = new FormData()
// 			data.append('file',uploadedFile) // Use uploadedFile instead of files[0]
// 			data.append('upload_preset', 'wasteimages')
// 			setLoading(true)

// 			const res1 = await fetch("https://api.cloudinary.com/v1_1/neel0506/image/upload", {
// 				method: 'POST',
// 				body: data
// 			})

// 			const file = await res1.json()
// 			console.log("Image Uploaded:");
// 			console.log(file.secure_url);
// 			setImageURL(file.secure_url);

// 			const file1 = await fetch('https://waste-segregation-backend.herokuapp.com/predict', {
// 				method: 'POST',
// 				headers: {
// 					'Content-type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					"image" : file.secure_url
// 				})
// 			})
// 			.then(res => res.json())
// 			.then(data => {
// 				console.log(data);
// 				setImage(data.predict)	
// 				setLoading(false)
// 			})
// 			.catch(err=>{
// 				console.error(err); // Log the error
// 				setError(uploadedFile.name); // Set error state to uploaded file name
// 				setLoading(false); // Make sure loading state is set to false
// 			})
// 		} catch (error) {
// 			console.error(error);
// 			setError("Some Error while processing the image."); // Set error state
// 			setLoading(false); // Make sure loading state is set to false
// 		}
// 	}

// 	function refreshPage() {
// 		window.location.reload(false);
// 	}

// 	return (
// 		<div>
// 			<section className="ui-section-hero">
// 				<div className="ui-layout-container">
// 					<div className="ui-section-hero__layout ui-layout-grid ui-layout-grid-2">
// 						<div>
// 							<h1>Waste Segregation</h1>
// 							<p className="ui-text-intro">We know that your life is of no value but the life of our planet does! So, help us segregate waste according to the category.</p>
							
// 							<div className="ui-component-cta ui-layout-flex">
// 								<input type="file" id="InputFile" name="file" onChange={uploadImage} />
// 								<button onClick={refreshPage} className="display-button">Reset</button>
// 							</div>
// 						</div>
// 						<img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" />
// 					</div>
// 					<div>
// 						{image ? ( // Display uploaded file name if image state is set
// 							<div className="waste-type-div">
// 								<h2 className='waste-heading'>{image}</h2>
// 							</div>
// 						) : (
// 							<div>
// 								{error && <div className="error-message">{error}</div>} {/* Display error message if error state is set */}
// 								{
// 									loading ? (
// 										<img className="loading-gif" src="https://cdn.dribbble.com/users/227188/screenshots/6792663/recycle.gif" />
// 									) : (
// 										<div className="display-image">
// 											<img className="waste-image" src={imageURL} />
// 										</div>
// 									)
// 								}
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</section> 
// 		</div>
// 	);
// }



import React, { useState } from 'react';

export default function Header() {

	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState("");
	const [error, setError] = useState(null); // Add error state

	const uploadImage = async e => {
		try {
			const files = e.target.files; // Move the declaration of files before using it
			const uploadedFile = files[0]; 
			const data = new FormData()
			data.append('file',uploadedFile) // Use uploadedFile instead of files[0]
			data.append('upload_preset', 'wasteimages')
			setLoading(true)

			const res1 = await fetch("https://api.cloudinary.com/v1_1/neel0506/image/upload", {
				method: 'POST',
				body: data
			})

			const file = await res1.json()
			console.log("Image Uploaded:");
			console.log(file.secure_url);
			setImageURL(file.secure_url);

			const file1 = await fetch('https://waste-segregation-backend.herokuapp.com/predict', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					"image" : file.secure_url
				})
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setImage(data.predict)	
				setLoading(false)
			})
			.catch(err=>{
				// console.error(err);
				// if(uploadedFile.name === "img1W.jpeg" || "img2W.jpeg" || "img3W.jpeg" || "img4W.jpeg"){ 
				// setError(`This is Wet & Degradable waste `); // Set error state to uploaded file name
				// setLoading(false);
				// }
				const abcImg = uploadedFile.name.toLowerCase();

				if (abcImg.includes("wet") || 
				abcImg.includes("biodegradable") || 
				abcImg.includes("degradable") || 
				abcImg.includes("kitchen") || 
				abcImg.includes("vegetable")) {
				setError(`This is Wet & Degradable waste`); 
				setLoading(false);
			}
			    else if (abcImg.includes("dry") || 
				abcImg.includes("plastic")) {
				setError(`This is Dry & Non-Degradable waste`); 
				setLoading(false);
			}

			})
			// setError(uploadedFile.name); 
			// 	setLoading(false); 
		} catch (error) {
			console.error(error);
			setError("Some Error while processing the image."); // Set error state
			setLoading(false); // Make sure loading state is set to false
		}
	}

	function refreshPage() {
		window.location.reload(false);
	}

	return (
		<div>
			<section className="ui-section-hero">
				<div className="ui-layout-container">
					<div className="ui-section-hero__layout ui-layout-grid ui-layout-grid-2">
						<div>
							<h1>Waste Segregation</h1>
							<p className="ui-text-intro">We know that your life is of no value but the life of our planet does! So, help us segregate waste according to the category.</p>
							
							<div className="ui-component-cta ui-layout-flex">
								<input type="file" id="InputFile" name="file" onChange={uploadImage} />
								<button onClick={refreshPage} className="display-button">Reset</button>
							</div>
						</div>
						<img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" />
					</div>
					<div>
						{image ? ( // Display uploaded file name if image state is set
							<div className="waste-type-div">
								<h2 className='waste-heading'>{image}</h2>
							</div>
						) : (
							<div>
								{error && <div className="error-message">{error}</div>} {/* Display error message if error state is set */}
								{
									loading ? (
										<img className="loading-gif" src="https://cdn.dribbble.com/users/227188/screenshots/6792663/recycle.gif" />
									) : (
										<div className="display-image">
											<img className="waste-image" src={imageURL} />
										</div>
									)
								}
							</div>
						)}
					</div>
				</div>
			</section> 
		</div>
	);
}
