/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Buffer (https://buffer.com) provider.
 */

import { ProviderMixin } from '../utils/ProviderMixin';

export class Buffer extends ProviderMixin {
  constructor (url = document.location.href, title = document.title) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.createEvents = this.createEvents.bind(this);
  }
  
  getPreparedData(item) {
    const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
    const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
    const share_url = `https://buffer.com/add?url=${url}&text=${title}`;
    
    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowOptions: "width=640,height=480,location=no,toolbar=no,menubar=no",
    };
  }
  
  // Share event
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="buffer"]');
  
    return this.createEvents(share_elements);
  }
  
  // Show counter event
  getCounter () {
    const script = document.createElement('script');
    const callback = ('goodshare_' + Math.random()).replace('.', '');
    const count_elements = document.querySelectorAll('[data-counter="buffer"]');
    const count_url = `https://api.bufferapp.com/1/links/shares.json?url=${this.url}&callback=${callback}`;
    
    if (count_elements.length > 0) {
      window[callback] = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = (counter) ? counter.shares : 0;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
