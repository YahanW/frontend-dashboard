import React, {useState} from 'react';
import axios from 'axios';
const { BlockBlobClient, AnonymousCredential } = require("@azure/storage-blob");

export default function Test() {
  const sasKey = "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-30T08:09:13Z&st=2022-08-31T00:09:13Z&spr=https&sig=SFwfdzm9sh1CB06rXy4ASkAhsH8jXWEoY%2BlMtJB17D0%3D";
  const url = "https://easyevent.blob.core.windows.net/";
  const container = "image";
  var blobUpload = function(file, url, container, sasKey) {
    var blobName = buildBlobName(file);
    var login = `${url}/${container}/${blobName}?${sasKey}`;
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
    blockBlobClient.uploadBrowserData(file);
  }
  function buildBlobName(file) {
    var filename = file.name.substring(0, file.name.lastIndexOf('.'));
    var ext = file.name.substring(file.name.lastIndexOf('.'));
    return filename + '_' + Math.random().toString(16).slice(2) + ext;
}
  return (
    <div>
      <h3>Test User update</h3>
      
      <button>Test</button>
         
    </div>
  )
}
