import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PostService } from './PostService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/interfaces';
import { Posts } from 'src/app/models/posts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @ViewChild('closeBtnCommentModal', {static: false}) closeBtnCommentModal: ElementRef;
  @ViewChild('closeBtnReferralModal', {static: false}) closeBtnReferralModal: ElementRef;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
    ) {
      this.createReferralForm = this.formBuilder.group({
        location: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        company: ['', Validators.required],
        startDate: ['', Validators.required],
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
    this.closeBtnReferralModal.nativeElement.click();
  }

  public addPost() {
    this.postService.addPostsToFirebase();

  }

  onSubmitAddComment() {
    this.postService.addNewComment(this.postKey, this.addCommentForm.value.comment);
    this.closeBtnCommentModal.nativeElement.click();
  }

  addKeyToCreateForm(i) {
    this.postKey = document.getElementById('postKey_' + i).innerHTML;
  }

  onClickRetriveComments(i) {
    // Clears array of comments
    this.comments = [];
    this.postKey = document.getElementById('postKey_' + i).innerHTML;
    this.postService.getCommentsForPostTestQuery(this.postKey).subscribe((c) => {
      this.comments = c;
    });
  }
}
