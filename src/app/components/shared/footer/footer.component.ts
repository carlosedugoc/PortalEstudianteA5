import { Component, Input } from '@angular/core'
import { Menu, User } from "../../../app.models"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input('redes') redes: Menu[]
  @Input('emisora') emisora: Menu[]
  @Input('user') user:User
}
