module V1
  class StripeWebhooksController < ApplicationController
    def create
      payload = request.body.read
      sig = request.env['HTTP_STRIPE_SIGNATURE']
    
      event= Stripe::Webhook.construct_event(
        payload, sig, ENV.fetch("STRIPE_WEBHOOK_SECRET")
      )
      case event.type
      when 'checkout.session.completed'
        checkout = event.data.object
      end

      head :ok
    rescue JSON::ParserError, Stripe::SignatureVerificationError
      head :bad_request
    end
  end
end
