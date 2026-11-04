import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustContainQuestionMark(control:AbstractControl){
  if(control.value.includes('?'))return null;
  else return {mustContainQuestionMark:true}

  
}
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form=new FormGroup({
    email:new FormControl('',{
      validators:[Validators.required,Validators.email]
    }),
    password:new FormControl('',{
      validators:[Validators.required,Validators.minLength(6),Validators.maxLength(12),mustContainQuestionMark]
    })
  })

  get emailIsInvalid(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.invalid && this.form.controls.password.dirty
  }

  onSubmit(){
    if(this.form.valid)
      this.form.reset();
    else
      this.form.markAllAsTouched();
      Object.keys(this.form.controls).forEach(key=>this.form.get(key)?.markAsDirty());
     
    
  }
}
