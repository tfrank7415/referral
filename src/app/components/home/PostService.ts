import { Injectable } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable ({
    providedIn: 'root'
})
export class PostService {

    postsRef: AngularFireList<any>;
    commentsRef: AngularFireList<any>;
    postsList: Observable<any[]>;


    constructor(private db: AngularFireDatabase) {
        this.postsRef = db.list('posts');
        this.commentsRef = db.list('comments');
    }

    // The below returns data from firebase and adds the key to the observable being returned
    getPostsFromFirebase(): Observable<any> {
        return this.postsList = this.postsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
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

    addNewComment(postKey: string, value: any) {
        this.commentsRef.push({ postId: postKey, comment: value });
    }
}
