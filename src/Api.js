import {firestore} from './firebase'

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
        comment: firestore.FieldValue.arrayUnion({user: comment})
    });
}

const pushLike = (docid, user) => {
    const docRef = db.collection('post').doc(docid)
    if (user in docRef.get().data().like){
        docRef.update({
            like: firestore.FieldValue.arrayUnion(user)
        })}
    else{
        docRef.update({
            like: firestore.FieldValue.arrayRemove(user)
        })
    }

}


export {
    writePost,
    getPost,
    deletePost,
    writeComments,
    pushLike
}