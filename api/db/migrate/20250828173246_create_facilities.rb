class CreateFacilities < ActiveRecord::Migration[8.0]
  def change
    create_table :facilities do |t|
      t.string :name
      t.string :slug

      t.timestamps
    end
    add_index :facilities, :slug
  end
end
