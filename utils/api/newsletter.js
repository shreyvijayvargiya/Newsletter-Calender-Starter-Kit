import firebase from "firebase";
import { toast } from "react-toastify";

export const fetchAllLetters = async() => {
  const letters = [];
  const firestore = firebase.firestore();
  const data = await firestore.collection("newsletters").orderBy("publishedDate", "desc").get();
  data.docs.map(item => {
    letters.push({
			...item.data(),
			id: item.id,
		});
  });
  return letters;
};

export const fetchSingleLetter = async(id) => {
  const data = await firebase.firestore().collection("newsletters").doc(id).get();
  return data.data()
};

export const postLetter = async(values) => {
  const firestore = firebase.firestore();
  await firestore.collection("newsletters").add(values);
  toast.success("Newsletter added successfully")
}