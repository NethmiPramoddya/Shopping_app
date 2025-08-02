import React from 'react'
import { createClient } from '@supabase/supabase-js'

const projectURL = "https://mqbsnrrmseedisyxgwbx.supabase.co"

const anonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYnNucnJtc2VlZGlzeXhnd2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzI4ODAsImV4cCI6MjA2OTY0ODg4MH0.r6LCI8IUjwXnITnv1XMyIim2ABBvbIi7zxphGbPsdtw"

const supabase = createClient(projectURL, anonKey)

export default function MediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("Please select a file to upload");
      return;
    }
    const timeStamp = new Date().getTime();
    const fileName = timeStamp + "-" + file.name;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    }).then(() => {
      const publicURL = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
      console.log("Public URL:", publicURL);
      resolve(publicURL);
      
    }).catch((error) => {
      console.error("Error Uploading File" + error)
      reject("Error uploading file: " + error.message);
    });
  });


  return promise;
}
