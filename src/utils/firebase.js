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
  writeBatch,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

// Generate Rankings
export const generateRanking = async (branch, sem) => {
  const q = query(
    collection(db, 'teachers'),
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

export const countCompleted = async (branch, sem) => {
  const completeQuery = query(
    collection(db, 'students'),
    where('branch', '==', branch),
    where('sem', '==', sem),
    where('status', '==', true)
  )
  const incompleteQuery = query(
    collection(db, 'students'),
    where('branch', '==', branch),
    where('sem', '==', sem),
    where('status', '==', false)
  )
  const completeSnap = await getDocs(completeQuery)
  const incompleteSnap = await getDocs(incompleteQuery)
  const given = completeSnap.size
  const notgiven = incompleteSnap.size
  return { given, notgiven }
}

export const getNotCompList = async (branch, sem) => {
  const q = query(
    collection(db, 'students'),
    where('branch', '==', branch),
    where('sem', '==', sem),
    where('status', '==', false),
    orderBy('usn')
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const data = snapshot.docs.map((item) => item.data())
    return data
  } else {
    return []
  }
}

export const getProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, 'admins/' + uid))
  console.log('run fromserver')
  if (snapshot.exists()) {
    return snapshot.data()
  } else {
    return null
  }
}

export const clearAndCreate = async (branch, sem) => {
  const batch = writeBatch(db)

  const teacherQ = query(
    collection(db, 'teachers'),
    where('branch', '==', branch),
    where('sem', '==', sem),
    where('total', '>', 0)
  )
  const studentQ = query(
    collection(db, 'students'),
    where('branch', '==', branch),
    where('sem', '==', sem)
  )

  const teacherSnapshot = await getDocs(teacherQ)
  const studentSnapshot = await getDocs(studentQ)

  if (!teacherSnapshot.empty) {
    teacherSnapshot.docs.map((item) =>
      batch.update(item.ref, { avgRating: 0, total: 0 })
    )
  }
  console.log(studentSnapshot.docs.length, branch, sem)
  if (!studentSnapshot.empty) {
    studentSnapshot.docs.map((item) =>
      batch.update(item.ref, { complete: [], status: false })
    )
  }
  batch.commit()
}
