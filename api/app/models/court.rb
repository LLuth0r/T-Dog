class Court < ApplicationRecord
  validates :slug, uniqueness: true
  belongs_to :facility
  has_one :camera, dependent: :destroy
end
