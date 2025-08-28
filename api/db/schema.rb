# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_28_173504) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cameras", force: :cascade do |t|
    t.bigint "court_id", null: false
    t.string "rtsp_url"
    t.string "onvif_url"
    t.string "make"
    t.string "model"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["court_id"], name: "index_cameras_on_court_id"
  end

  create_table "courts", force: :cascade do |t|
    t.bigint "facility_id", null: false
    t.string "name"
    t.string "slug"
    t.integer "camera_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["facility_id"], name: "index_courts_on_facility_id"
    t.index ["slug"], name: "index_courts_on_slug"
  end

  create_table "facilities", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_facilities_on_slug"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "court_id", null: false
    t.string "user_contact"
    t.string "status"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.integer "duration_s"
    t.string "s3_key"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["court_id"], name: "index_sessions_on_court_id"
    t.index ["token"], name: "index_sessions_on_token"
  end

  add_foreign_key "cameras", "courts"
  add_foreign_key "courts", "facilities"
  add_foreign_key "sessions", "courts"
end
