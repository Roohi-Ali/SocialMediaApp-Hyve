// import React, { useState, useEffect } from 'react'


// // import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
// import { v4 } from 'uuid'

// const ImageUpload = () => {

//     const [file, setFile] = useState(null)
//     const [imageList, setImageList] = useState([])

//     const imageListRef = ref(storage, 'images/')

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0])
//     }

//     const handleUpload = () => {
//         if (file) {
//             const imageRef = ref(storage, `images/${file.name + v4()}`)
//             uploadBytes(imageRef, file).then(() => {
//                 alert('image uploaded')
//             })
//         }
//     }


//   return (
//     <div className='container'>
//                 <p>Upload Image to FireStore</p>

//                 <input type='file' onChange={handleFileChange} />
//                 <button onClick={handleUpload}>Upload</button>
//                 <p>Image List Displayed Below:</p>
//                 <div className='imgDiv'>
//                     {imageList.map((url, index) => {
//                         return <img key={index} src={url} />
//                     })}
//                 </div>
//             </div>
//   )
// }

// export default ImageUpload
