import React, { useState } from 'react';

export default function Test() {
  const {BlockBlobClient, AnonymousCredential } = require('@azure/storage-blob');
  const sasKey = `?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-29T19:45:23Z&st=2022-09-19T12:45:23Z&spr=https&sig=yx%2FKdyP71JQtzprvrusOKa2%2BYFkC8FaG2U3PAoEw07w%3D`
  const url = 'https://easyevent.blob.core.windows.net'
  const container = 'image'
  const [picture, setPicture] = useState([]);

  const blobUpload = (file) => {
    var blobName = buildBlobName(file)
    var login = url + '/' + container + '/' + blobName + '?' + sasKey
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential())
    blockBlobClient.uploadBrowserData(file).then(
      response=>{
        console.log(response)
      }
    )
  }

  

  const buildBlobName = (file) => {
   
    var filename = file.name.substring(0, file.name.lastIndexOf('.'))
    var ext = file.name.substring(file.name.lastIndexOf('.'))
    return filename + '_' + Math.random().toString(16).slice(2) + ext
  }
  const onChangePicture = (e) => {
    setPicture( e.target.files[0]);
    console.log('picture', picture);
    
  }

    return (
    <div>
      <input type="file" onChange={onChangePicture} />
      <button onClick={()=>blobUpload(picture, url, container, sasKey)}>Upload</button>
      
    </div>
    )}