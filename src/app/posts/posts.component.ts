import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] | any;
  newPostData: any = { title: '', content: '' };
  authService: any;

  constructor(private postService: PostService, private router: Router) {}

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
    if (this.authService.isLoggedIn()) {

      this.postService.createPost(this.newPostData).subscribe(
        (data) => {
          console.log('Post created:', data);
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    } else {

      console.log('Usuario no autenticado. Redirigiendo al formulario de inicio de sesión.');
    }
  }
  goToCreatePostForm() {
    this.router.navigate(['/create-post']);
  }

}
