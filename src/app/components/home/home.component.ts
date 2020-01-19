import { Component, OnInit, Input } from '@angular/core';
import { PostService } from './PostService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/interfaces';
import { Posts } from 'src/app/models/posts';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[];
  testPosts: Posts[];
  testObjects: AngularFireObject<any>;
  createReferralForm;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
    ) {
      this.createReferralForm =  this.formBuilder.group({
        location: '',
        title: '',
        description: '',
        company: '',
        datePosted: ''
      });
    }

  ngOnInit() {
    this.postService.getPostsFromFirebase().subscribe((snaps) => {
      this.posts = snaps;
      console.log(this.posts);
    });


  }

  onSubmit() {
    this.postService.addNewReferralToFirebase(this.createReferralForm.value);
    console.log(this.createReferralForm.value);
  }

  public addPost() {
    this.postService.addPostsToFirebase();
  }
}
