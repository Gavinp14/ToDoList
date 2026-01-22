import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';

export const fetchUserTodos = async (uid: string) => {
  try {
    const todosRef = collection(db, 'todos');
    const q = query(
      todosRef, 
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};