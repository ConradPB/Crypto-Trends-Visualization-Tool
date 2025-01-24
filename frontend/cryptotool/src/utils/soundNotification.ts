export class SoundNotification {
    private alertSound: HTMLAudioElement;
  
    constructor() {
      // Created an audio element with a simple beep sound for notification
      this.alertSound = new Audio('data:audio/wav;base64,//uQRAAAAWMQ++QJt2JcWe+/T0EHTyBCDRz/PixJ1FkDYhUIFVdFRF0tTcSpT9lWq7GgQI1qptp8s43mXDNdVr+tAx8/0/mYcmzZ3+mIxD4wt8Vxm9g==');
    }
  
    play() {
      try {
        this.alertSound.play().catch(error => {
          console.warn('Autoplay of sound notification was prevented:', error);
        });
      } catch (error) {
        console.error('Error playing sound notification:', error);
      }
    }
  }