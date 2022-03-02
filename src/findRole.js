import {doc,getDoc} from "firebase/firestore"
import {db} from "./firebase-config"
async function findRole(uid,setRole){
    const docRef = doc(db,"users",uid);
    const data = await getDoc(docRef);
    const userRole = data.data().role;
    setRole(userRole);
    return userRole;
}

export default findRole;