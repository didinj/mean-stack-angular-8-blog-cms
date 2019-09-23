import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../post.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from '../../category.service';
import { Category } from './../../category/category';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  postForm: FormGroup;
  category = '';
  postTitle = '';
  postAuthor = '';
  postDesc = '';
  postContent = '';
  postReference = '';
  postImgUrl = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  categories: Category[] = [];

  constructor(
    private router: Router,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.postForm = this.formBuilder.group({
      category : [null, Validators.required],
      postTitle : [null, Validators.required],
      postAuthor : [null, Validators.required],
      postDesc : [null, Validators.required],
      postContent : [null, Validators.required],
      postReference : [null, Validators.required],
      postImgUrl : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPost(this.postForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/post/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getCategories() {
    this.catApi.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
