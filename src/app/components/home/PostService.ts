import { Injectable } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable ({
    providedIn: 'root'
})
export class PostService {

    postsRef: AngularFireList<any>;
    commentsRef: AngularFireList<any>;
    postsList: Observable<any[]>;
    commentsList: Observable<any[]>;
    commentsListForQuerying: Observable<any[]>;


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
        // Constructing date.
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const fullDate = month + '/' + day + '/' + year;

        // Posting form values
        this.db.database.ref('posts/').push({
            location: createReferralForm.location,
            title: createReferralForm.title,
            description: createReferralForm.description,
            company: createReferralForm.company,
            datePosted: fullDate,
            startDate: createReferralForm.startDate
        });
    }

    addNewComment(postKey: any, value: any) {
        this.commentsRef.push({ postId: postKey, comment: value });
    }

    getCommentsForPost(postKey: any): Observable<any> {
        this.getCommentsForPostTestQuery(postKey);
        return this.commentsList = this.commentsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    // The below is the query to return the comment with the associated post id
    // Add the comment Id to the the posts field.  This will allow the below query to work.
    getCommentsForPostTestQuery(postKey: any): Observable<any> {
        return this.db.list('comments', ref => ref.orderByChild('postId').equalTo(postKey)).snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => ({ data: c.payload.val() }))
                )
            );
    }
}
