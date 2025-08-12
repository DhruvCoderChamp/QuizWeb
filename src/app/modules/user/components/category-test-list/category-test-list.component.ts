import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-category-test-list',
  templateUrl: './category-test-list.component.html',
  styleUrls: ['./category-test-list.component.scss']
})
export class CategoryTestListComponent {
categoryId!: number;
  categoryName!: string;
  isLoading = true;
    tests: any[] = [];
paginatedTests: any[] = [];
currentPage: number = 1;
pageSize: number = 6;
totalPages: number = 1;

  constructor(private route: ActivatedRoute, private router:Router , private testService: TestService) {}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.categoryName = this.route.snapshot.paramMap.get('name')!;
    this.loadTests();
  }

loadTests(): void {
  this.testService.getTestsByCategory(this.categoryId).subscribe({
    next: (res) => {
      this.tests = res.data;
      this.totalPages = Math.ceil(this.tests.length / this.pageSize);
      this.updatePaginatedTests();
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load tests', err);
      this.isLoading = false;
    }
  });
}

updatePaginatedTests(): void {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedTests = this.tests.slice(start, end);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedTests();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedTests();
  }
}

formatLanguages(languages: any): string {
  try {
    if (typeof languages === 'string') {
      const parsed = JSON.parse(languages.replace(/'/g, '"'));
      return Array.isArray(parsed) ? parsed.flat().join(', ') : languages;
    }
    return Array.isArray(languages) ? languages.join(', ') : '';
  } catch (e) {
    return languages;
  }
}


startTest(testId: number): void {
  this.router.navigate(['/user/test', testId]);
}

}
