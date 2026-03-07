module V1
  class BillingController < ApplicationController
    def checkout
      session = Stripe::Checkout::Session.create(
        mode: 'payment',
        line_items: [{ price: ENV.fetch("STRIPE_PRICE_ID"), quantity: 1 }],
        success_url: "#{ENV.fetch("APP_BASE_URL")}/payment/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "#{ENV.fetch("APP_BASE_URL")}/payment/cancel",
        metadata: {
          user_contact: params[:user_contact].to_s,
        }
      )
      render json: { url: session.url }
    end
  end
end
