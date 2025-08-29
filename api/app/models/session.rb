class Session < ApplicationRecord
  belongs_to :court
  before_create :assign_token

  def assign_token
    self.token ||= SecureRandom.urlsafe_base64(24)
  end

  def active?
    status == 'active'
  end
end
