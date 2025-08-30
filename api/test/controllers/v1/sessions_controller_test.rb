require "test_helper"

class V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    f = Facility.create!(name: "F", slug: "f")
    @court = Court.create!(facility: f, name: "Court 1", slug: "court-1")
    Camera.create!(court: @court, rtsp_url: "rtsp://example.invalid/stream1")
  end

  test "create" do
    post v1_sessions_path, params: { court_id: @court.id, user_contact: "you@example.com" }, as: :json
    assert_response :success
    body = JSON.parse(response.body)
    assert body["id"]
  end

  test "stop" do
    s = Session.create!(court: @court, user_contact: "x", status: "active", started_at: Time.current)
    post stop_v1_session_path(s.id)
    assert_response :success
    assert_equal "processing", s.reload.status
  end

  test "show" do
    s = Session.create!(court: @court, user_contact: "x", status: "active", started_at: Time.current)
    get v1_session_path(s.id)
    assert_response :success
  end

  test "presigned_download" do
    s = Session.create!(court: @court, user_contact: "x", status: "delivered", started_at: Time.current, s3_key: "sessions/#{SecureRandom.hex}/clip.mp4")
    get presigned_download_v1_session_path(s.id)
    assert_response :success
    body = JSON.parse(response.body)
    assert_includes body["url"], "amazonaws.com"
  end
end
