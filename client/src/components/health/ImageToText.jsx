// // src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [image, setImage] = useState(null);
//     const [text, setText] = useState('');
//     const [message, setMessage] = useState('');

//     const handleImageUpload = (event) => {
//         setImage(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!image) {
//             alert("Please upload an image");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('image', image);

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/alexa-api/google-vision`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setText(response.data.text);
//             setMessage("Text extracted successfully!");
//         } catch (error) {
//             console.error('Error processing image:', error);
//             setMessage("Failed to process the image. Try again.");
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Image to Text using Google Vision API</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="file"
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     required
//                 />
//                 <button type="submit">Extract Text</button>
//             </form>
//             {message && <p>{message}</p>}
//             {text && (
//                 <div className="text-output">
//                     <h2>Extracted Text:</h2>
//                     <p>{text}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;

import React from 'react';
import Tesseract from 'tesseract.js';
import { useState } from 'react';

const ImageToText = () => {
  const [isLoading, setIsLoading] =useState(false);
  const [image, setImage] =useState('');
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Image To Text</h1>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <textarea
                className="form-control w-100 mt-5"
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToText;