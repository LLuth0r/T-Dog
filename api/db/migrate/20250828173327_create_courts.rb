class CreateCourts < ActiveRecord::Migration[8.0]
  def change
    create_table :courts do |t|
      t.references :facility, null: false, foreign_key: true
      t.string :name
      t.string :slug
      t.integer :camera_id

      t.timestamps
    end
    add_index :courts, :slug
  end
end
