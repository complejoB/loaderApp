import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() config: number = 1;
  @Output() loaderFinished = new EventEmitter<void>();

  imagesSet1 = [
    { src: 'assets/img1.webp', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit - 1.' },
    { src: 'assets/img2.webp', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit - 2.' },
    { src: 'assets/img3.webp', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit - 3.' },
    { src: 'assets/img4.webp', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit - 4.' },
    { src: 'assets/img5.webp', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit - 5.' },
  ];

  currentIndex: number = 0;
  currentImage: any;
  interval: any;
  totalDuration: number = 20000; // Tiempo total en milisegundos (20 segundos)
  intervalTime: number = 2000; // Tiempo entre cambios de imagen
  images: any[] = []; // Para almacenar la secuencia de imágenes aleatorias

  ngOnInit() {
    // Mezclar las imágenes y asignar la primera imagen
    this.images = this.shuffleImages(this.imagesSet1);
    this.currentImage = this.images[this.currentIndex];

    // Cambiar la imagen cada intervalo de tiempo
    this.interval = setInterval(() => {
      // Cambiar a la siguiente imagen
      this.currentIndex++;
      
      // Reiniciar el índice si se ha alcanzado el final
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0; // Reiniciar al principio después de mostrar todas las imágenes
      }
      this.currentImage = this.images[this.currentIndex];
    }, this.intervalTime);

    // Detener el loader después del tiempo total
    setTimeout(() => {
      this.stopLoader();
      this.loaderFinished.emit(); // Emitir el evento cuando el loader termine
    }, this.totalDuration);
  }

  ngOnDestroy() {
    this.stopLoader();
  }

  // Método para detener el loader
  stopLoader() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.currentImage = null; // Para ocultar la imagen al final
  }

  // Método para mezclar las imágenes
  shuffleImages(images: any[]) {
    return images.sort(() => Math.random() - 0.5);
  }
}