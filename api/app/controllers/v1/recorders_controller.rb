module V1
  class RecordersController < ApplicationController
    before_action :authenticate_recorder!, only: [:heartbeat, :webhook]
    
    def heartbeat
      render json: { ok: true, time: Time.now.utc }
    end

    # Recorder posts when upload done
    def webhook
      case params[:event]
      when 'clip_uploaded'
        s = Session.find(params[:session_id])
        s.update!(s3_key: params[:s3_key], status: 'delivered', duration_s: params[:duration_s])
        # Notify user later (email/sms)
      end
      render json: { ok: true }
    end
  end
end
