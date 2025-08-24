import React, { useState } from 'react'
// import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
import MediaUpload from '../utils/mediaUpload'

// const projectURL = "https://mqbsnrrmseedisyxgwbx.supabase.co"

// const anonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYnNucnJtc2VlZGlzeXhnd2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzI4ODAsImV4cCI6MjA2OTY0ODg4MH0.r6LCI8IUjwXnITnv1XMyIim2ABBvbIi7zxphGbPsdtw"


export default function Test2Page() {
    const [file, setFile] = useState(null)
    // Initialize Supabase client
    //const supabase = createClient(projectURL, anonKey)

    function handleUpload(){

        MediaUpload(file).then(
            (url)=>{
                console.log(url)
                toast.success("image uploaded successfully")
            }
    ).catch((error) => {
        console.error("Error uploading file", error);
        toast.error("error uploading file");
    })


        // if(file==null){
        //     toast.error("Please select a file to upload")
        //     return;
        // }

        // supabase.storage.from("images").upload(file.name, file,{
        //     cacheControl: "3600",   
        //     upsert: false
        // }).then(
        //     ()=>{
        //         toast.success("File uploaded successfully")
        //         const publicURL = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
        //         console.log("Public URL:", publicURL)
        //     }
        // ).catch(
        //     (error)=>{
        //         console.error("Error uploading file:", error)
        //         toast.error("Error uploading file")
        //     }
        // )
    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <input type="file" 
      //accept='image/' 
      onChange={
        (e)=>{
            setFile(e.target.files[0]);
        }
      }/>

      <button onClick={handleUpload} className='bg-accent text-white px-4 py-2 rounded-md cursor-pointer'>Upload</button>
    </div>
  )
}
