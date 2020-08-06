import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form = this.fb.group({
    cep: [{value: '', disabled: false}, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {

  }

  onSubmit() {
    console.log(this.form.value);
  }

}
