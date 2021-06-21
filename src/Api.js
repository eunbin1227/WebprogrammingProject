import {firestore} from './firebase'

const db = firestore

const writePost = (collection, contents) =>{
    db.collection(collection).add({
        contents
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


export {
    writePost,
    getPost,
}