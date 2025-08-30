require "test_helper"

class V1::RecordersControllerTest < ActionDispatch::IntegrationTest
  def auth_headers
    token = JwtService.encode({ role: "recorder" })
    { "Authorization" => "Bearer #{token}", "Content-Type" => "application/json" }
  end

  test "heartbeat" do
    post heartbeat_v1_recorders_url, headers: auth_headers
    assert_response :success
    assert_equal true, JSON.parse(response.body)["ok"]
  end

  test "webhook clip_uploaded" do
    f = Facility.create!(name: "F", slug: "f")
    court = Court.create!(facility: f, name: "C", slug: "c")
    Camera.create!(court: court, rtsp_url: "rtsp://example.invalid/stream1")
    s = Session.create!(court: court, user_contact: "x", status: "processing", started_at: Time.current, ended_at: Time.current)

    payload = { event: "clip_uploaded", session_id: s.id, s3_key: "sessions/#{s.id}/clip.mp4", duration_s: 42 }.to_json
    post webhook_v1_recorders_url, headers: auth_headers, params: payload
    assert_response :success
    assert_equal "delivered", s.reload.status
    assert_equal "sessions/#{s.id}/clip.mp4", s.s3_key
  end
end
