class Court < ApplicationRecord
  belongs_to :facility
  has_one :camera, dependent: :destroy
end
