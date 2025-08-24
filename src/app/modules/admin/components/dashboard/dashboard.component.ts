import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  tests: any[] = [];
  selectedCategoryId: number | null = null;
  selectedCategoryName: string = '';
  isLoading = false;

  constructor(private adminService: AdminService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.adminService.getAllCategories().subscribe({
      next: (res) => this.categories = res.data,
      error: (err) => console.error(err)
    });
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    const selected = this.categories.find(c => c.id === categoryId);
    this.selectedCategoryName = selected?.name || '';
    this.loadTestsByCategory(categoryId);
  }

  loadTestsByCategory(categoryId: number) {
    this.isLoading = true;
    this.adminService.getTestsByCategory(categoryId).subscribe({
      next: (res) => {
        this.tests = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  viewTest(id: number) {
    this.router.navigate(['/admin/view-test', id]);
  }

  addQuestions(id: number) {
    this.router.navigate(['/admin/add-question', id]);
  }


  deleteTest(id: number): void {
  const confirmed = confirm('Are you sure you want to delete this test?');

  if (!confirmed) return;

  this.adminService.deleteTest(id).subscribe({
    next: (res) => {
      console.log('✅ Deleted:', res);

      // Reload tests. If no category is selected, load all.
      if (this.selectedCategoryId != null) {
        this.loadTestsByCategory(this.selectedCategoryId);
      } 
    },
    error: (err) => {
      console.error('❌ Failed:', err);
      alert('❌ Failed to delete test.');
    }
  });
}




  getAllTests() {
    this.adminService.getAllTests().subscribe({
      next: (res) => {
        this.tests = res;
      },
      error: (err) => console.error(err)
    });
  }


}
