"use client";
import { useState } from "react";
export default function Home() {
  const [image, setImage] = useState(null);

  const fetchData = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', 'hellper');
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dd3esfmam/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setImage(jsonData.secure_url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      fetchData(file);
    }
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange}></input>

      {image && (
        <div className="flexrow">
          <div>successfully uploaded</div>
          <img src={image} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}
