class ApplicationController < ActionController::API

  private
  
  def authenticate_recorder!
    auth = request.headers['Authorization']&.split(' ')&.last
    @recorder_claims = JwtService.decode(auth)
    head :unauthorized unless @recorder_claims && @recorder_claims['role'] == 'recorder'
  end
end
