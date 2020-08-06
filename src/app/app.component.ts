import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViacepService } from './viacep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form = this.fb.group({
    cep: [{value: '', disabled: false}, Validators.required]
  });

  public ceps: any[] = [];

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViacepService
  ) {

  }

  onSubmit() {
    this.viaCepService.getCep(this.form.get('cep').value).subscribe((res: any) => {
      this.ceps.push(res);
    });
  }

}
