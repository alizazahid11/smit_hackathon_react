import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    // Check if required fields are not empty
    if (!name || !title || !description || !url) {
      setError(true);
      return;
    }

    // Make API request to add project
    try {
      const result = await fetch("http://localhost:5000/addproject", {
        method: 'post',
        body: JSON.stringify({ name, title, description, url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        // Project added successfully, reset form fields
        setName("");
        setTitle("");
        setDescription("");
        setUrl("");
        // Project added successfully, handle success if needed
        console.log('Project added successfully');
      } else {
        // Handle error response from the server
        console.error('Error adding project:', result.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error adding project:', error.message);
    }
  };

  return (
    <div className='product'>
      <h1>Add Project</h1>
      <input type="text" placeholder="enter project name" className='inputBox' value={name} onChange={(e) => setName(e.target.value)} />
      {error && !name && <span className="invalid-input">Enter name</span>}
      <input type="text" placeholder="enter project Description" className='inputBox' value={description} onChange={(e) => setDescription(e.target.value)} />
      {error && !description && <span className="invalid-input">Enter description</span>}
      <input type="text" placeholder="enter Title" className='inputBox' value={title} onChange={(e) => setTitle(e.target.value)} />
      {error && !title && <span className="invalid-input">Enter title</span>}
      <input type="text" placeholder="enter Url" className='inputBox' value={url} onChange={(e) => setUrl(e.target.value)} />
      {error && !url && <span className="invalid-input">Enter valid url</span>}
      <button onClick={addProduct} className='appButton'>Submit Project</button>
    </div>
  );
};

export default AddProduct;
