import { Component, OnInit } from '@angular/core';
import { AppwriteService } from 'src/app/services/appwrite.service';

@Component({
  selector: 'app-tab-youtube',
  templateUrl: './tab-youtube.component.html',
  styleUrls: ['./tab-youtube.component.css']
})
export class TabYoutubeComponent implements OnInit {

  videoId?:string;
  urlText?:string;
  thereIsTopics:boolean =false;
  topics:any[] =[]
  inLoading=false;
  constructor(private appwriteService: AppwriteService) { }

  ngOnInit(): void {
  }

  findTopics():void{
    //CHECK IF LINK IS CORRECTED
    this.getIdVideo(this.urlText!);
    this.inLoading=true;
    this.appwriteService.topicFunction(this.urlText!).then((response: any) => {
      console.log(response); // Success
      //this.transctiptionText= JSON.parse(response.response).deepgramResponse.results.channels[0].alternatives[0].transcript;
      const tempTopics:any[]=[];
      JSON.parse(response.response).deepgramResponse.results.channels[0].alternatives[0].topics.forEach((element:any) => {
        element.topics.forEach((topic:any)=>{
          tempTopics.push(topic.topic);

        });
      });
      
      this.topics = [... new Set(tempTopics)];
      this.thereIsTopics=true;
      this.inLoading=false;
  },(error:any) => {
      this.inLoading=false;

      console.log(error); // Failure
      this.thereIsTopics=false;
  });
    
  }
  getIdVideo(url: string):void{
    const params = new URL(url).searchParams;
    this.videoId = params.get('v')!;
  }
}
