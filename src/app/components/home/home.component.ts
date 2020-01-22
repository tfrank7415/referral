import { Component, OnInit, Input } from '@angular/core';
import { PostService } from './PostService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/interfaces';
import { Posts } from 'src/app/models/posts';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[];
  comments: any[];
  testPosts: Posts[];
  testObjects: AngularFireObject<any>;
  createReferralForm;
  addCommentForm;
  postKey;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
    ) {
      this.createReferralForm = this.formBuilder.group({
        location: '',
        title: '',
        description: '',
        company: '',
        datePosted: ''
      });

      this.addCommentForm = this.formBuilder.group({
        comment: ''
      });
    }

  ngOnInit() {
    this.postService.getPostsFromFirebase().subscribe((snaps) => {
      this.posts = snaps;
    });
  }

  onSubmit() {
    this.postService.addNewReferralToFirebase(this.createReferralForm.value);
    console.log(this.createReferralForm.value);
  }

  public addPost() {
    this.postService.addPostsToFirebase();
  }

  onSubmitAddComment() {
    this.postService.addNewComment(this.postKey, this.addCommentForm.value.comment);
  }

  addKeyToCreateForm() {
    this.postKey = document.getElementById('postKey').innerHTML;
  }

  onClickRetriveComments() {
    this.postKey = document.getElementById('postKey').innerHTML;
    // this.postService.getCommentsForPost(this.postKey).subscribe((c) => {
    //   this.comments = c;
    // });
    this.postService.getCommentsForPostTestQuery().subscribe((c) => {
      this.comments = c;
      console.log(this.comments);
    });
  }
}
