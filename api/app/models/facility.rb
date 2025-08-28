class Facility < ApplicationRecord
  has_many :courts, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end
