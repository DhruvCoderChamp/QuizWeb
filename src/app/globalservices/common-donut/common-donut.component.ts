import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-common-donut',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './common-donut.component.html',
  styleUrls: ['./common-donut.component.scss']
})
export class CommonDonutComponent implements OnChanges {
  @Input() segments: number[] = [];
  @Input() colors: string[] = [];
  @Input() names: string[] = [];

  hoveredIndex: number | null = null;

  readonly radius = 56;
  readonly strokeWidth = 28;

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['segments']) {
      console.log('Segments updated:', this.segments);
    }
  }

  getNormalizedSegments(): number[] {
    if (!this.segments || this.segments.length === 0) return [];
    
    // Filter out zero values first
    const nonZeroSegments = this.segments.filter(val => val > 0);
    if (nonZeroSegments.length === 0) return [];
    
    const total = nonZeroSegments.reduce((sum, val) => sum + val, 0);
    return total > 0 ? nonZeroSegments.map(val => (val / total) * 100) : [];
  }

  getSegmentAngles(): { offset: number; value: number; originalIndex: number }[] {
    if (!this.segments || this.segments.length === 0) return [];
    
    const normalized = this.getNormalizedSegments();
    let offset = 0;
    let nonZeroIndex = 0;
    
    return this.segments.map((segment, originalIndex) => {
      if (segment > 0) {
        const value = normalized[nonZeroIndex];
        const segmentData = { offset, value, originalIndex };
        offset += value;
        nonZeroIndex++;
        return segmentData;
      }
      return null;
    }).filter(item => item !== null) as { offset: number; value: number; originalIndex: number }[];
  }

  getColor(index: number, darken = false): string {
    const defaultColors = ['#2196f3', '#9c27b0', '#ff9800', '#00bcd4', '#e91e63'];
    const baseColor = this.colors[index] || defaultColors[index % defaultColors.length];
    return darken ? this.darkenColor(baseColor, 20) : baseColor;
  }

  private darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const factor = percent / 100;

    let r = Math.max(0, ((num >> 16) & 0xFF) - factor * 255);
    let g = Math.max(0, ((num >> 8) & 0xFF) - factor * 255);
    let b = Math.max(0, (num & 0xFF) - factor * 255);

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  getPercentage(index: number): string {
    const normalized = this.getNormalizedSegments();
    return normalized[index]?.toFixed(1) + '%' || '0%';
  }

  // Helper method to check if there are any non-zero segments
  hasValidSegments(): boolean {
    return this.segments && this.segments.some(segment => segment > 0);
  }
}
