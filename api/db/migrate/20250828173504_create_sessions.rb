class CreateSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :sessions do |t|
      t.references :court, null: false, foreign_key: true
      t.string :user_contact
      t.string :status
      t.datetime :started_at
      t.datetime :ended_at
      t.integer :duration_s
      t.string :s3_key
      t.string :token

      t.timestamps
    end
    add_index :sessions, :token
  end
end
