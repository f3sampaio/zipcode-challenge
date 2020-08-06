import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViacepService } from './viacep.service';
import { Viacep } from './models/viacep.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public searched = false;
  public validCepLegnth = false;

  public form = this.fb.group({
    cep: [{ value: '', disabled: false }, Validators.required]
  });

  public ceps: Viacep[] = [];
  public cepsList: Viacep[] = [];

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViacepService
  ) {

  }
  ngOnInit(): void {
    this.form.get('cep').valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.validCepLegnth = true;
      }
    });
  }

  onSubmit() {
    this.searched = true;
    const inputCep = this.form.get('cep').value;
    this.viaCepService.getCep(inputCep).subscribe((res: any) => {
      if (!res.erro && !this.isRepeated(inputCep)) {
        this.ceps.push(res);
        this.cepsList.push(res);
      }
    });
  }

  exclude(index) {
    this.ceps.splice(index, 1);
  }


  public applyFilter(list: Viacep[]) {
    this.ceps = list;
  }

  private isRepeated(cep) {
    const filtered = this.cepsList.filter((each) => {
      return this.getSplittedCep(each.cep) === cep;
    });

    if (filtered && filtered.length > 0) {
      return true;
    }

    return false;
  }

  private getSplittedCep(cep) {
    const splittedCep = cep.split('-');
    return `${splittedCep[0]}${splittedCep[1]}`;
  }

}
