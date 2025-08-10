import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentAffairsService, CurrentAffairs } from '../current-affairs/current-affairs.service';

@Component({
  selector: 'app-currentaffairsview',
  templateUrl: './currentaffairsview.component.html',
  styleUrls: ['./currentaffairsview.component.scss'], 
  standalone: true,
  imports: [CommonModule]
})
export class CurrentaffairsviewComponent implements OnInit {
  currentAffairsList: CurrentAffairs[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private currentAffairsService: CurrentAffairsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentAffairs();
  }

  loadCurrentAffairs(): void {
    this.loading = true;
    this.error = null;
    
    this.currentAffairsService.getAll().subscribe({
      next: (data) => {
        this.currentAffairsList = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load current affairs data';
        this.loading = false;
        console.error('Error loading current affairs:', error);
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['admin/current-affairs']);
  }

  onEdit(id: number): void {
    this.router.navigate(['admin/current-affairs'], { queryParams: { id: id } });
  }

  onDelete(id: number, title: string): void {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.currentAffairsService.delete(id).subscribe({
        next: () => {
          this.loadCurrentAffairs(); // Reload the list
        },
        error: (error) => {
          this.error = 'Failed to delete current affairs';
          console.error('Error deleting current affairs:', error);
        }
      });
    }
  }

  trackByFn(index: number, item: CurrentAffairs): number {
    return item.id ?? index;
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return 'difficulty-default';
    }
  }
}
