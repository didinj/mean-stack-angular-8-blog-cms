import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['catName', 'catDesc'];
  data: Category[] = [];
  isLoadingResults = true;

  constructor(private api: CategoryService) { }

  ngOnInit() {
    this.api.getCategories()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
