import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    template: `
   <div>
    <span>Choose file</span>
    <span>{{file ? file.name : 'or drag and drop file here' }}</span>
    <input class="file-input" type="file">
  </div>
  `
})
export class FileUploadComponent {

    file: File | null = null;
    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.file = file;
    }

    constructor(private host: ElementRef<HTMLInputElement>) { }
}