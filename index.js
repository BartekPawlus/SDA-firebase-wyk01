import { app, database } from "./firebaseConfig";

import mockUsers from "./mockUsers.json";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";

import { async } from "@firebase/util";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const auth = getAuth();
const collectionRef = collection(database, "users");

const formLog = document.querySelector("#formLog");
const emailLog = document.querySelector("#emailLog");
const passwordLog = document.querySelector("#passwordLog");

const addUserForm = document.querySelector("#addUserForm");
const emailUser = document.querySelector("#emailUser");
const passwordUser = document.querySelector("#passwordUser");
const ageUser = document.querySelector("#ageUser");
const getUsers = document.querySelector("#getUsers");

const formFiltr = document.querySelector("#formFiltr");
const emailFiltr = document.querySelector("#emailFiltr");

const updateId = document.querySelector("#updateId");
const updatePassword = document.querySelector("#updatePassword");

const deleteId = document.querySelector("#deleteId");
const deleteUserInput = document.querySelector("#deleteUser");



const register = async (event) => {
	event.preventDefault();

	const emailValue = email.value;
	const passwordValue = password.value;

	if (passwordValue.length >= 6) {
		// createUserWithEmailAndPassword(auth, emailValue, passwordValue)
		//   .then((userCredental) => {
		//     console.log(userCredental);
		//   })
		//   .catch((error) => {
		//     const { message } = error;
		//     if (message.includes("email-already-in-use"))
		//       alert("email already used!");
		//   });
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				emailValue,
				passwordValue
			);
			if (!response) return alert("response is not okay");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	} else alert("hasło minimum 6 znaków");
};

const signIn = async (event) => {
	event.preventDefault();
	const emailLogValue = emailLog.value;
	const passwordLogValue = passwordLog.value;
	try {
		const response = await signInWithEmailAndPassword(
			auth,
			emailLogValue,
			passwordLogValue
		);
		if (!response) return alert("Undefined response");
		const { user } = response;
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};

const addUser = async (event) => {
	event.preventDefault();
	const emailUserValue = emailUser.value;
	const passwordUserValue = passwordUser.value;
	const ageUserValue = ageUser.value;
	try {
		const data = await addDoc(collectionRef, {
			email: emailUserValue,
			password: passwordUserValue,
			age: ageUserValue,
		});
		if (!data) return alert("Undefined response");
		console.log(data);
		alert("user add!");
	} catch (error) {
		console.log(error);
	}
};

const readData = async () => {
	try {
		const response = await getDocs(collectionRef);
		if (!response) throw Error("data unedifined");
		console.log(response.docs.map((item) => ({ 
      ...item.data(), id: item.id})));
	} catch (error) {
		console.log(error);
	}
};

const filtrUser = async (event) =>{
  event.preventDefault();
  const emailFiltrValue = emailFiltr.value;
  if(emailFiltrValue === null ) {
    alert ("Nie wpisano danych");
  } else {
    try {
      const emailFiltrQuery = query(
        collectionRef, where("email", "==", emailFiltrValue)
      );
      const response = await getDocs(emailFiltrQuery);
      if (!response) throw Erorr("Data undefined");
      console.log(response.docs.map((item) => ({ 
        ...item.data(), id: item.id})));

    } catch (error) {
      console.log(error);
    }
  }
}

const snapshotData = () => {
  onSnapshot(collectionRef, (data) => {
    console.log(
      data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }))
    );
  });
};

const userToUpdate = async (event) =>{
  event.preventDefault();
  const userToUpdate = doc(database, "users", updateId.value);
  try{

    await updateDoc(userToUpdate, { password: updatePassword.value});
    alert('zaktualizowano hasło!')
  } catch (error){
    console.log(error);

  }
}
  
snapshotData();

const deleteUser = async (event)=>{
  event.preventDefault();
  const userToDelete = doc(database, "users", deleteId.value);
  try{
      await deleteDoc(userToDelete);
      alert('usuwanie zakonczone sukcesem');
  }catch(error){
      console.log(error);
      alert('nie udalo sie usunac uzytkownika');
  }
};

form.addEventListener("submit", register);
formLog.addEventListener("submit", signIn);
addUserForm.addEventListener("submit", addUser);
formFiltr.addEventListener("submit", filtrUser);
getUsers.addEventListener("click", readData);
updatePassword.addEventListener("click", userToUpdate);
deleteUserInput.addEventListener("click", deleteUser);


