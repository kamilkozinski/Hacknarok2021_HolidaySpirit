import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { News, Tag } from '../interfaces/news';
import { NewsServiceService } from '../services/news-service.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news:any[]=[1,1,1,1,1,1,1,1,1,1]
  loading:boolean=false;
  displayedNews:News[]=[];
  displayedTags:Tag[]=[];
  @Input() sliderValue: number;
  selectedSentiment:number=0;
  selectedTags:string[]=[];
  selectedInterfaceTags:string[]=[];
  constructor(public newsService:NewsServiceService) { }
  
  ngOnInit(): void {
    this.newsService.getNews().subscribe(x=>{
      this.newsService.localNews=x;
      this.newsService.setTags();
      this.newsService.localNews[0].description=`Hillary Is 70 Days Away From Controlling All Food and Water If Clinton is elected, Obama will hand her the power of a dictator. Upon Inauguration Day, Clinton will have the power to to the following: As President, Hillary Clinton Would Have the Power to Enact Slave Labor According to EO 13603, the President, or the head of any federal agency that he shall designate, can conscript “persons of outstanding experience and ability without compensation,” in both “peacetime and times of national emergency.” I can hear the Obama supporters now as they will write to me and say, “Obama would never do that, you are drinking from the Kool-Aid”. Well, here it is, you can read it for yourself. Sec. 502. Consultants. The head of each agency otherwise delegated functions under this order is delegated the authority of the President under sections 710(b) and (c) of the Act, 50 U.S.C. App. 2160(b), (c), to employ persons of outstanding experience and ability without compensation and to employ experts, consultants, or organizations. The authority delegated by this section may not be redelegated. Hillary Will Have the Power to Nationalize All American Food and Food Production Through Executive Order 13603, Obama has granted himself the authority control all food and now has the unique ability to starve America into submission as it relates to his handing the country off to the bankers in the name of perpetuating the New World Order and ridding the planet of the weak and those who will not willingly go along with the intentional destruction of America. Here are some of the key provisions of EO 13603 and its impact on the control of the American food supply. With the stroke of his pen, Obama has total and absolute control over all food where his EO 13603 states: e) “Food resources” means all commodities and products, (simple, mixed, or compound), or complements to such commodities or products, that are capable of being ingested by either human beings or animals, irrespective of other uses to which such commodities or products may be put, at all stages of processing from the raw commodity to the products thereof in vendible form for human or animal consumption. “Food resources” also means potable water packaged in commercially marketable containers, all starches, sugars, vegetable and animal or marine fats and oils, seed, cotton, hemp, and flax fiber, but does not mean any such material after it loses its identity as an agricultural commodity or agricultural product. (f) “Food resource facilities” means plants, machinery, vehicles (including on farm), and other facilities required for the production, processing, distribution, and storage (including cold storage) of food resources, and for the domestic distribution of farm equipment and fertilizer…” This unconstitutional EO is particularly disturbing in that it clearly states that the government has control over anything that is “capable of being ingested by either human beings or animals…” If you thought that you and Fido were going to get through the coming food crisis by storing and consuming dog food, think again. It is important to assess how devastating this Executive Order could prove to be to the American people though a brief assessment of America’s food vulnerability. This is only the tip of the iceberg. Listen to Dave Hodges describe just how dangerous Clinton could be if elected.`
      this.selectedTags=this.newsService.tags.map(x=>x.tagname);
      this.displayedTags=[{id:1,tagname:'Politics1'},{id:2,tagname:'COVID192'},{id:2,tagname:'COVID193'},{id:3,tagname:'Programming4'},{id:3,tagname:'Programming6'},{id:2,tagname:'COVID195'},{id:3,tagname:'Programming2'},{id:3,tagname:'Programming5'},{id:2,tagname:'COVID195'}]
      this.displayedNews=x;
      
    });
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.filterNews();
  }
  filterNews(){
    this.displayedNews=this.newsService.localNews.filter(x=>{
      if(x.veracityAI<this.sliderValue||x.veracityUser<this.selectedSentiment){
        return false;
      }
      if(!this.selectedInterfaceTags.some(tag=>x.tags.some(xTag=>xTag.tagname===tag))){
        return false;
      }
      return true;
    })
  }
  isChipSelected(tagName:string):boolean{
    if(this.selectedInterfaceTags.some(x=>x===tagName)){
      return true;
    }
    return false;
  }
  toggleChipSelection(tagName:string){
    if(this.isChipSelected(tagName)){
      this.selectedInterfaceTags.splice(this.selectedInterfaceTags.findIndex(x=>x===tagName),1)
    }else{
      this.selectedInterfaceTags.push(tagName);
    }
  }
  removeIntro(intro:HTMLElement){
    intro.style.top="-100vh";
  }



}
