import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { Alert,TextInput, Button } from 'flowbite-react'
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
  
  const {currentUser} = useSelector((state)=>state.user)

  const imgPick=useRef()

  const [imageFile,setImageFile]=useState(null);
  const [imageFileURL,setImageFileURL]=useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  

  // console.log(imageFileUploadProgress,imageFileUploadError);


  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    if(file)
    {
      setImageFile(file)
      setImageFileURL(URL.createObjectURL(file))
    }
  }

  useEffect(()=>{
    if(imageFile)
    {
      uploadImage();
    }
  },[imageFile])


  const uploadImage=async()=>{
    // console.log('uploading image...');
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploadError(null);

    const storage = getStorage(app);

    const fileName=new Date().getTime() + imageFile.name;
    
    // console.log({fileName});
  
    const storageRef=ref(storage,fileName);

    const uploadTask = uploadBytesResumable(storageRef,imageFile);
  
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        // setimageFileUploadError(error),
        setImageFileUploadError('Could not upload, File size is greater than 2MB');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileURL(downloadURL)
        });
      }
    );
  
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full '>   
     <h1 className='text-4xl text-center my-7 font-semibold '>Profile</h1>
     <form className='flex flex-col gap-4'>
     <input type='file' accept='image/*' 
     onChange={handleImageChange}
     ref={imgPick}
     hidden
     />
    <div 
       className='relative w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full shadow-md'
       onClick={()=>imgPick.current.click()}
    >

    {
      imageFileUploadProgress && (
        <CircularProgressbar 
         value={imageFileUploadProgress || 0}
         text ={`${imageFileUploadProgress}%`}
         strokeWidth={5}
         styles={{
          root:{
            width:'100%',
            height:'100%',
            position:'absolute',
            top:0,
            left:0,
          },
          path:{
            stroke: `rgba(60,152,199, 
            ${imageFileUploadProgress/100})`,
           },
         }}
        />
      )
    }
     <img 
      src={imageFileURL || currentUser.profilePicture} 
      alt='user' 
      className={`rounded-full w-full object-cover h-full border-8 border-gray-500 
      ${
        imageFileUploadProgress && imageFileUploadProgress < 100 && 
        'opacity-60'
      }
      `}
      /> 
      </div>

      {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

      <TextInput
        type='text'
        id='username'
        placeholder='username'
        defaultValue={currentUser.username}
      
      />
      <TextInput
        type='text'
        id='email'
        placeholder='email'
        defaultValue={currentUser.email}
        
      />
      <TextInput
        type='text'
        id='password'
        placeholder='password'
      />
      <Button 
       gradientDuoTone='purpleToPink' outline type='submit' className='p-1'>Update
       </Button>
     </form>
     <div className='flex justify-between'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
     </div>
    </div>

  )
}

export default DashProfile