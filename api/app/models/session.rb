class Session < ApplicationRecord
  belongs_to :court
  enum(
    status: { 
      created: 'created', 
      active: 'active', 
      processing: 'processing', 
      delivered: 'delivered', 
      failed: 'failed'
    }
  )
  before_create :assign_token

  def assign_token
    self.token ||= SecureRandom.urlsafe_base64(24)
  end

  def active?
    status == 'active'
  end
end
