puts "V1::SessionController Loaded"
module V1
  class SessionsController < ApplicationController
    before_action :set_session, only: [:show, :stop, :presigned_download]
    
    def create
      court = Court.find(params[:court_id])
      s = Session.create!(
        court: court,
        user_contact: params[:user_contact],
        status: "active",
        started_at: Time.current
      )
      render json: {
        id: s.id,
        token: s.token,
        status: s.status,
        started_at: s.started_at,
      }
    end

    def stop
      @session.update!(ended_at: Time.current, status: 'processing')
      # enqueue job to notify recorder to clip
      # ClipRequestJob.perform_later(@session.id)
      render json: { id: @session.id, status: @session.status, ok: true }
    end

    def show
      render json: @session
    end

    def presigned_download
      if @session.s3_key.present?
        url = S3Presigner.presign_download(@session.s3_key)
        render json: { url: url }
      else
        head :not_found
      end
    end

    private
    def set_session
      @session = Session.find(params[:id])
    end
  end
end
