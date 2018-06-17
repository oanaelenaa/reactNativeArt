import Firebase from '../Firebase'
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  const uid = Firebase.registrationInfo.UID;
  return new Promise((resolve, reject) => {
    let uploadBlob = null
    const imageRef = Firebase.storageRef.ref(`/scans/${uid}`).child(imageName)
    fs.readFile(uri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const convertTaBase64 = (uri) => {
  var result = null;
  let mime = 'image/jpg'
  fs.readFile(uri, 'base64')
    .then((data) => {
      result = Blob.build(data, { type: `${mime};BASE64` })
    })
  return result;
}

const getBlob = (uri) => {
  Blob.build(RNFetchBlob.wrap(uri), { type: 'application/octet-stream' })
    .then(blob => {
      return blob;

      /*	imageRef
          .put( blob, { contentType: 'application/octet-stream' })
          .then( () => {
            blob.close()
            return imageRef.getDownloadURL()
          })*/
    })
  return null;
}

export function upload_image(localFile, remoteFile) {

  let rnfbURI = RNFetchBlob.wrap(localFile)
  try {
    RNFetchBlob.polyfill.Blob
      .build(rnfbURI, { type: 'image/jpg;' })
      .then((blob) => {
        // upload image using Firebase SDK (code never gets here)
        Firebase.storage()
          .ref()
          .child("/images/" + remoteFile)
          .put(blob, { contentType: 'image/jpg' })
          .then((snapshot) => {
            /// upload success, code never gets here
            blob.close()
            done()
          })
      })
  }
  catch (err) {
    // handle error (code never gets here)
  }
}

export function getBlobFromFilePath(uri) {
  //create Blob using file path like '/data/foo/bar/img.png'
  Blob.build(RNFetchBlob.wrap(path_of_the_image), { type: 'image/png' })
    .then((blob) => { return blob; })
  return blob;

}

export function getBlobUsingBase64(uri) {
  // create Blob using base64 encoded string 
  Blob.build(base64_encoded_string_data, { type: 'image/png;BASE64' })
    .then((blob) => { return blob; })
}
//  const Blob = RNFetchBlob.polyfill.Blob


