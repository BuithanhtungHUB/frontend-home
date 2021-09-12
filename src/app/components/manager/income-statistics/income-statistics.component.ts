import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
import {ManagerService} from "../../../services/manager.service";

@Component({
  selector: 'app-income-statistics',
  templateUrl: './income-statistics.component.html',
  styleUrls: ['./income-statistics.component.css']
})
export class IncomeStatisticsComponent implements OnInit {
  public house_list: any
  public years: Array<any> = [];
  public currentYear: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Thu nhập' },
  ];

  public color: Color[] = [
    {
      backgroundColor: 'rgba(189,7,7,0.3)',
    },
  ];
  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    let date = new Date();
    this.currentYear = date.getFullYear();
    for (let i = 0; i <= 10; i++) {
      this.years[i] = i + this.currentYear - 5;
    }
    this.managerService.getHousesManager().subscribe(res => {
      this.house_list = res.houses;
    })
    for (let i = 0; i < 12; i++) {
      // @ts-ignore
      this.barChartLabels[i] = i + 1;
    }
  }

  sendData(houseSelect: any, yearSelect: any) {
    let house_id = houseSelect.value;
    let year = yearSelect.value;
    this.managerService.getIncomeStatistics(house_id, year).subscribe(res => {
      // console.log(res);
      this.barChartData= [
        { data: res, label: 'Thu nhập' },
      ];
    })
  }
}
