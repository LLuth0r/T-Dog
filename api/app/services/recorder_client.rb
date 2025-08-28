require 'net/http'

class RecorderClient
  def self.base_url
    ENV['RECORDER_URL'] || 'http://localhost:4000'
  end

  def self.jwt
    JwtService.encode({ role: 'rails', svc: 'api' })
  end

  def self.clip(session:)
    uri = URI("#{base_url}/api/clip")
    body = {
      session_id: session.id,
      court_id: session.court_id,
      started_at: session.started_at.iso8601,
      ended_at: session.ended_at.iso8601,
      rtsp_url: session.court.camera.rtsp_url,
      s3_bucket: ENV['S3_BUCKET'],
      s3_key_prefix: "sessions/#{session.id}",
      callback_url: Rails.application.routes.url_helpers.v1_recorders_webhook_url
    }
    req = Net::HTTP::Post.new(uri, { 'Content-Type' => 'application/json', 'Authorization' => "Bearer #{jwt}" })
    req.body = body.to_json
    Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(req) }
  end
end