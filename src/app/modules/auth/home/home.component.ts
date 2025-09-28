import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

 testimonials = [
  {
    name: 'Amit Sharma',
    message: 'This platform helped me crack SSC CGL in one attempt. The mock tests are spot on!',
    avatar: 'assets/avatar1.png'
  },
  {
    name: 'Priya Mehta',
    message: 'Loved the current affairs and quiz section. It made learning fun and focused.',
    avatar: 'assets/avatar2.png'
  },
  {
    name: 'Rajesh Kumar',
    message: 'The quality of questions and detailed explanations helped me improve my score significantly.',
    avatar: 'assets/avatar3.jpg'
  },
  {
    name: 'Sneha Patel',
    message: 'Best platform for government exam preparation. Highly recommended to all aspirants!',
    avatar: 'assets/avatar1.png'
  },
  {
    name: 'Vikram Singh',
    message: 'The free access to unlimited tests is amazing. It saved me thousands of rupees.',
    avatar: 'assets/avatar2.png'
  }
];

currentSlide = 0;

prevSlide() {
  this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
}

nextSlide() {
  this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
}


}
