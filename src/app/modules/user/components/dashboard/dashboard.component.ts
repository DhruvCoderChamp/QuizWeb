import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

   
  categories: any[] = [];
  subject : any;

  constructor(private userService: TestService, private router: Router) {}
x
  // ngOnInit(): void {
  //   this.loadCategories();
  // }
  ngOnInit(): void {
  this.userService.getAllCategories().subscribe({
    next: (res : any) => {
      this.subject = res.data
      this.categories = this.subject.map((cat: any) => ({
        ...cat,
        imageUrl: this.getImageForCategory(cat.name)
      }));
    },
    error: (err) => {
      console.error('Failed to load categories', err);
    }
  });
}

getImageForCategory(name: string): string {
  if (!name) return 'default-category.jpg';

  const key = name.toLowerCase().trim();
  switch (key) {
    case 'mathematics':
    case 'advanced mathematics':
      return 'Mathematics.jpg';

    case 'physics':
      return 'physics.jpg';

    case 'chemistry':
      return 'chemistry.jpg';

    case 'economy':
      return 'economy.jpg';

    case 'reasoning':
      return 'reasoning.jpg';

    case 'english':
      return 'english.jpg';

    case 'biology':
      return 'biology.jpg';

    case 'history':
      return 'History.jpg';

    case 'geography':
      return 'Geography.jpg';

    case 'polity':
      return 'Polity.jpg';

    default:
      return 'default-category.jpg';
  }
}



  loadCategories() {
    this.userService.getAllCategories().subscribe({
      next: (res : any) => this.categories = res.data,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  navigateToCategory(categoryId: number, categoryName: string) {
    this.router.navigate(['/user/category', categoryId], { queryParams: { name: categoryName } });
  }
}
