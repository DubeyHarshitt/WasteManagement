import React, {useState, useEffect} from 'react';
import { Cloudinary } from 'cloudinary-core';

function Cloudinary() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("")

  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'wasteimages');
      setLoading(true);
  
      const res = await fetch("https://api.cloudinary.com/v1_1/neel0506/image/upload", {
        method: 'POST',
        body: data
      });
  
      if (!res.ok) {
        throw new Error('Failed to upload image');
      }
  
      const file = await res.json();
      console.log(file);
  
      setImage(file.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      // You can set an error state here to display an error message in your UI
      // setError(true);
      // setErrorMessage('Some Error while processing the image.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <h2>Image Upload</h2>
      <input type="file" name="file" placeholder="Upload an image"
      onChange={uploadImage} />

      {
        loading ? (
          <h3>Loading...</h3>
        ) : (
          <img src={image} style={{width: '500px'}} />
        )
      }


    </div>
  );
}
export default Cloudinary;




