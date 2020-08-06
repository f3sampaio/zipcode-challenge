import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Viacep } from '../models/viacep.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input()
  public cepList: Viacep[];

  @Output()
  public output: EventEmitter<any> = new EventEmitter();

  public searchForm = this.fb.group({
    cep: [],
    uf: [],
    city: [],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  search() {
    const cepControl = this.searchForm.get('cep');
    const ufControl = this.searchForm.get('uf');
    const cityControl = this.searchForm.get('city');
    let items = [];

    if (cepControl.value !== '' || ufControl.value !== '' || cityControl.value !== '') {
      items = this.cepList.filter((each: Viacep) => {
        return this.getSplittedCep(each.cep) === cepControl.value ||
          each.uf === ufControl.value ||
          each.localidade === cityControl.value;
      });
    } else {
      items = this.cepList;
    }

    this.output.emit(items);
    console.log('emitted>', items);
  }

  clear() {
    this.searchForm.reset();
    this.output.emit(this.cepList);
  }

  private getSplittedCep(cep) {
    const splittedCep = cep.split('-');
    return `${splittedCep[0]}${splittedCep[1]}`;
  }



}
