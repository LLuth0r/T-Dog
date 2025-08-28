require "test_helper"

class RecordersControllerTest < ActionDispatch::IntegrationTest
  test "should get heartbeat" do
    get recorders_heartbeat_url
    assert_response :success
  end

  test "should get webhook" do
    get recorders_webhook_url
    assert_response :success
  end
end
