import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLvtIBklpI-WzHyx-QEanYWqtzGUh-2nE",
  authDomain: "deploykar-412a7.firebaseapp.com",
  projectId: "deploykar-412a7",
  storageBucket: "deploykar-412a7.firebasestorage.app",
  messagingSenderId: "498691883273",
  appId: "1:498691883273:web:abbdb2515b07905ad113d8",
  measurementId: "G-9Q3HJ51BKP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ─── Save deploy history ──────────────────────────────
export const saveDeployment = async (username, deployData) => {
  try {
    await addDoc(collection(db, "deployments"), {
      username,
      repoName: deployData.repoName,
      repoUrl: deployData.repoUrl,
      deployedUrl: deployData.deployedUrl,
      framework: deployData.framework,
      status: deployData.status,
      deployedAt: new Date().toISOString(),
    });
    console.log("✅ Deploy saved to Firebase!");
  } catch (err) {
    console.error("Firebase save error:", err);
  }
};

// ─── Get deploy history ───────────────────────────────
export const getDeployments = async (username) => {
  try {
    // orderBy remove pannurom — index vendam
    const q = query(
      collection(db, "deployments"),
      where("username", "==", username)
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Client side sort pannurom
    results.sort((a, b) => new Date(b.deployedAt) - new Date(a.deployedAt));
    return results;
  } catch (err) {
    console.error("Firebase fetch error:", err);
    return [];
  }
};