require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get sessions_create_url
    assert_response :success
  end

  test "should get stop" do
    get sessions_stop_url
    assert_response :success
  end

  test "should get show" do
    get sessions_show_url
    assert_response :success
  end

  test "should get presigned_download" do
    get sessions_presigned_download_url
    assert_response :success
  end
end
