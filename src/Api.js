import {firestore, fstorage, ffieldvalue} from './firebase'
import firebase from 'firebase/app';
const db = firestore

const writePost = (collection, contents) =>{
    db.collection(collection).add({
        contents,
        comment:[],
        like: []
    })
        .then((docRef) => {
            console.log('Doc written with ID: ', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding doc: ', error);
        });
}

const getPost = (collection) => {
    db.collection(collection).get().then((querySnapshot) => {
        return querySnapshot.docs.map(doc=>{
            console.log(doc.data().contents)
            //(doc.data().contents)
            return doc.data()
        })
    })
}

const deletePost = (docid) => {
    db.collection('post').doc(docid).delete().then(() => {
        console.log('Doc successfully deleted')
    }).catch((error) => {
        console.error('Error removing doc: ', error)
    })
}

const writeComments = (docid, user, comment) => {
    db.collection('post').doc(docid).update({
        comment: ffieldvalue.arrayUnion({user: user, comment: comment})
    });
}

const pushLike = (docid, user) => {
    const docRef = db.collection('post').doc(docid)
    if (user in docRef.get().data().like){
        docRef.update({
            like: ffieldvalue.arrayUnion(user)
        })}
    else{
        docRef.update({
            like: ffieldvalue.arrayRemove(user)
        })
    }
}

const uploadImage = (file) => {
    const storageRef = fstorage.ref()
    const metadata = {
        contentType: 'image/jpeg'
    };
    const uploadTask = storageRef.child('image/'+file).put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.state_changed,
        function(snapshot){
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
        console.log('Upload is '+ progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.paused:
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.running:
                console.log('Upload is running');
                break;
        }
        }, function(error) {
        switch (error.code) {
            case 'storage/unauthorized':
                break
            case 'storage/canceled':
                break
        }
        }, function (){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log('File available at', downloadURL)
        })
        })
}


export {
    writePost,
    getPost,
    deletePost,
    writeComments,
    pushLike,
    uploadImage,
}