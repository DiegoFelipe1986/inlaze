import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] | undefined;
  newPostData: any = { title: '', content: '' };

  constructor(private postService: PostService, ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        console.log(data)
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  createPost() {
    this.postService.createPost(this.newPostData).subscribe(
      (data) => {
        console.log('Post created:', data);
        this.getPosts();
        this.newPostData = { title: '', content: '' };
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
