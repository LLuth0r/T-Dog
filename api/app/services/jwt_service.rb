class JwtService
  SECRET = Rails.application.credentials.jwt_secret || ENV['JWT_SECRET']

  def self.encode(payload, exp: 12.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET)[0]
    HashWithIndifferentAccess.new decoded
  rescue JWT::DecodeError => e
    nil
  end
end