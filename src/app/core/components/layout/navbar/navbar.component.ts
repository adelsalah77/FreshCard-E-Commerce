import { CartService } from './../../../../features/services/cart/cart.service';
import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  cartItem: WritableSignal<number> = signal<number>(0);
  isLogin: boolean = false;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(
    private flowbiteService: FlowbiteService,
    public authService: AuthService,
    public cartService: CartService,
  ) {
    effect(() => {
      this.isLogin = this.authService.userData() != null;
    });
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    this.cartService.noOfCartItems.subscribe({
      next: (data) => this.cartItem.set(data),
    });
  }
}
