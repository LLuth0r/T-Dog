require "test_helper"

class V1::CourtsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @facility = Facility.create!(name: "F", slug: "f")
    @court = Court.create!(facility: @facility, name: "Court 1", slug: "court-1")
    @camera = Camera.create!(court: @court, rtsp_url: "rtsp://example.invalid/stream1")
  end

  test "index by slug" do
    get v1_courts_path, params: { slug: "court-1" }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 1, body.size
    assert_equal @court.id, body.first["id"]
  end

  test "show" do
    get v1_court_path(@court.id)
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal @court.id, body["id"]
  end
end
