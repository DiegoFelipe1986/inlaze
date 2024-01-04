import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  createPostForm: FormGroup;
  createdPost: any;
  errorMessage: any;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    const userIdFromLocalStorage = localStorage.getItem('userId');

    this.createPostForm = this.fb.group({
      user_id: userIdFromLocalStorage,
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      const postData = this.createPostForm.value;

      this.httpClient.post('http://localhost:8080/api/v1/posts', postData)
        .subscribe(
          (response) => {
            this.createdPost = response;
            this.createPostForm.reset();
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/posts']);
            }, 1000);
          },
          (error) => {
            console.error('Error al crear el post:', error);
          }
        );
    }
  }
}
