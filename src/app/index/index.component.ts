import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  images: string[] = [
    '/IMG_5859.jpg',
    '/IMG_5861.jpg',
    '/IMG_5866.jpg',
    '/JPEG-Bild 2.jpg',
    '/JPEG-Bild 4.jpg',
    '/JPEG-Bild 5.jpg',
    '/JPEG-Bild 6.jpg',
    '/JPEG-Bild 7.jpg',
    '/JPEG-Bild 8.jpg',
    '/JPEG-Bild 9.jpg',
  ];


  ngOnInit(): void {
    this.startImageLoop();
  }
  getStyle(index: number): any {
    const position = this.getRandomPosition();
    return {
      top: position.top + 'px',
      left: position.left + 'px',
      opacity: this.isVisible(index) ? 1 : 0
    };
  }

  getRandomPosition() {
    const top = Math.floor(Math.random() * window.innerHeight);
    const left = Math.floor(Math.random() * window.innerWidth);
    return { top, left };
  }

  isVisible(index: number): boolean {
    // Simulieren Sie das Ein- und Ausblenden
    return Math.random() > 0.5;
  }

  startImageLoop(): void {
    setInterval(() => {
      this.images = [...this.images]; // Trigger change detection
    }, 5000); // 2 Sekunden Intervall
  }
  contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const sendGridApiKey = 'YOUR_SENDGRID_API_KEY';

    const emailDataUser = {
      personalizations: [
        {
          to: [{ email: this.contact.email }],
          subject: 'Ihre Kontaktanfrage'
        }
      ],
      from: { email: 'deine-email@example.com' },
      content: [
        {
          type: 'text/plain',
          value: `Hallo ${this.contact.name},\n\nVielen Dank für Ihre Kontaktanfrage. Wir werden diese so schnell wie möglich bearbeiten.\n\nIhre Nachricht: ${this.contact.message}\n\nMit freundlichen Grüßen,\nIhr Ferienhaus-Team`
        }
      ]
    };

    const emailDataAdmin = {
      personalizations: [
        {
          to: [{ email: 'maximi6@gmail.com' }],
          subject: 'Neue Kontaktanfrage'
        }
      ],
      from: { email: 'deine-email@example.com' },
      content: [
        {
          type: 'text/plain',
          value: `Name: ${this.contact.name}\nE-Mail: ${this.contact.email}\nTelefonnummer: ${this.contact.phone}\nNachricht: ${this.contact.message}`
        }
      ]
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${sendGridApiKey}`);

    this.http.post('https://api.sendgrid.com/v3/mail/send', emailDataUser, { headers })
      .subscribe(response => {
        this.http.post('https://api.sendgrid.com/v3/mail/send', emailDataAdmin, { headers })
          .subscribe(response => {
            alert('Ihre Anfrage wurde erfolgreich gesendet.');
            this.contact = {
              name: '',
              email: '',
              phone: '',
              message: ''
            };
          }, error => {
            alert('Es gab ein Problem beim Senden Ihrer Anfrage an den Admin. Bitte versuchen Sie es später erneut.');
          });
      }, error => {
        alert('Es gab ein Problem beim Senden Ihrer Anfrage an Sie. Bitte versuchen Sie es später erneut.');
      });
  }
}
