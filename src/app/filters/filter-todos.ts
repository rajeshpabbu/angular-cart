import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'todofilter',  
    pure: false  
})  
  
export class MyFilterPipe implements PipeTransform {  
    transform(items: any[], filter: boolean): any {
        console.log('filter')
        if (!items) {  
            return items.length;  
        }  
        return items.filter(item => item.isCompleted === filter).length;  
    }
}