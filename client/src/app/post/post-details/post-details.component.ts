import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post = {
    category: '',
    id: '',
    postTitle: '',
    postAuthor: '',
    postDesc: '',
    postContent: '',
    postReference: '',
    postImgUrl: '',
    created: null,
    updated: null
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: PostService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails(this.route.snapshot.params.id);
  }

  getPostDetails(id: any) {
    this.api.getPost(id)
      .subscribe((data: any) => {
        this.post = data;
        this.post.id = data._id;
        console.log(this.post);
        this.isLoadingResults = false;
      });
  }

  deletePost(id: any) {
    this.isLoadingResults = true;
    this.api.deletePost(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/post']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
