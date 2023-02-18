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
  minPrice: Number = 0;

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

  getBuildingData() {
    return this.httpSvc.getData().subscribe((res: any) => {
      this.buildingData = res.data;
    })
  }

  applyFilterGlobal(event: any) {
    return event.target.value;
  }
}
