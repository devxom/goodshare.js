/**
 *  Vic Shóstak <koddr.me@gmail.com>
 *  Copyright (c) 2018 True web artisans https://webartisans.org
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Telegram (https://telegram.org) provider.
 */

import { ProviderMixin } from '../utils/ProviderMixin';

export class Telegram extends ProviderMixin {
  constructor (url = document.location.href) {
    super();
    this.url = encodeURIComponent(url);
    this.createEvents = this.createEvents.bind(this);
  }
  
  getPreparedData(item) {
    const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
    const rhash = item.dataset.rhash ? item.dataset.rhash : null;
    let share_url = `https://t.me/share/url?url=${url}`;
  
    if (rhash !== null) {
      // For more info about Telegram Instant View read the docs:
      // https://instantview.telegram.org/docs
      share_url = `https://t.me/iv?url=${url}&rhash=${rhash}`;
    }

    return {
      callback: this.callback,
      share_url: share_url,
      windowTitle: "Share this",
      windowOptions: "width=640,height=480,location=no,toolbar=no,menubar=no",
    };
  }
  
  // Share event
  shareWindow () {
    const share_elements = document.querySelectorAll('[data-social="telegram"]');
  
    return this.createEvents(share_elements);
  }
}
