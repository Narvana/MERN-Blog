import React, { useEffect, useRef,useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateStart,updateFailure,updateSuccess,deleteStart,deleteFailure,deleteSuccess,signoutSuccess
} from '../redux/user/userSlice'
import { Alert,TextInput, Button,  Modal, ModalBody, } from 'flowbite-react'

import {HiOutlineExclamationCircle} from 'react-icons/hi'

import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'

import {useNavigate, Link} from 'react-router-dom'

import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
  
  const imgPick=useRef()

  const [imageFile,setImageFile]=useState(null);
  const [imageFileURL,setImageFileURL]=useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})

  const navigate=useNavigate()
  
  const dispatch=useDispatch()
  const {currentUser,error,loading}=useSelector((state) => state.user)

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

    setImageFileUploading(true);
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
        setImageFileUploadError('Could not upload image, File size must be less than 2MB');
        // dispatch(updateFailure('Could not upload, File size is greater than 2MB'))
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null)
        setImageFileUploading(false)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

          setImageFileURL(downloadURL);
          setFormData({...formData, profilePicture:downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id] : e.target.value});
    // console.log(formData);
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();

    setUpdateUserError(null);

    setUpdateUserSuccess(null);

    if(Object.keys(formData).length===0){
      setUpdateUserError('No Changes Made');
      return;
    }
    if(imageFileUploading)
    {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    
    try {
      dispatch(updateStart())
      // console.log(currentUser._id);
      // console.log(currentUser);
      console.log({currentUser})

      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data=await res.json()
      console.log({data});

      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess(`User's Profile updated successfully`)
        setImageFileUploadProgress(false)

      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }

  };
  // console.log({formData});

  const handleDelete=async()=>{
    setShowModal(false);
    try {
      dispatch(deleteStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data=await res.json();
      if(!res.ok)
      {
        dispatch(deleteFailure(data.message))
      }else{
        dispatch(deleteSuccess(data))
        navigate('/signin')
      }
    } catch (error) {
      dispatch(deleteFailure(error.message))
    }
  };

  const handleSignOut=async()=>{
    try {
      const res=await fetch('/api/user/signout',{
        method: 'POST',
      });
      const data= await res.json();
      if(!res.ok)
      {
        console.log(data.message);
      }
      else{
        dispatch(signoutSuccess());
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message);      
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3 w-full '>   
     <h1 className='text-4xl text-center my-7 font-semibold '>Profile</h1>
     <form 
     className='flex flex-col gap-4'
     onSubmit={handleSubmit}
     >
      <input 
       type='file' 
       accept='image/*' 
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
      alt='user profile'
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
        onChange={handleChange}
      />
      <TextInput
        type='email'
        id='email'
        placeholder='email'
        defaultValue={currentUser.email}
        onChange={handleChange}
        
      />
      <TextInput
        type='password'
        id='password'
        placeholder='password'
        onChange={handleChange}
      />
      <Button 
       gradientDuoTone='purpleToPink' 
       outline 
       type='submit' 
       className='p-1'
       disabled={imageFileUploading || loading}
       >
        {imageFileUploading ? 'Loading...' : 'Update'}
       </Button>
     </form>
     <div className='flex justify-between'>
      <span 
      className='cursor-pointer font-semibold hover:text-purple-500 hover:font-bold'
      onClick={()=>{setShowModal(true)}}
      >
      Delete Account
      </span>
      <span  
       className='cursor-pointer font-semibold hover:text-purple-500 hover:font-bold'
       onClick={handleSignOut}
      >Sign Out</span>
     </div> 

     {
      updateUserSuccess 
      &&
      <Alert color='info' className='p-2 mt-4' >{updateUserSuccess}</Alert> 
     }

     {
      updateUserError 
      &&
      <Alert color='failure' className='p-2 mt-4' >{updateUserError}</Alert> 
     } 

     {/* {
      error 
      &&
      <Alert color='failure' className='p-2 mt-4' >{error}</Alert> 
     } */}
     
     <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      popup
      size='md'
      >
      <Modal.Header/>
      <Modal.Body>
       <div className='text-center'>
         <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mx-auto'/>
         <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
           Are you sure you want to delete your account?
         </h3>
         <div className='flex justify-center gap-4'>
         <Button color='failure' onClick={handleDelete}>
            Yes, I'm Sure
        </Button>
          <Button color='info' onClick={() => setShowModal(false)}>
            No, cancel
          </Button>
         </div>
       </div>
      </Modal.Body>
     </Modal>

    </div>

  )
}

export default DashProfile