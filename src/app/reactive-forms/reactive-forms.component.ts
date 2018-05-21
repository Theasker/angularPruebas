// https://academia-binaria.com/formularios-reactivos-con-Angular/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  public name: string;
  public form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit() {
    this.name = 'ALBERTO';
    this.form = this.formBuilder.group({
      email: [
        'info@angular.io',
        [ Validators.required, Validators.email ]
      ],
      name: [
        this.name.toLowerCase(),
        Validators.required
      ],
      registeredOn : new Date().toISOString().substring(0, 10),
      password: [
        '',
        [ Validators.required, Validators.minLength(4) ]
      ]
    });
  }
    
  public onSubmit (formValue: any) {
    console.log(formValue);
    //{ email:'info@angular.io' }
  }

}
