/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  WordPress (https://wordpress.com) provider.
 */

import { ProviderMixin } from '../utils/ProviderMixin';

export class WordPress extends ProviderMixin {
  constructor (url = document.location.href, title = document.title,
               description = document.querySelector('meta[name="description"]'),
               image = document.querySelector('link[rel="apple-touch-icon"]')) {
    super();
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description.content) : '';
    this.image = (image) ? encodeURIComponent(image.href) : '';
    this.createEvents = this.createEvents.bind(this);
  }
  
  getPreparedData(item) {
    const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
    const title = item.dataset.title ? encodeURIComponent(item.dataset.title) : this.title;
    const description = item.dataset.description ? encodeURIComponent(item.dataset.description) : this.description;
    const image = item.dataset.image ? encodeURIComponent(item.dataset.image) : this.image;
    const share_url = `https://wordpress.com/wp-admin/press-this.php?u=${url}&t=${title}&s=${description}&i=${image}&v=2`;

    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowOptions: "width=640,height=480,location=no,toolbar=no,menubar=no",
    };
  }
  
  // Share event
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="wordpress"]');
  
    return this.createEvents(share_elements);
  }
}
