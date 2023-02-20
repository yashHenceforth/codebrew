import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { GenericHttpService } from './Services/generic-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  title = 'codebrew';
  buildingData: Array<any> = [];
  filterData: Array<any> = [];
  minPrice: Number = 0;
  eachConfig: String = '';
  configuration: Array<any> = []

  constructor(private httpSvc: GenericHttpService) {  }

  ngOnInit() {
    this.getBuildingData();
  }

  get getTableColumns() {
    const columns = [
      { label: 'Name', field: 'name', type: 'name', sort_field: 'name' },
      { label: 'Building', field: 'building', type: 'building', sort_field: 'building.name' },
      { label: 'Building Towers', field: 'building_towers', type: 'building_tower', sort_field: 'building_tower.tower_name' },
      { label: 'Property Type', field: 'property_type', type: 'property_type', sort_field: 'property_type.name' },
      { label: 'Configuration Name', field: 'configuration', type: 'configuration', sort_field: 'configuration.name' },
      { label: 'Min Price', field: 'min_price', type: 'min_price', sort_field: 'min_price' },
      { label: 'Bedroom', field: 'bedroom', type: 'bedroom', sort_field: 'bedroom' },
      { label: 'Bathroom', field: 'bathroom', type: 'bathroom', sort_field: 'bathroom' },
      { label: 'Half Bathroom', field: 'half_bathroom', type: 'half_bathroom', sort_field: 'half_bathroom' },
    ];
    return columns;
  }

  compareObjects(obj1: any, obj2: any) {
    return Object.keys(obj1).every(key => obj1[key] === obj2[key]);
  }

  getBuildingData() {
    this.httpSvc.getData().subscribe((res: any) => {
      this.buildingData = res.data;
      let data:any[] = [];
      this.buildingData.forEach((res: any) => {
       data.push({label: res.configuration.name, value: res.configuration.name});
      })
      setTimeout(() => {
        this.configuration = data.reduce((acc, current) => {
          const isDuplicate = acc.some((obj: any) => this.compareObjects(obj, current));
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);
      }, 3000);
    })
  }

  applyFilterGlobal(event: any) {
    return event.target.value;
  }

  selectConfiguration(event: any) {
    let data: any[] = this.buildingData;
    this.filterData = data.filter((x: any) => x.configuration.name == event.value.label);
  }
}
