import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() hideLink: boolean;
  searchString = '';
  constructor(public dataService: DataService,
              public router: Router,
    ) { }

  ngOnInit(): void {
  }
  
  search(){
    if (this.searchString.trim() != ''){
      // remove fts special characters
      let searchString_cleaned = this.searchString.replace(".", " ")
      .replace("?", " ")
      .replace(",", " ")
      .replace("!", " ");
      
      this.router.navigate(['/search-list', searchString_cleaned]);
    }
  }
}
