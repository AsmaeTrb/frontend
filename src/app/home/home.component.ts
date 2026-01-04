import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('promoVideo', { static: false }) promoVideo!: ElementRef<HTMLVideoElement>;
  
  products: Product[] = [];
  constructor(
    private getDataService: GetDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.getDataService.getProducts().subscribe((data: Product[]) => {
    this.products = data;
  });
}

  ngAfterViewInit(): void {
    this.setupVideoObserver();
  }

 private setupVideoObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.playVideo().catch(e => {
              console.warn('Auto-play prevented:', e);
            });
          } else {
            this.pauseVideo();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    if (this.promoVideo?.nativeElement) {
      observer.observe(this.promoVideo.nativeElement);
    }
  }


  playVideo(): Promise<void> {
    if (this.promoVideo?.nativeElement) {
      return this.promoVideo.nativeElement.play();
    }
    return Promise.reject('Video element not found');
  }

  pauseVideo(): void {
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.pause();
    }
  }

isNew(product: any): boolean {
  if (!product.createdAt) return false;
  const addedDate = new Date(product.createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 10;
}

isLastPiece(product: any): boolean {
  return product.sizes?.some((s: any) => s.quantity < 10);
}

}