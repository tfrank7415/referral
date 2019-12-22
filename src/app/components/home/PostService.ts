import { Injectable } from '@angular/core';
import { Posts } from 'src/app/models/posts';

@Injectable ({
    providedIn: 'root'
})
export class PostService {
    getPosts(): Posts[] {
        return [
            {
                location: 'San Antonio, TX',
                description: 'Angular web developer',
                company: 'SAIC',
                datePosted: '12/21/2019'
            },
            {
                location: 'Huntsville, AL',
                description: 'Angular web developer',
                company: 'Leidos',
                datePosted: '12/21/2019'
            }
        ];
    }
}
