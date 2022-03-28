import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

// Generate Rankings
export const generateRanking = async (branch, sem) => {
  const q = query(
    collectionGroup(db, 'subs'),
    where('branch', '==', branch),
    where('sem', '==', sem),
    orderBy('avgRating', 'desc')
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const data = snapshot.docs.map((item) => item.data())
    return data
  } else {
    return []
  }
}
