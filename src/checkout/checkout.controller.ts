import { Controller, Post, Body } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

@Controller('checkout')
export class CheckoutController {
  @Post()
  async checkout(@Body() body: { name: string; price: number; slug: string }) {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
name: body.name,
            },
            unit_amount: Math.round(body.price * 100), // eur → centi
          },
          quantity: 1,
        },
      ],
success_url: 'http://localhost:3000/success',
cancel_url: `http://localhost:3000/product/${body.slug}`,
    });

    return { url: session.url };
  }
}