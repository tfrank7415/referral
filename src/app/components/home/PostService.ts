import { Injectable } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable ({
    providedIn: 'root'
})
export class PostService {
    private dbPath = '/posts';
    PostsForHomePage: Posts[];
    postsRef: AngularFireList<Posts> = null;
    postsList: Observable<any>;

    constructor(private db: AngularFireDatabase) {
    }

    getPosts(): Posts[] {
        return [
            {
                key: '1',
                location: 'San Antonio, TX',
                title: '.Net Core developer',
                description: 'Job duties, tasks, responsibilities, etc...',
                company: 'SAIC',
                datePosted: '12/21/2019'
            },
            {
                key: '2',
                location: 'Huntsville, AL',
                title: '.Net Core developer',
                description: 'Job duties, tasks, responsibilities, etc...',
                company: 'Leidos',
                datePosted: '12/21/2019'
            }
        ];
    }
    // The below returns data from firebase database
    getPostsFromFirebase(): Observable<any> {
        this.postsList =  this.db.list('/posts').valueChanges();
        return this.postsList;
    }

    getPostsFromFirebaseTest(): Observable<any[]> {
        return this.db.list('/posts').valueChanges();
    }

    addPostsToFirebase() {
        this.db.database.ref('posts/').push({
            location: 'Arkansas'
        });
      }

      addNewReferralToFirebase(createReferralForm: any) {
        this.db.database.ref('posts/').push({
            location: createReferralForm.location,
            title: createReferralForm.title,
            description: createReferralForm.description,
            company: createReferralForm.company,
            datePosted: createReferralForm.datePosted
        });
      }
}
