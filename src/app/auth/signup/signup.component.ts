import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

function mustContainQuestionMark(control:AbstractControl){
  if(control.value.includes('?'))return null;
  else return {mustContainQuestionMark:true}
}

function passwordsMatch(control:AbstractControl){
  const password=control.get('password');
  const confirmPassword=control.get('confirmPassword');
  if(password?.value===confirmPassword?.value)return null;
  else return {passwordsDontMatch:true}
}

function equalValues(control1:string,control2:string):ValidatorFn{
  return (control:AbstractControl)=>{
    const val1=control.get(control1)?.value;
    const val2=control.get(control2)?.value;
    if(val1===val2)return null;
    else return {notEqual:true}
  }
}


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {
  isSubmitted=false;
  
  private formBuilder=inject(FormBuilder)
  form=this.formBuilder.group({
    email:['',{validators:[Validators.required,Validators.email]}],


    passwords:this.formBuilder.group({
      password:['',{validators:[Validators.required,Validators.minLength(6),Validators.maxLength(12),mustContainQuestionMark]}],
      confirmPassword:['',{validators:[Validators.required,mustContainQuestionMark]}]
    },{validators:[equalValues('password','confirmPassword')]}),


    name:this.formBuilder.group({
      fName:['',{validators:[Validators.required]}],
      lName:['',{validators:[Validators.required]}]
    }),


    address:this.formBuilder.group({
      street:['',{validators:[Validators.required]}],
      number:['',{validators:[Validators.required]}],
      postalCode:['',{validators:[Validators.required]}],
      city:['',{validators:[Validators.required]}]
    }),


    role:['student',{validators:[Validators.required]}],


    source:this.formBuilder.array([
      this.formBuilder.control(false),
      this.formBuilder.control(false),
      this.formBuilder.control(false)
    ]),


    agree:[false,{validators:[Validators.requiredTrue]}]
    
  })

  get emailIsInvalid(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched && this.form.get('email')?.dirty
  }

  get passwordIsInvalid(){
    return this.form.controls.passwords.touched && this.form.controls.passwords.invalid && this.form.controls.passwords.dirty
  }

  get singlePasswordIsInvalid(){
    return this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.invalid && this.form.controls.passwords.controls.password.dirty
  }

  get fNameIsInvalid(){
    return this.form.controls.name.controls.fName.touched && this.form.controls.name.controls.fName.invalid && this.form.controls.name.controls.fName.dirty
  }

  get lNameIsInvalid(){
    return this.form.controls.name.controls.lName.touched && this.form.controls.name.controls.lName.invalid && this.form.controls.name.controls.lName.dirty
  }

  get addressIsInvalid() {
    return this.form.controls.address.touched && this.form.controls.address.invalid && this.form.controls.address.dirty
}

get agreeIsInvalid(){
  return this.form.controls.agree.invalid 
}



  onReset(){
      this.isSubmitted=false
      this.form.reset();
  }

  onSubmit(){
    this.isSubmitted=true
    if(this.form.valid) {
      console.log(this.form.value);
      this.onReset();
    }
    else{
      this.form.markAllAsTouched();
      Object.keys(this.form.controls).forEach(key=>this.form.get(key)?.markAsDirty());
      Object.keys(this.form.controls.passwords.controls).forEach(key=>this.form.get('passwords')?.get(key)?.markAsDirty());
      
    
  }
  }
  
}


