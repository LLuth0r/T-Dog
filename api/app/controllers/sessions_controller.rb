module V1
  class SessionsController < ApplicationController
    before_action :set_session, only: %i[show update stop presigned_download]
    
    def create
      court = Court.find(params[:court_id])
      s = court.sessions.create!(user_contact: params[:user_contact])
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
      ClipRequestJob.perform_later(@session.id)
      render json: { ok: true}
    end

    def show
      render json: @session
    end

    def presigned_download
      s3_key = @session.s3_key
      return head :not_found unless s3_key.present?
      url = S3Presigner.presign_download(s3_key)
      render json: { url: url, s3_key: s3_key }
    end

    private
    def set_session
      @session = Session.find(params[:id])
    end
end
