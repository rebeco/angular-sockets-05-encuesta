import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartDataSets,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { Label } from 'ng2-charts';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: [],
})
export class EncuestaComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
  ];
  public barChartType: ChartType = 'bar';

  public barChartData: any[] = [
    { data: [65, 59, 80, 81], label: 'Entrevistados' },
  ];

  constructor(private http: HttpClient, private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.escucharSocket();

    this.http.get<any[]>('http://localhost:5000/grafica').subscribe((data) => {
      this.barChartData = data;
    });
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe((data) => {
      this.barChartData = data as any[];
    });
  }
}
