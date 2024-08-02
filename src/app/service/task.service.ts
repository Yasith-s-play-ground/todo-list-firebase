import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Observable, timestamp} from "rxjs";

export type Task = {
  _id: string,
  description: string,
  completed: boolean,
  user: string,
  timestamp:Timestamp
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskCollectionRef;

  constructor(private fireStore: Firestore) {

    this.taskCollectionRef = collection(fireStore, "task" /* collection name */);

    /* read all data */
    // getDocs(taskCollectionRef).then(
    //   /* get snap shot of database */
    //   querySnapshot => {
    //     /* iterate each */
    //     querySnapshot.forEach(doc => {
    //       /* print each document */
    //       console.log(doc.data());
    //     })
    //   }
    // );

    //use collection data API
    // get documents (data) from the collection using collectionData
    // collectionData(taskCollectionRef).subscribe(
    //   (docs: []) => console.log(docs));
  }

  /* filter this user's tasks */
  getTasks(user: string) {
    const queryGetTasks = query(this.taskCollectionRef, where("user",
      "==", user));
    /* request id of doc when getting the task */
    return collectionData(queryGetTasks, {idField: "_id"}) as Observable<Task[]>;

  }

  /* removing task */
  removeTask(task: Task) {
    /* send this document to delete doc method */
    deleteDoc(doc(this.taskCollectionRef, task._id));
  }

  /* to update the completed status of a task */
  updateTaskStatus(task: Task) {
    const docReference = doc(this.taskCollectionRef, task._id);
    updateDoc(docReference, {
      /* clicking the checkbox doesn't change value of variable */
      completed: !task.completed
    });
  }

  /* method to create a task */
  async createNewTask(description: string, user: string) {
    const newTask = {
      description,
      user,
      completed: false,
      timestamp:Timestamp.now() /* timestamp to identify the time, task was added */
    };
    await addDoc(this.taskCollectionRef, newTask);
  }
}
