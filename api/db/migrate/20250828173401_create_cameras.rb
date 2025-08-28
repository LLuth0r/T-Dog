class CreateCameras < ActiveRecord::Migration[8.0]
  def change
    create_table :cameras do |t|
      t.references :court, null: false, foreign_key: true
      t.string :rtsp_url
      t.string :onvif_url
      t.string :make
      t.string :model

      t.timestamps
    end
  end
end
